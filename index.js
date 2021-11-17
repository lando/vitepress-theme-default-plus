// Mods
const _ = require('lodash');
const {createPage} = require('@vuepress/core');
const customLinks = require('./plugins/plugin-custom-links.js');
const debug = require('debug')('@lando/docs-theme');
const {isLinkHttp} = require('@vuepress/shared');
const {logger, path} = require('@vuepress/utils');
const {paginateRest} = require('@octokit/plugin-paginate-rest');
const url = require('url');

// Octokit stuff
const {Octokit} = require('@octokit/core');
const MyOctokit = Octokit.plugin(paginateRest);
const octokit = new MyOctokit();

// Our things
const pages = require('./lib/pages');
const {canGenerateContribPage, getTopLevelPages, makeFauxInternal} = require('./lib/utils');

module.exports = (options, app) => {
  // Rebase options on defaults
  options = {...require('./lib/defaults'), ...options};
  // We want to preserve the value of options.repo but we do not want to set it because it will show up
  // in the nav if we do
  options.sourceRepo = options.repo;
  delete options.repo;
  debug('removed repo and set sourceRepo to %s', options.sourceRepo);

  // If we have a source repo then lets try to get more data on it, specifically if its github or otherwise
  if (options.sourceRepo) {
    if (!isLinkHttp(options.sourceRep) || /github\.com/.test(options.sourceRep)) {
      debug('determined this is a GitHub repo');
      options.isGithubRepo = true;
      options.githubOwner = url.parse(options.sourceRepo).pathname.split('/')[0];
      options.githubRepo = url.parse(options.sourceRepo).pathname.split('/')[1];
      options.sourceRepoType = 'github';
      debug('github repo slug is %s/%s', options.githubOwner, options.githubRepo);
    }
  }

  // If baseURL is set then lets mutate landoNavbar
  if (options.baseUrl) {
    options.landoNavbar = makeFauxInternal(options.landoNavbar, options.baseUrl);
    debug('rebased navbar so links to %s appear as internal links', options.baseUrl);
  }
  // If we want to show the lando sidebar then lets add it to the begining of the navbar
  if (options.showLandoNavbar) {
    options.navbar = options.landoNavbar.concat(options.navbar);
    debug('prepended lando navbar to user specified navbar with %o', options.landoNavbar);
  }

  // Get a list of pages for the top level of sidebar and normalize them for easy compare
  const topLevelPages = getTopLevelPages(options.sidebar);
  debug('found normalized top level pages %o', topLevelPages);

  // Plugins that we need no matter what
  const plugins = [
    // Use sass palette stuff
    ['@vuepress/plugin-palette',
      {
        preset: 'sass',
      },
    ],
    // Load in gloal components
    ['@vuepress/register-components',
      {
        componentsDir: path.resolve(__dirname, 'global'),
        componentsPatterns: ['*.vue', '**/*.vue'],
      },
    ],
    // Just pass in ALL THE THEME DATA for now
    ['@vuepress/plugin-theme-data',
      {
        themeData: options,
      },
    ],
  ];

  // Add in search if applicable
  if (options.showSearch) {
    plugins.push(['@vuepress/docsearch', options.searchSettings]);
    debug('added search plugin');
  }

  return {
    name: '@lando/vuepress-theme-lando-docs',
    extends: '@vuepress/theme-default',
    layouts: path.resolve(__dirname, 'layouts'),
    plugins,

    // Add some page data
    async extendsPageData(page) {
      // Collect data
      const data = {};

      // Get a good default version and link if possible
      if (options.showVersion && options.isGithubRepo) {
        const octokitOpts = {owner: options.githubOwner, repo: options.githubRepo, per_page: 100};
        const tags = await octokit.paginate('GET /repos/{owner}/{repo}/tags', octokitOpts);
        data.version = _.first(tags).name;
        data.versionLink = `https://github.com/lando/vuepress-theme-lando-docs/tree/${data.version}`;
      }

      // Override version
      if (options.showVersion && options.version) data.version = options.version;
      // Override versionLink
      if (options.showVersion && options.versionLink) data.versionLink = options.versionLink;

      // Return all collected data
      return data;
    },

    // Add in some pages
    async onInitialized(app) {
      // Add contributors to sidebar if we arent replacing a manually added one
      if (options.contributorsSidebar && !_.includes(topLevelPages, 'contributors')) {
        app.options.themeConfig.sidebar.push({text: options.contributorsText, link: options.contributorsSidebar});
        debug('programatically added %s to sidebar linking to %s', options.contributorsText, options.contributorsSidebar);
      }

      // Add contributors page if we arent replacing a manually added one
      if (options.contributorsPage && app.pages.every(page => page.path !== options.contributorsPage)) {
        // Throw a warning if we cannot generate the page
        if (!canGenerateContribPage(options)) {
          logger.warn('contrib page not generated. ensure that "repo" is a github repo and "contributorsPage" is internal.');

        // Otherwise make that shit
        } else {
          try {
            // Get contrib data from github
            const octokitOpts = {owner: options.githubOwner, repo: options.githubRepo, per_page: 100};
            options.contributorsData = await octokit.paginate('GET /repos/{owner}/{repo}/contributors', octokitOpts);
            // Add the page
            const contributorsPage = await createPage(app, pages.contributors(options));
            app.pages.push(contributorsPage);
            debug('programatically added contributors page to %s', options.contributorsPage);

          // Log error
          } catch (err) {
            logger.error('could not automatically generate contributors page with error', err);
          };
        }
      }
    },

    // Replace the core linksPlugin
    extendsMarkdown: md => {
      md.use(customLinks, options);
    },
  };
};
