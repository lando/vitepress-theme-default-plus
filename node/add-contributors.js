import Debug from 'debug';

import {default as resolveGitPaths} from '../utils/resolve-git-paths.js';
import {default as getContributors} from '../utils/get-contributors.js';

export default async function(pageData, {
  debug = Debug('@lando/add-contributors'),  // eslint-disable-line
  siteConfig,
} = {}) {
  debug = debug.extend(`${pageData.relativePath}`);
  // get path
  const {frontmatter, relativePath} = pageData;
  // compute git things
  const gitDir = siteConfig?.userConfig?.gitRoot;
  const gitPaths = resolveGitPaths(relativePath, siteConfig.srcDir.replace(`${gitDir}/`, ''), frontmatter['git-include']);

  // get contributors
  const contributors = frontmatter.contributors || siteConfig?.site?.themeConfig?.contributors || false;

  // add contributors unless turned off
  if (contributors !== false) {
    try {
      pageData.contributors = await getContributors(gitDir, contributors, {debug, paths: gitPaths});
      debug('set contributors %o', pageData.contributors);
    } catch (error) {
      debug('could not get contributor information, considering this non-fatal but you should investigate and resolve');
      console.error(error);
    }
  }
};
