import Debug from 'debug';

export default async function(pageData, {
  siteConfig,
  debug = Debug('@lando/normalize-legacy-frontmatter'),  // eslint-disable-line
} = {}) {
  debug = debug.extend(`${pageData.relativePath}`);
  const {frontmatter} = pageData;

  // map and remove legacy vuepress2 theme blog setting
  if (!frontmatter.collection && frontmatter.blog === true) {
    pageData.frontmatter.collection = 'post';
    delete pageData.frontmatter.blog;
    debug('mapped frontmatter.blog to frontmatter.collection === post');

  // ditto for guide setting
  } else if (!frontmatter.collection && frontmatter.guide === true) {
    pageData.frontmatter.collection = 'guide';
    delete pageData.frontmatter.guide;
    debug('mapped frontmatter.guide to frontmatter.collection === guide');
  }

  // ditto for updated
  if (!frontmatter.date && frontmatter?.updated?.timestamp) {
    pageData.frontmatter.date = frontmatter.updated.timestamp;
    delete pageData.frontmatter.updated.timestamp;
    debug('mapped frontmatter.updated.timestamp to frontmatter.date');
  }
};
