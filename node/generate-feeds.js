
import {writeFileSync} from 'node:fs';
import {join} from 'node:path';

import {default as createContentLoader} from '../utils/create-content-loader.js';

import Debug from 'debug';
import {Feed} from 'feed';

// helper to normalize things
const normalizeConfig = (config = {}, feed = 'feed') => {
  // pluralize
  if (!config.patterns && config.pattern) {
    config.patterns = config.pattern;
    delete config.pattern;
  }

  // arrayize
  if (typeof config.patterns === 'string') config.patterns = [config.patterns];

  // set filename if it isnt set
  if (!config.file) config.file = `/${feed}.rss`;

  // add the feed name just for the hell of it?
  config.name = feed;

  return config;
};

const sort = items => items.sort((a, b) => a.timestamp < b.timestamp ? 1 : -1);

export default async function(siteConfig, {debug = Debug('@lando/generate-feeds')} = {}) { // eslint-disable-line
  const {userConfig, site, outDir} = siteConfig;

  // get config from priority sources
  const config = userConfig.feeds
    || userConfig?.themeConfig?.feeds
    || userConfig.feed
    || userConfig?.themeConfig?.feed;

  // if feeds is false or undefined then just end it all right here
  if (!config) return;

  // if feeds has only one top level feed then bump it down
  const feeds = (config.patterns || config.pattern) ? {feed: config} : config;

  // loop through and generate feedzzz
  await Promise.all(Object.entries(feeds).map(async ([name, config]) => {
    config = normalizeConfig(config, name);
    const {href} = new URL(site.base ?? '/', config.baseUrl ?? userConfig.baseUrl);

    const feed = new Feed({
      title: config.title ?? site.title ?? '',
      description: config.description ?? config.description ?? '',
      id: config.id ?? href,
      link: config.link ?? href,
      language: config.language ?? 'en',
      image: config.image ?? '',
      favicon: config.favicon ?? `${href}/favicon.ico`,
      copyright: config.copyright ?? '',
    });

    // get items
    const items = await createContentLoader(config.patterns, {excerpt: true, render: true, siteConfig}, {debug}).load();

    // and loop theough them to add
    for (const item of sort(items)) {
      const {authors, timestamp, excerpt, html, summary, title, url} = item;

      // initial payload
      const data = {
        title,
        id: `${href}${url}`,
        link: `${href}${url}`,
        description: excerpt !== '' ? excerpt : summary,
        content: html,
        date: new Date(timestamp),
      };

      // add authors if we have them
      if (authors && Array.isArray(authors)) data.authors = authors.map(({name, link}) => ({name, link}));

      // SHE ALWAYS NEEDS TO FEED
      feed.addItem(data);
    }

    // write feed
    const dest = join(outDir, config.file);
    writeFileSync(dest, feed.rss2());
    debug('generated rss feed %o', dest);
  }));
}
