
import {writeFileSync} from 'node:fs';
import {normalize, resolve} from 'node:path';

import {default as createContentLoader} from '../utils/create-content-loader';

import Debug from 'debug';
import {Feed} from 'feed';

// helper to normalize things
const normalizeConfig = (config = {}, feed = 'feed') => {
  // pluralize
  if (!config.collections && config.collection) {
    config.collections = config.collections;
  }
  if (!config.patterns && config.pattern) {
    config.patterns = config.pattern;
  }

  // arrayize
  for (const item of ['collections', 'patterns']) {
    if (typeof config[item] === 'string') {
      config[item] = [config[item]];
    }
  };

  // set filename if it isnt set
  if (!config.file) config.file = `/${feed}.rss`;

  // add the feed name just for the hell of it?
  config.name = feed;

  return config;
};

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
  const feeds = (config.patterns || config.pattern || config.collections || config.collection) ? {feed: config} : config;

  // loop through and generate feedzzz
  await Promise.all(Object.entries(feeds).map(async ([name, config]) => {
    config = normalizeConfig(config, name);
    const feed = new Feed({
      title: config.title ?? site.title ?? '',
      description: config.description ?? config.description ?? '',
      id: config.id ?? userConfig.baseUrl,
      link: config.link ?? userConfig.baseUrl,
      language: config.language ?? 'en',
      image: config.image ?? '',
      favicon: config.favicon ?? `${userConfig.baseUrl}/favicon.ico`,
      copyright: config.copyright ?? '',
    });

    const posts = await createContentLoader(['*/**/*.md'], siteConfig, {debug}).load();
    console.log('hello')
    process.exit(1)


    // loop through collections and add them to the feed
    // for (const collection of config.collections ?? []) {
    //   console.log(collection);
    //   console.log(useCollection(collection))
    // };

  }));

  process.exit(1)


  // write file
  try {
    const dest = resolve(outDir, robots.file);
    const content = await robotstxt(options);
    writeFileSync(dest, content);
    debug('generated %o with content %O', dest, content);
  } catch (error) {
    throw error;
  }
};

/*
export async function genFeed(
  siteConfig: SiteConfig<VPBThemeConfig>
): Promise<void> {
  const blogConfig = siteConfig.site.themeConfig.blog ?? {}
  const feedConfig = blogConfig.feed ?? {}
  const baseUrl = feedConfig.baseUrl ?? 'localhost/blog'

  const pattern = `${blogConfig?.postsPath ?? '/blog/posts'}/**//*.md`
  const output = feedConfig.outputPath ?? '/feed.rss'

  const posts = await createContentLoader(pattern, {
    excerpt: true,
    render: true,
  }).load()

  posts.sort(
    (a, b) =>
      +new Date(b.frontmatter.date as string) -
      +new Date(a.frontmatter.date as string)
  )

  for (const { url, excerpt, frontmatter, html } of posts) {
    feed.addItem({
      title: frontmatter.title,
      id: `${baseUrl}${url}`,
      link: `${baseUrl}${url}`,
      description: excerpt,
      content: html,
      author: [
        {
          name: frontmatter.author,
          link: frontmatter.twitter
            ? `https://twitter.com/${frontmatter.twitter}`
            : undefined,
        },
      ],
      date: frontmatter.date,
    })
  }

  writeFileSync(path.join(siteConfig.outDir, output), feed.rss2())
}
*/
