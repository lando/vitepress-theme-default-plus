import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

import fg from 'fast-glob';
import merge from 'lodash/merge';

import Debug from 'debug';

import {default as getContributors} from '../utils/get-contributors';
import {default as getTimestamp} from '../utils/get-timestamp';
import {default as resolveGitPaths} from '../utils/resolve-git-paths';

const getContributor = (id, contributors = []) => contributors.find(contributor => contributor.email === id)
  ?? contributors.find(contributor => contributor.name === id);

const getLink = author => {
  if (author.link) return author.link;
  else if (Array.isArray(author?.links) && author.links[0]) return author.links[0].link;
  else if (author.email) return `mailto:${author.email}`;
};

export default async function(pageData, {
  debug = Debug('@lando/collections'),  // eslint-disable-line
  siteConfig,
} = {}) {
  // get stuff
  const {site} = siteConfig;
  const {themeConfig} = site;
  const {frontmatter, relativePath} = pageData;
  const contributors = themeConfig?.contributors ?? false;

  // ensure siteConfig.collections is at least an empty object
  if (!siteConfig.collections || typeof siteConfig.collections !== 'object') siteConfig.collections = {};

  // before we start lets make sure we have a list of paths for each collection
  // we do it like this to minimize running fastglob a bunch of times
  for (const [collection, config] of Object.entries(themeConfig?.collections ?? {})) {
    if (!Array.isArray(siteConfig.collections[collection])) {
      siteConfig.collections[collection] = fg.globSync(config.patterns ?? [], {
        dot: true,
        cwd: siteConfig.srcDir,
        onlyFiles: true,
      });
      debug('generated collection %o page listing %o', collection, siteConfig.collections[collection]);
    }
  }

  // map and remove legacy vuepress2 theme blog setting
  if (!frontmatter.collection && frontmatter.blog === true) {
    pageData.frontmatter.collection = 'post';
    delete pageData.frontmatter.blog;

  // ditto for guide setting
  } else if (!frontmatter.collection && frontmatter.guide === true) {
    pageData.frontmatter.collection = 'guide';
    delete pageData.frontmatter.guide;
  }

  // ditto for updated
  if (!frontmatter.date && frontmatter?.updated?.timestamp) {
    pageData.frontmatter.date = frontmatter.updated.timestamp;
    delete pageData.frontmatter.updated.timestamp;
  }

  // prefer authors instead of author
  if (frontmatter.authors === undefined && frontmatter.author !== undefined) {
    pageData.frontmatter.authors = frontmatter.author;
    if (!Array.isArray(pageData.frontmatter.authors)) pageData.frontmatter.authors = [pageData.frontmatter.authors];
    delete pageData.frontmatter.author;
  }

  // use lastUpdated for date if its there
  if (!frontmatter.date && Number.isInteger(pageData.lastUpdated)) frontmatter.date = pageData.lastUpdated;

  // loop through collections so we can assign default values
  await Promise.all(Object.entries(themeConfig?.collections ?? {}).map(async ([collection, config]) => {
    // get collection pages so we can do the match
    const pages = siteConfig?.collections[collection] ?? [];

    // if this is a match then do the collection stuff we need to do
    if (pages.includes(relativePath) || frontmatter.collection === collection) {
      // if no author is set then we need to discover the author with git information
      if (frontmatter.authors === undefined && contributors) {
        const gitDir = dirname(resolve(fileURLToPath(import.meta.url), '..'));
        const gitPaths = resolveGitPaths(relativePath, siteConfig.srcDir.replace(`${gitDir}/`, ''), frontmatter['git-include']);
        frontmatter.authors = await getContributors(gitDir, contributors, {debug, paths: gitPaths});
      }

      // if we still dont have a date then we need to discover with git
      if (!frontmatter.date) frontmatter.date = await getTimestamp(resolve(siteConfig.srcDir, relativePath), {debug});

      // normalize author data
      if (Array.isArray(frontmatter.authors)) {
        frontmatter.authors = frontmatter.authors
          .map(author => typeof author === 'string' ? getContributor(author, themeConfig.team) : author)
          .filter(author => author && author !== false && author !== null)
          .map(author => ({...author, link: getLink(author)}));
      }

      // standardize some date info
      const date = new Date(frontmatter.date);
      pageData.timestamp = date.getTime();
      pageData.datetime = date.toJSON();

      // merge over defaults and save config and call it a day
      pageData.frontmatter = merge({}, config.frontmatter, frontmatter);
      pageData.collection = config;

      // log
      debug('merged and normalized pageData %O', pageData);
    }
  }));
};
