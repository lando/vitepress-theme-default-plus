import {join, relative} from 'node:path';

import {normalizePath} from 'vite';
import {createContentLoader} from 'vitepress';

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
  excerpt: false,
  async transform(raw) {
    return await Promise.all(raw.map(async data => {
      // recompute this because we need it for the next step
      data.relativePath = getRelativePath(data.url);
      // in order to get a complete and consistent set of data we should run this through the collections plugin
      await collectionsPlugin(data, {siteConfig, debug});

      // attempt to set things from frontmatter as we can
      // data.title = frontmatter.title;
      // data.authors = frontmatter.authors;

      console.log('hello there');
      console.log(data);

      return data;

      // if we dont have the things we expect then we need to try to get it another way
    }));

    siteConfig.pirog = true;

    // console.log(data);

      // map date, updated.timestamp, frontmatter.lastUpdated, calc last updated


    return raw
      .map(({url, frontmatter, excerpt}) => ({
        title: frontmatter.title,
        // author: frontmatter.author ?? blogConfig?.defaultAuthor ?? 'Unknown',
        url,
        excerpt,
        // tags: formatTags(frontmatter.tags),
        // category:
        //   frontmatter.category ?? blogConfig?.defaultCategory ?? 'Article',
        // date: formatDate(frontmatter.date),
      }));
      // .sort((a, b) => b.date.time - a.date.time);
  },
});
