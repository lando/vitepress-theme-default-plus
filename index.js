// Mods
const _ = require('lodash');
const chokidar = require('chokidar');
const debug = require('debug')('@lando/vuepress-theme-default-plus');
const {chalk, logger, path} = require('@vuepress/utils');

// Our things
const {getPlugins} = require('./lib/plugins');

module.exports = (options, app) => {
  // If landoDocs/lando is set and defaults are empty then start there
  if (_.isEmpty(options.defaults) && (options.landoDocs || options.lando)) {
    debug('no user defaults set, using lando doc defaults');
    options.defaults = require('./config/lando');
  // Otherwise if we are empty then just set to defaults
  } else if (_.isEmpty(options.defaults)) {
    debug('no user defaults set, using theme defaults');
    options.defaults = require('./config/defaults');
  }

  // Rebase options on defaults
  options = {...options.defaults, ...options};
  app.options.themeConfig = {...options.defaults, ...app.options.themeConfig};
  // Remove defaults so its less confusing
  delete options.defaults;
  debug('merging user config over defaults, result: %O', options);

  // We want to preserve the value of options.repo but we do not want to set it because it will show up
  // in the nav if we do
  options.sourceRepo = options.repo;
  delete options.repo;
  debug('removed repo and set sourceRepo to %s', options.sourceRepo);

  // SHARED NAVBAR
  // If we want to show the shared navbar then lets add it to the begining of the navbar
  if (!_.isNil(options.sharedNavbar)) {
    options.navbar = options.sharedNavbar.concat(options.navbar);
    debug('prepended shared navbar to user specified navbar with %o', options.sharedNavbar);
  }

  // ALWAYS ON PLUGINS
  const plugins = getPlugins(options);
  debug('loaded always on plugins %o', _.map(plugins, plugin => plugin[0]));

  // GOOGLE ANALYTICS PLUGIN
  if (options.ga) {
    plugins.push(['@vuepress/plugin-google-analytics', options.ga]);
    debug('loaded google analytics plugin with config %o', options.ga);
  }

  // HUBSPOT TRACKING PLUGIN
  if (options.hubspot) {
    plugins.push([path.resolve(__dirname, 'plugins', 'plugin-hubspot-tracking'), options.hubspot]);
    debug('loaded hubspot tracking plugin with config %o', options.hubspot);
  }

  // AUTOMETA PLUGIN
  if (options.autometa) {
    plugins.push([path.resolve(__dirname, 'plugins', 'plugin-autometa'), options.autometa]);
    debug('loaded autometa plugin with config: %o', options.autometa);
  }

  // FAUX INTERNAL LINKS PLUGIN
  if (options.baseUrl) {
    plugins.push([path.resolve(__dirname, 'plugins', 'plugin-faux-internal'), options]);
    debug('loaded faux internal plugin with baseurl: %o', options.baseUrl);
  }

  // SEARCH PLUGIN
  if (options.search) {
    if (options.search.apiKey && options.search.indexName) {
      // Fallback to baseUrl for convenience
      options.search.searchBase = options.search.searchBase || options.baseUrl;
      plugins.push([path.resolve(__dirname, 'plugins', 'plugin-docsearch-plus'), options.search]);
      debug('loaded docsearch plus plugin with config: %o', options.search);
    } else {
      plugins.push(['@vuepress/search']);
      debug('loaded core search plus');
    }
  }

  // REGISTER PAGE TYPE COMPONENTS
  if (options.pageTypes) {
    const entries = new Map(options.pageTypes.map(page => ([page.name, page.path])));
    const components = Object.fromEntries(entries);
    debug('registered page type components: %o', components);
    plugins.push(['@vuepress/register-components', {components}]);
  }

  // ROBOTS.TXT PLUGIN
  if (options.robots) {
    options.robots.host = options.robots.host || options.baseUrl || options.autometa.canonicalUrl;
    if (options.sitemap && options.robots.host) {
      options.robots.sitemap = `${new URL(options.robots.host).origin}/sitemap.xml`;
    }
    plugins.push([path.resolve(__dirname, 'plugins', 'plugin-robots'), options.robots]);
    debug('loaded robots.txt plugin with config: %o', options.robots);
  }

  // SITEMAP PLUGIN
  if (options.sitemap) {
    if (options.sitemap === true) options.sitemap = {};
    options.sitemap.baseUrl = options.sitemap.baseUrl || options.autometa.canonicalUrl || options.baseUrl;
    plugins.push([path.resolve(__dirname, 'plugins', 'plugin-sitemap'), options.sitemap]);
    debug('loaded sitemap plugin with config: %o', options.sitemap);
  }

  // SIDEBAR HEADER PLUGIN
  if (options.sidebarHeader) {
    options.sidebarHeader.repo = options.sidebarHeader.repo || options.sourceRepo;
    options.sidebarHeader.auto = true;
    plugins.push([path.resolve(__dirname, 'plugins', 'plugin-sidebar-header'), options.sidebarHeader]);
    debug('loaded sidebar header plugin with config: %o', options.sidebarHeader);
  }

  // READ MODE PLUGIN
  if (options.readMode) {
    plugins.push([path.resolve(__dirname, 'plugins', 'plugin-read-mode'), options.readMode]);
    debug('loaded read mode plugin with config: %o', options.readMode);
  }

  // VERSIONS PAGE PLUGIN
  if (options.versionsPage) {
    options.versionsPage.repo = options.versionsPage.repo || options.sourceRepo;
    options.versionsPage.docsDir = options.versionsPage.docsDir || options.docsDir;
    options.versionsPage.docsBranch = options.versionsPage.docsBranch || options.docsBranch;
    plugins.push([path.resolve(__dirname, 'plugins', 'plugin-versions-page'), options.versionsPage]);
    debug('loaded versions page plugin with config: %o', options.versionsPage);
    // globally add the Version list component
    plugins.push(['@vuepress/register-components',
      {
        components: {
          VersionsList: path.resolve(__dirname, 'plugins', 'plugin-versions-page', 'VersionsList.vue'),
        },
      },
    ]);
  }

  // CONTRIBTUORS PAGE PLUGIN
  if (options.contributorsPage) {
    options.contributorsPage.repo = options.contributorsPage.repo || options.sourceRepo;
    options.contributorsPage.docsDir = options.contributorsPage.docsDir || options.docsDir;
    options.contributorsPage.docsBranch = options.contributorsPage.docsBranch || options.docsBranch;
    plugins.push([path.resolve(__dirname, 'plugins', 'plugin-contributors-page'), options.contributorsPage]);
    debug('loaded contributors page plugin with config: %o', options.contributorsPage);
    // globally add the Version list component
    plugins.push(['@vuepress/register-components',
      {
        components: {
          ContributorList: path.resolve(__dirname, 'plugins', 'plugin-contributors-page', 'ContributorList.vue'),
        },
      },
    ]);
  }

  // SIMPLE TAGS PLUGIN
  if (options.tags) {
    plugins.push([path.resolve(__dirname, 'plugins', 'plugin-simple-tags'), options.tags]);
    debug('loaded simple tags plugin with config: %o', options.tags);
    plugins.push(['@vuepress/register-components',
      {
        components: {
          TagPage: path.resolve(__dirname, 'plugins', 'plugin-simple-tags', 'TagPage.vue'),
        },
      },
    ]);
  }

  return {
    name: '@lando/vuepress-theme-default-plus',
    extends: '@vuepress/theme-default',
    alias: {
      ...{
        // override defaults
        '@theme/NavbarBrand.vue': path.resolve(__dirname, 'components', 'CustomNavbarBrand.vue'),
        '@theme/PageMeta.vue': path.resolve(__dirname, 'components', 'CustomPageMeta.vue'),
        // make overideable
        '@theme/BlogHeader.vue': path.resolve(__dirname, 'components', 'BlogHeader.vue'),
        '@theme/BlogPost.vue': path.resolve(__dirname, 'components', 'BlogPost.vue'),
        '@theme/CarbonAds.vue': path.resolve(__dirname, 'components', 'CarbonAds.vue'),
        '@theme/SocialLinks.vue': path.resolve(__dirname, 'components', 'SocialLinks.vue'),
        '@theme/TOC.vue': path.resolve(__dirname, 'components', 'TOC.vue'),
        // override overrides
        '@theme/CustomNavbarBrand.vue': path.resolve(__dirname, 'components', 'CustomNavbarBrand.vue'),
        '@theme/CustomPageMeta.vue': path.resolve(__dirname, 'components', 'CustomPageMeta.vue'),
        // @TODO: special we override the plugin alias because this is requried in our layout regardless of whether the plugin
        // loads or not
        '@theme/ReadMode.vue': path.resolve(__dirname, 'plugins', 'plugin-read-mode', 'ReadMode.vue'),
        '@theme/SidebarHeader.vue': path.resolve(__dirname, 'plugins', 'plugin-sidebar-header', 'SidebarHeader.vue'),
        '@theme/TagList.vue': path.resolve(__dirname, 'plugins', 'plugin-simple-tags', 'TagList.vue'),
      },
      ...options.alias,
    },
    define: {
      __THEME_OPTIONS__: options,
    },
    layouts: path.resolve(__dirname, 'layouts'),
    plugins,

    // Watch our plugin dir for changes as well
    async onWatched(app, watchers, restart) {
      const cwd = process.cwd();
      const dirs = [
        path.resolve(__dirname, 'config'),
        path.resolve(__dirname, 'lib'),
        path.resolve(__dirname, 'plugins'),
      ];
      const watcher = chokidar.watch(dirs, {cwd, ignoreInitial: true});
      watcher.on('change', file => {
        logger.info(`config ${chalk.magenta(file)} is modified`);
        restart();
      });
      watchers.push(watcher);
    },
  };
};
