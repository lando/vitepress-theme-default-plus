import fg from 'fast-glob';
import merge from 'lodash/merge';

import Debug from 'debug';

export default async function(pageData, {
  debug = Debug('@lando/blogify'),  // eslint-disable-line
  siteConfig,
} = {}) {
  // get stuff
  const {site} = siteConfig;
  const {themeConfig} = site;
  const {frontmatter, relativePath} = pageData;

  // handle legacy vuepress2 theme config things
  if (frontmatter.blog === true) pageData.frontmatter.collection = 'post';
  else if (frontmatter.guide === true) pageData.frontmatter.collection = 'guide';

  // loop through collections so we can assign default values
  // @NOTE: its sort of a bummer we cant do this beforehand so its not run on every page
  for await (const [collection, config] of Object.entries(themeConfig?.collections ?? {})) {
    const pages = await fg.glob(config.patterns ?? [], {dot: true, cwd: siteConfig.srcDir, onlyFiles: true});
    if (pages.includes(relativePath) || frontmatter.collection === collection) {
      pageData.frontmatter = merge({}, config.frontmatter, frontmatter);
    }
  }
};
