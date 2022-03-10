'use strict';

const _ = require('lodash');
const {chalk, fs, path, warn} = require('@vuepress/utils');
const {createPage} = require('@vuepress/core');
const {getTopLevelPages} = require('./utils');
const {isLinkHttp} = require('@vuepress/shared');
const {Octokit} = require('@octokit/core');
const {paginateRest} = require('@octokit/plugin-paginate-rest');
const url = require('url');

const MyOctokit = Octokit.plugin(paginateRest);
const octokit = new MyOctokit({auth: process.env.GITHUB_TOKEN});

const name = '@lando/plugin-contributors-page';
const debug = require('debug')(name);

module.exports = (options = {}, app) => {
   const defaults = {
     content: fs.readFileSync(path.resolve(__dirname, 'contributors.md')),
     data: [],
     docsBranch: 'main',
     docsDir: '',
     link: '/contributors.html',
     title: 'Contributorz',
   };

  // Reset on defaults
  options = _.merge(defaults, options);

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

  // Get top level pages
  const topLevelPages = getTopLevelPages(_.get(app, 'options.themeConfig.sidebar', []));
  debug('found normalized top level pages %o', topLevelPages);

  return {
    name,
    async onInitialized(app) {
      // Try to autopopulate contributors data if we can and its not set
      // Note that user entered data takes priority
      if (options.auto && options.isGitHub && _.isEmpty(options.data)) {
        debug('trying to grab contributors data from %o', options.repo);
        try {
          // Try to get contributors
          const opts = {owner: options.owner, repo: options.project, per_page: 100};
          const response = await octokit.paginate('GET /repos/{owner}/{repo}/contributors', opts);

          // Parse and format the response
          options.data = _(response)
            .map(contributor => ({
              name: contributor.login,
              img: contributor.avatar_url,
              link: contributor.html_url,
              score: contributor.contributions,
            }))
            .value();
          debug('grabbed and parsed contributors are %O', options.data);
        } catch (error) {
          warn('could not automatically grab contributors with error', error);
        };
      }

      // @TODO: add sidebare if we can
      if (!_.includes(topLevelPages, 'contributors')) {
        app.options.themeConfig.sidebar.push({text: options.title, link: options.link});
        debug('programatically added %o to sidebar linking to %o', options.title, options.link);

        // Also add the page if its an internal link and we dont have a page already
        if (!isLinkHttp(options.link) && app.pages.every(page => page.path !== options.link)) {
          const contributorsPage = await createPage(app, {
            path: options.link,
            content: options.content,
            frontmatter: {
              contributors: false,
              contributorsData: _(options.data)
                .filter(contributor => contributor.name !== 'dependabot[bot]')
                .value(),
              description: 'Check out all the awesome people who contributed to this project!',
              editLink: false,
              lastUpdated: false,
              title: options.title,
            },
          });
          app.pages.push(contributorsPage);
          debug('programatically added contributors page to %o', options.link);
        }
      }
    },
  };
};
