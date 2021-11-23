// Mods
const _ = require('lodash');
const {createPage} = require('@vuepress/core');
const customLinks = require('./plugins/plugin-custom-links.js');
const debug = require('debug')('@lando/docs-theme');
const {isLinkHttp} = require('@vuepress/shared');
const {logger, path} = require('@vuepress/utils');
const url = require('url');

// Our things
const autopopulate = require('./lib/autopopulate');
const pages = require('./lib/pages');
const {getTopLevelPages, makeFauxInternal} = require('./lib/utils');

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

  // If we want to show the lando navbar then lets add it to the begining of the navbar
  if (!_.isNil(options.landoNavbar)) {
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

      // Add latest version and link to page data
      if (options.showVersion) {
        data.version = options.version;
        data.versionLink = options.versionLink;
      }

      // Return all collected data
      return data;
    },

    // Add in some pages
    async onInitialized(app) {
      // Try to autopopulate data as needed
      // Determine whether we have the things we need to actually autopopulate
      options.autoPopulate = options.autoPopulate && options.isGithubRepo;
      const {contributors, versions} = options.pages;
      // Determine which data we should actually try to populate
      const fetchContributors = contributors.show && _.isEmpty(contributors.data);
      const fetchVersions = versions.show && _.isEmpty(versions.data);
      const fetchLatestVersion = options.showVersion && options.version === null;

      // Try to autopopulate data contributors data if needed
      if (options.autoPopulate && fetchContributors) {
        debug('trying to grab contributors data from %s', options.sourceRepo);
        try {
          contributors.data = await autopopulate.contributors(options);
        } catch (err) {
          logger.error('could not automatically grab contributors with error', err);
        };
      }

      // Try to autopopulate data versions data if needed
      if (options.autoPopulate && fetchVersions) {
        debug('trying to grab versions data from %s', options.sourceRepo);
        try {
          versions.data = await autopopulate.versions(options, options);
        } catch (err) {
          logger.error('could not automatically grab versions with error', err);
        };
      }

      // Try to autopopulate latest versions data if needed
      if (options.autoPopulate && fetchLatestVersion) {
        debug('trying to grab latest version data from %s', options.sourceRepo);
        try {
          const latestVersion = await autopopulate.latestVersion(options, options);
          options.version = latestVersion.name;
          options.versionLink = options.versionLink || latestVersion.url;
        } catch (err) {
          logger.error('could not automatically grab latest version with error', err);
        };
      }

      // Add contributors page if its hasnt already been manually set
      if (contributors.show && !_.includes(topLevelPages, 'contributors')) {
        app.options.themeConfig.sidebar.push({text: contributors.title, link: contributors.link});
        debug('programatically added %s to sidebar linking to %s', contributors.title, contributors.link);
        // Also add the page if its an internal link and we dont have a page already
        if (!isLinkHttp(contributors.link) && app.pages.every(page => page.path !== contributors.link)) {
          const contributorsPage = await createPage(app, pages.contributors(contributors));
          app.pages.push(contributorsPage);
          debug('programatically added contributors page to %s', contributors.link);
        }
      }

      // Add versions page if its hasnt already been manually set
      if (versions.show && !_.includes(topLevelPages, 'versions')) {
        app.options.themeConfig.sidebar.push({text: versions.title, link: versions.link});
        debug('programatically added %s to sidebar linking to %s', versions.title, versions.link);
        // Also add the page if its an internal link and we dont have a page already
        if (!isLinkHttp(versions.link) && app.pages.every(page => page.path !== versions.link)) {
          const versionsPage = await createPage(app, pages.contributors(versions));
          app.pages.push(versionsPage);
          debug('programatically added versions page to %s', versions.link);
        }
      }
    },

    // Replace the core linksPlugin
    extendsMarkdown: md => {
      md.use(customLinks, options);
    },
  };
};
