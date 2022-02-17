// Mods
const _ = require('lodash');
const {createPage} = require('@vuepress/core');
const customLinks = require('./plugins/plugin-custom-links.js');
const debug = require('debug')('@lando/default-plus');
const {isLinkHttp} = require('@vuepress/shared');
const {logger, path} = require('@vuepress/utils');
const url = require('url');

// Our things
const autopopulate = require('./lib/autopopulate');
const pages = require('./lib/pages');
const {getTopLevelPages, makeFauxInternal} = require('./lib/utils');

module.exports = (options, app) => {
  // Rebase options on defaults
  const defaults = options.landoDocs ? require('./lib/lando') : require('./lib/defaults');
  options = {...defaults, ...options};
  app.options.themeConfig = {...defaults, ...app.options.themeConfig};

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

  // If baseURL is set then lets mutate sharedNavbar
  if (options.baseUrl) {
    options.sharedNavbar = makeFauxInternal(options.sharedNavbar, options.baseUrl);
    debug('rebased navbar so links to %s appear as internal links', options.baseUrl);
  }

  // If we want to show the shared navbar then lets add it to the begining of the navbar
  if (!_.isNil(options.sharedNavbar)) {
    options.navbar = options.sharedNavbar.concat(options.navbar);
    debug('prepended shared navbar to user specified navbar with %o', options.sharedNavbar);
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

  if (options.ga && options.ga.enabled) {
    plugins.push(['@vuepress/plugin-google-analytics', options.ga]);
    debug('added google analytics plugin');
  }

  // Add in seach and/or docsearch if applicable
  if (options.search && options.search.enabled) {
    if (options.search.apiKey && options.search.indexName) {
      plugins.push([path.resolve(__dirname, './plugins/plugin-docsearch-plus.js'), options.search]);
      debug('added docsearch plugin');
    } else {
      plugins.push(['@vuepress/search']);
      debug('added search plugin');
    }
  }

  return {
    name: '@lando/vuepress-theme-default-plus',
    extends: '@vuepress/theme-default',
    alias: {
      '@theme/PageMeta.vue': path.resolve(__dirname, 'components', 'CustomPageMeta.vue'),
    },
    define: {
      __THEME_OPTIONS__: options,
    },
    layouts: path.resolve(__dirname, 'layouts'),
    plugins,

    // Add some page data
    async extendsPage(page) {
      // Assess whether we can/should fetch the latest version
      const fetchLatestVersion = options.autoPopulate && options.isGithubRepo;

      // Try to autopopulate latest versions data if needed
      if (fetchLatestVersion && !options.sidebarHeader.version) {
        debug('trying to grab latest version data from %s', options.sourceRepo);
        try {
          const memoedlatestVersion = _.memoize(async () => await autopopulate.latestVersion(options, options));
          const latestVersion = await memoedlatestVersion();
          options.sidebarHeader.version = latestVersion.name;
          options.sidebarHeader.versionLink = options.versionLink || latestVersion.url;
        } catch (err) {
          logger.error('could not automatically grab latest version with error', err);
        };
      }

      // Add latest version and link to page data
      if (options.sidebarHeader.version) {
        page.data.version = options.sidebarHeader.version;
        const {version, title, key} = page.data;
        debug('added version %s to page data "%s" (%s)', version, title, key);
      }
      if (options.sidebarHeader.versionLink) {
        page.data.versionLink = options.sidebarHeader.versionLink;
        const {versionLink, title, key} = page.data;
        debug('added version link %s to page data "%s" (%s)', versionLink, title, key);
      }

      // if head is not an array then lets make it into an empty array
      if (!_.isArray(page.data.frontmatter.head)) page.data.frontmatter.head = [];

      // construct twitter metadata push unshift into frontmatter
      // Vuepress2 seems to prioritize the earliest same named content so we need to push
      // instead of unshift
      const title = page.frontmatter.title || page.data.title || app.options.title || app.siteData.title;
      const description = page.frontmatter.description || page.data.frontmatter.description || app.options.title;
      const timestamp = _.get(page, 'data.git.updatedTime', new Date().getTime());
      page.data.frontmatter.head.push(
        ['meta', {name: 'twitter:card', content: 'summary'}],
        ['meta', {name: 'twitter:title', content: title}],
        ['meta', {name: 'twitter:description', content: description}],
        ['meta', {name: 'twitter:site', content: _.get(app, 'options.themeConfig.social.owner', title)}],
        ['meta', {property: 'og:type', content: 'article'}],
        ['meta', {property: 'og:title', content: title}],
        ['meta', {property: 'og:description', content: description}],
        ['meta', {property: 'og:site_name', content: app.siteData.title}],
        ['meta', {property: 'article:published_time', content: new Date(timestamp)}],
        ['meta', {itemprop: 'name', content: title}],
        ['meta', {itemprop: 'description', content: description}],
      );

      // add urls if we can
      if (_.has(app, 'options.themeConfig.canonicalUrl')) {
        const url = `${app.options.themeConfig.canonicalUrl}${app.options.base}${_.trim(page.data.path, '/')}`;
        page.data.frontmatter.head.push(
          ['meta', {name: 'twitter:url', content: url}],
          ['meta', {property: 'og:url', content: url}],
          ['link', {rel: 'canonical', href: url}],
        );
      }

      // add image if we can
      if (_.has(page, 'frontmatter.image')) {
        const image = page.frontmatter.image;
        page.data.frontmatter.head.push(
          ['meta', {name: 'og:image', content: image}],
          ['meta', {name: 'og:image:alt', content: title}],
          ['meta', {name: 'twitter:image', content: image}],
          ['meta', {name: 'twitter:image:alt', content: title}],
        );
      }
    },

    // Add in some pages
    async onInitialized(app) {
      // Throw warning message if autopopulate is on but repo is not github
      if (options.autoPopulate && !options.isGithubRepo) {
        logger.warn('Autopopulate is on but does not work with non-github repos!');
      }

      // Try to autopopulate data as needed
      // Determine whether we have the things we need to actually autopopulate
      options.autoPopulate = options.autoPopulate && options.isGithubRepo;

      const {contributors, versions} = options.pages;
      // Determine which data we should actually try to populate
      const fetchContributors = contributors.enabled && _.isEmpty(contributors.data);
      const fetchVersions = versions.enabled && _.isEmpty(versions.data);

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

      // Add contributors page if its hasnt already been manually set
      if (contributors.enabled && !_.includes(topLevelPages, 'contributors')) {
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
      if (versions.enabled && !_.includes(topLevelPages, 'versions')) {
        app.options.themeConfig.sidebar.push({text: versions.title, link: versions.link});
        debug('programatically added %s to sidebar linking to %s', versions.title, versions.link);
        // Add information about the "dev" release if we can
        if (versions.showEdge && options.isGithubRepo) {
          const {githubOwner, githubRepo, docsBranch, docsDir} = options;
          versions.edgeVersion = {
            href: `https://github.com/${githubOwner}/${githubRepo}/tree/${docsBranch}/${docsDir}`,
            name: docsBranch,
            target: '_blank',
            rel: 'noopener noreferrer',
          };
        };
        // Also add the page if its an internal link and we dont have a page already
        if (!isLinkHttp(versions.link) && app.pages.every(page => page.path !== versions.link)) {
          const versionsPage = await createPage(app, pages.versions(versions));
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
