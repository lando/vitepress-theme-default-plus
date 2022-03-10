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

const name = '@lando/plugin-versions-page';
const debug = require('debug')(name);

module.exports = (options = {}, app) => {
   const defaults = {
     content: fs.readFileSync(path.resolve(__dirname, 'versions.md')),
     data: [],
     docsBranch: 'main',
     docsDir: '',
     link: '/versions.html',
     showEdge: false,
     title: 'Previous Versions',
     trimLatest: true,
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
      // Try to autopopulate versions data if we can and its not set
      // Note that user entered data takes priority
      if (options.auto && options.isGitHub && _.isEmpty(options.data)) {
        debug('trying to grab versions data from %o', options.repo);
        try {
          // Try to get versions
          const opts = {owner: options.owner, repo: options.project, per_page: 100};
          const response = await octokit.paginate('GET /repos/{owner}/{repo}/tags', opts);

          // Trim latests version if applicable
          if (options.trimLatest) {
            const latest = response.shift();
            debug('trimmed latest version (%o) from list', latest.name);
          }

          // Parse and format the response
          options.data = _(response)
            .map(version => ({
              name: version.name,
              href: `https://github.com/${options.owner}/${options.project}/tree/${version.name}/${options.docsDir}`,
              // @TODO: Make below two configurable?
              target: '_blank',
              rel: 'noopener noreferrer',
            }))
            .value();
          debug('grabbed and parsed versions are %O', options.data);
        } catch (error) {
          warn('could not automatically grab latest version with error', error);
        };
      }

      // Add if we dont already have a versions page
      if (!_.includes(topLevelPages, 'versions')) {
        app.options.themeConfig.sidebar.push({text: options.title, link: options.link});
        debug('programatically added %o to sidebar linking to %o', options.title, options.link);

        // Add information about the "edge" release if we can
        if (isLinkHttp(options.showEdge)) {
          options.edgeVersion = {
            href: options.showEdge,
            name: 'edge',
            target: '_blank',
            rel: 'noopener noreferrer',
          };
        } else if (options.showEdge && options.isGitHub) {
          const {owner, project, docsBranch, docsDir} = options;
          options.edgeVersion = {
            href: `https://github.com/${owner}/${project}/tree/${docsBranch}/${docsDir}`,
            name: docsBranch,
            target: '_blank',
            rel: 'noopener noreferrer',
          };
        };

        // Also add the page if its an internal link and we dont have a page already
        if (!isLinkHttp(options.link) && app.pages.every(page => page.path !== options.link)) {
          const versionsPage = await createPage(app, {
            path: options.link,
            content: options.content,
            frontmatter: {
              contributors: false,
              description: 'Check out previous versions of this documentation.',
              editLink: false,
              edgeVersion: options.edgeVersion,
              lastUpdated: false,
              title: options.title,
              versionsData: options.data,
            },
          });
          app.pages.push(versionsPage);
          debug('programatically added versions page to %o', options.link);
        }
      }
    },
  };
};
