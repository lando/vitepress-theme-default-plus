import {join, relative} from 'node:path';

import {normalizePath} from 'vite';
import {createContentLoader} from 'vitepress';
import {parse} from 'node-html-parser';

import Debug from 'debug';

import {default as collectionsPlugin} from '../node/collections-plugin';

const siteConfig = globalThis.VITEPRESS_CONFIG;
const {cleanUrls, srcDir} = globalThis.VITEPRESS_CONFIG;
const config = globalThis.VITEPRESS_CONFIG?.site?.themeConfig?.collections ?? {};
const debug = Debug('@lando/collections.data.js'); // eslint-disable-line

const patterns = Object.entries(config)
  .map(([type, config]) => config.patterns)
  .flat(Number.POSITIVE_INFINITY);

debug('loading collections data with patterns config %o', patterns);

const getRelativePath = url => normalizePath(relative(srcDir, join(srcDir, url)))
  .replace(/(^|\/)index\.html$/, '$1')
  .replace(/\.html$/, cleanUrls ? '' : '.md');

export default createContentLoader(patterns, {
  excerpt: true,
  async transform(raw) {
    const pages = await Promise.all(raw.map(async data => {
      // recompute this because we need it for the next step
      data.relativePath = getRelativePath(data.url);
      // in order to get a complete and consistent set of data we should run this through the collections plugin
      await collectionsPlugin(data, {siteConfig, debug});

      // get stuff
      const {frontmatter, collection, url} = data;
      // if there is no frontmatter.title attempt to set it with the excerpt
      if (!frontmatter.title) {
        frontmatter.title = parse(data.excerpt).getElementsByTagName('h1')[0]?.text ?? frontmatter.title;
      }

      // munge it all 2getha and return
      return {
        title: frontmatter.title,
        summary: frontmatter.summary ?? frontmatter.byline ?? frontmatter.description,
        authors: frontmatter.authors,
        date: frontmatter.date ?? data.timestamp ?? data.datetime,
        datetime: data.datetime ?? Date.now().toJSON(),
        icon: collection.icon,
        iconLink: collection.iconLink,
        relativePath: data.relativePath,
        timestamp: data.timestamp ?? Date.now(),
        type: frontmatter.collection,
        url,
      };
    }));

    // sort and return
    return pages.sort((a, b) => b.timestamp - a.timestamp);
  },
});
