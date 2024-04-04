import merge from 'lodash-es/merge.js';

import Debug from 'debug';

export default async function(pageData, {
  siteConfig,
  debug = Debug('@lando/parse-collections'),  // eslint-disable-line
} = {}) {
  debug = debug.extend(`${pageData.relativePath}`);

  // get stuff
  const {site} = siteConfig;
  const {themeConfig} = site;
  const {contributors, frontmatter, relativePath} = pageData;

  // loop through collections so we can assign default values
  await Promise.all(Object.entries(themeConfig?.collections ?? {}).map(async ([collection, config]) => {
    // get collection pages so we can do the match
    const pages = siteConfig?.collections[collection] ?? [];
    // if this is a match then do the collection stuff we need to do
    if (pages.includes(relativePath) || frontmatter.collection === collection) {
      // if no author is set then we should be able to set it with contrib info
      if ((frontmatter.authors === undefined
         || (Array.isArray(frontmatter.authors) && frontmatter.authors.length === 0))
         && Array.isArray(contributors)) {
        frontmatter.authors = contributors;
        debug('set authors %o using contributors information', frontmatter.authors.map(author => author.name));
      }

      // merge over defaults and save config and call it a day
      pageData.frontmatter = merge({}, config.frontmatter, frontmatter);
      pageData.collection = config;

      // log
      debug('rebased on collection %o defaults %O', collection, config.frontmatter);
    }
  }));
};
