'use strict';

const _ = require('lodash');
const {chalk, warn} = require('@vuepress/utils');
const {isLinkHttp} = require('@vuepress/shared');
const {Octokit} = require('@octokit/core');
const {path} = require('@vuepress/utils');
const {paginateRest} = require('@octokit/plugin-paginate-rest');
const url = require('url');

const MyOctokit = Octokit.plugin(paginateRest);
const octokit = new MyOctokit({auth: process.env.GITHUB_TOKEN});

const name = '@lando/plugin-sidebar-header';
const debug = require('debug')(name);

const sidebarHeaderPlugin = (options = {}) => {
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
            const latest = _.first(response);
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

module.exports = {sidebarHeaderPlugin};
