import {resolve} from 'node:path';

import Debug from 'debug';

import {default as getTimestamp} from '../utils/get-timestamp.js';

export default async function(pageData, {
  siteConfig,
  debug = Debug('@lando/normalize-frontmatter'),  // eslint-disable-line
} = {}) {
  debug = debug.extend(`${pageData.relativePath}`);
  const {frontmatter, relativePath} = pageData;

  // use lastUpdated for date if its there
  if (!frontmatter.date && Number.isInteger(pageData.lastUpdated)) frontmatter.date = pageData.lastUpdated;

  // if we still dont have a date then we need to discover with git
  if (!frontmatter.date) frontmatter.date = await getTimestamp(resolve(siteConfig.srcDir, relativePath), {debug});

  // standardize some date info
  const date = new Date(frontmatter.date);
  pageData.timestamp = date.getTime();
  pageData.datetime = date.toJSON();

  // prefer authors over author
  if (frontmatter.authors === undefined && frontmatter.author !== undefined) {
    pageData.frontmatter.authors = frontmatter.author;
    delete pageData.frontmatter.author;
  }

  // prefer authors be an array
  if (pageData.frontmatter.authors && !Array.isArray(pageData.frontmatter.authors)) {
    pageData.frontmatter.authors = [pageData.frontmatter.authors];
  }

  // log
  debug('normalized date information to %o', {date: frontmatter.date, timestamp: pageData.timestamp, datetime: pageData.datetime});
  debug('normalized author information to %o', {authors: frontmatter.authors});
};
