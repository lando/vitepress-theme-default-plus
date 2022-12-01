
import _ from 'lodash';
import Debug from 'debug';
import {chalk, getDirname, warn} from '@vuepress/utils';
import {isLinkHttp} from '@vuepress/shared';
import {Octokit} from '@octokit/core';
import {path} from '@vuepress/utils';
import {paginateRest} from '@octokit/plugin-paginate-rest';
import satisfies from 'semver/functions/satisfies.js';
import url from 'url';

const __dirname = getDirname(import.meta.url);

export const sidebarHeaderPlugin = (options = {}) => {
  const name = '@lando/plugin-sidebar-header';
  const MyOctokit = Octokit.plugin(paginateRest);
  const octokit = new MyOctokit({auth: process.env.GITHUB_TOKEN});
  const debug = Debug(name); // eslint-disable-line

  // If auto mode is on and repo is set
  if (options.auto && !options.repo) {
    warn(`plugin ${chalk.magenta(name)} repo must be set to use auto mode`);
  }
  if (options.auto && options.repo ) {
    if (!isLinkHttp(options.repo) || /github\.com/.test(options.sourceRep)) {
      options.isGitHub = true;
      options.owner = url.parse(options.repo).pathname.split('/')[0];
      options.project = url.parse(options.repo).pathname.split('/')[1];
    } else {
      warn(`plugin ${chalk.magenta(name)} repo must be a GitHub repo to use auto mode`);
    }
  }

  return app => {
    return {
      name,
      alias: {
        '@theme/SidebarHeader.vue': path.resolve(__dirname, 'SidebarHeader.vue'),
      },
      async onInitialized(app) {
        // Try to autopopulate latest versions data if we can
        // Note that user entered data takes priority
        if (options.auto && options.isGitHub) {
          debug('trying to grab latest version data from %o', options.repo);
          try {
            // Try to get latest version
            const opts = {owner: options.owner, repo: options.project, per_page: 100};
            const response = await octokit.paginate('GET /repos/{owner}/{repo}/tags', opts);
            // If we have version requirements then filter to sasify
            const versions = response.filter(release => {
              if (options.satisfies) return satisfies(release.name, options.satisfies);
              return true;
            });

            const latest = _.first(versions);
            const data = {
              title: options.project,
              version: latest.name,
              link: `https://github.com/${options.owner}/${options.project}/tree/${latest.name}`,
            };
            debug('automatically grabbed version data %o', data);
            options.title = options.title || data.title;
            options.version = options.version || data.version;
            options.link = options.link || data.link;
            debug('resulting config is %o', options);
          } catch (error) {
            warn('could not automatically grab latest version with error', error);
          };
        }
      },
    };
  };
};
