import {existsSync, lstatSync} from 'node:fs';
import {resolve} from 'node:path';

import sortBy from 'lodash-es/sortBy.js';
import uniq from 'lodash-es/uniq.js';
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
  if (!frontmatter.date
    && existsSync(resolve(siteConfig.srcDir, relativePath))
    && lstatSync(resolve(siteConfig.srcDir, relativePath)).isFile()
    ) {
    frontmatter.date = await getTimestamp(resolve(siteConfig.srcDir, relativePath), {debug});
  }

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

  // do a final check to make sure authors is at least an empty array
  if (!pageData.frontmatter.authors) pageData.frontmatter.authors = [];

  // consolidate it all into an array at frontmatter.tags
  if (!frontmatter.tags) pageData.frontmatter.tags = [];
  if (frontmatter.tags && typeof frontmatter.tags === 'string') pageData.frontmatter.tags = [pageData.frontmatter.tags];
  if (frontmatter.tag && typeof frontmatter.tag === 'string') pageData.frontmatter.tags.push(pageData.frontmatter.tag);
  if (Array.isArray(pageData.frontmatter.tag)) {
    pageData.frontmatter.tags = pageData.frontmatter.tags.concat(pageData.frontmatter.tag);
  }
  delete pageData.frontmatter.tag;

  // make sure tags are unique
  if (Array.isArray(pageData.frontmatter.tags)) pageData.frontmatter.tags = sortBy(uniq((pageData.frontmatter.tags)));

  // log
  debug('normalized date information to %o', {date: frontmatter.date, timestamp: pageData.timestamp, datetime: pageData.datetime});
  debug('normalized author information to %o', {authors: pageData.frontmatter.authors});
  debug('normalized tags information to %o', {tags: pageData.frontmatter.tags});
};
