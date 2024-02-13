import {join, relative, posix} from 'node:path';
import {platform} from 'node:os';

import {createContentLoader as ccl} from 'vitepress';
import {nanoid} from 'nanoid';
import {parse} from 'node-html-parser';

import Debug from 'debug';

import {default as addContributors} from '../node/add-contributors.js';
import {default as addMetadata} from '../node/add-metadata.js';
import {default as augmentAuthors} from '../node/augment-authors.js';
import {default as buildCollections} from '../node/build-collections.js';
import {default as getContributors} from '../utils/get-contributors.js';
import {default as normalizeFrontmatter} from '../node/normalize-frontmatter.js';
import {default as normalizeLegacyFrontmatter} from '../node/normalize-legacy-frontmatter.js';
import {default as parseCollections} from '../node/parse-collections.js';

const windowsSlashRE = /\\/g;
const slash = p => p.replace(windowsSlashRE, '/');
const isWindows = platform() === 'win32';

const normalizePath = id => posix.normalize(isWindows ? slash(id) : id);

const getRelativePath = (url, {srcDir, cleanUrls = false} = {}) => {
  return normalizePath(relative(srcDir, join(srcDir, url)))
    .replace(/(^|\/)index\.html$/, '$1')
    .replace(/\.html$/, cleanUrls ? '' : '.md');
};

export default function createContentLoader(patterns = [], {
    siteConfig,
    excerpt = false,
    render = false,
  } = {},
  {
    debug = Debug('@lando/create-content-loader'), // eslint-disable-line
  } = {}) {
  return ccl(patterns, {
    render: true,
    excerpt: true,
    async transform(raw) {
      const contributors = siteConfig?.userConfig?.themeConfig?.contributors ?? false;
      const root = siteConfig?.userConfig?.gitRoot;
      const team = contributors !== false ? await getContributors(root, contributors, {debug: debug.extend('get-contribs'), paths: []}) : [];
      debug('discovered full team info %o', team);

      const pages = await Promise.all(raw.map(async data => {
        // backwards compute the relativePath
        data.relativePath = getRelativePath(data.url, siteConfig);
        // make sure siteConfig.collections exists and is populated
        await buildCollections(siteConfig, {debug});
        // normalize legacy frontmatter
        await normalizeLegacyFrontmatter(data, {siteConfig, debug});
        // normalize frontmatter
        await normalizeFrontmatter(data, {siteConfig, debug});
        // add contributor information
        await addContributors(data, {siteConfig, debug});
        // add metadata information
        await addMetadata(data, {siteConfig, debug});
        // parse collections
        await parseCollections(data, {siteConfig, debug});
        // normalize authors
        await augmentAuthors(data, {team, debug});

        // get stuff
        const {frontmatter, html, url} = data;

        // ensure we have a title
        if (!frontmatter.title) frontmatter.title = parse(html).getElementsByTagName('h1')[0]?.text ?? frontmatter.title;

        // munge it all 2getha
        const content = Object.assign(frontmatter, {
          id: nanoid(),
          title: frontmatter.title,
          summary: frontmatter.summary ?? frontmatter.byline ?? frontmatter.description,
          authors: frontmatter.authors,
          date: frontmatter.date ?? data.timestamp ?? data.datetime,
          datetime: data.datetime,
          excerpt: excerpt ? data.excerpt : '',
          html: render ? data.html : '',
          relativePath: data.relativePath,
          tags: frontmatter.tags ?? [],
          timestamp: data.timestamp ?? Date.now(),
          type: frontmatter.collection,
          url,
        });

        // remove some stuff we do not need
        // @TODO: any other optimization here?
        delete content.head;

        // return
        return content;
      }));

      // sort and return
      return pages.sort((a, b) => b.timestamp - a.timestamp);
    },
  });
};
