
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

import Debug from 'debug';

import {default as resolveGitPaths} from '../utils/resolve-git-paths';
import {default as getContributors} from '../utils/get-contributors';

export default async function(pageData, {
  debug = Debug('@lando/add-contributors'),  // eslint-disable-line
  siteConfig,
} = {}) {
  // get path
  const {frontmatter, relativePath} = pageData;
  // compute git things
  const gitDir = dirname(resolve(fileURLToPath(import.meta.url), '..'));
  const gitPaths = resolveGitPaths(relativePath, siteConfig.srcDir.replace(`${gitDir}/`, ''), frontmatter['git-include']);

  // get contributors
  const contributors = frontmatter.contributors || siteConfig?.site?.themeConfig?.contributors || false;

  // add contributors unless turned off
  if (contributors !== false) {
    try {
      pageData.contributors = await getContributors(gitDir, contributors, {debug, paths: gitPaths});
      pageData.contributors = await getContributors('/Users/pirog/work/cli', contributors, {debug, paths: []});
      debug('page %o set contributors %o', relativePath, pageData.contributors);
    } catch (error) {
      debug('could not get contributor information, considering this not-fatal but you should investigate and resolve');
      console.error(error);
    }
  }
};
