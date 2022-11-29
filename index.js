// Mods
const _ = require('lodash');
const chokidar = require('chokidar');
const debug = require('debug')('@lando/vuepress-theme-default-plus');
const {chalk, logger, path} = require('@vuepress/utils');

const {defaultTheme} = require('@vuepress/theme-default');
const {registerComponentsPlugin} = require('@vuepress/plugin-register-components');

// Our things
const {getPlugins} = require('./lib/plugins');

module.exports = options => {
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
  delete options.defaults;
  // Remove defaults so its less confusing
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
  debug('loaded always on plugins %o', _.map(plugins, plugin => plugin.name));

  // GOOGLE ANALYTICS PLUGIN
  if (options.ga) {
    const {googleAnalyticsPlugin} = require('@vuepress/plugin-google-analytics');
    plugins.push(googleAnalyticsPlugin(options.ga));
    debug('loaded google analytics plugin with config %o', options.ga);
  }

  // HUBSPOT TRACKING PLUGIN
  if (options.hubspot) {
    const {hubspotPlugin} = require(path.resolve(__dirname, 'plugins', 'plugin-hubspot-tracking'));
    plugins.push(hubspotPlugin(options.hubspot));
    debug('loaded hubspot tracking plugin with config %o', options.hubspot);
  }

  // AUTOMETA PLUGIN
  if (options.autometa) {
    const {autometaPlugin} = require(path.resolve(__dirname, 'plugins', 'plugin-autometa'));
    plugins.push(autometaPlugin(options.autometa));
    debug('loaded autometa plugin with config: %o', options.autometa);
  }

  // FAUX INTERNAL LINKS PLUGIN
  if (options.baseUrl) {
    const {fauxInternalPlugin} = require(path.resolve(__dirname, 'plugins', 'plugin-faux-internal'));
    plugins.push(fauxInternalPlugin(options));
    debug('loaded faux internal plugin with baseurl: %o', options.baseUrl);
  }

  // SEARCH PLUGIN
  if (options.search) {
    // Use advanced search
    if (options.search.apiKey && options.search.indexName) {
      options.search.searchBase = options.search.searchBase || options.baseUrl;

      const {docSearchPlusPlugin} = require(path.resolve(__dirname, 'plugins', 'plugin-docsearch-plus'));
      plugins.push(docSearchPlusPlugin(options.search));
      debug('loaded docsearch plus plugin with config: %o', options.search);

    // Use default search
    } else {
      const {searchPlugin} = require('@vuepress/plugin-search');
      plugins.push(searchPlugin());
      debug('loaded core search plus');
    }
  }

  // REGISTER PAGE TYPE COMPONENTS
  if (options.pageTypes) {
    const entries = new Map(options.pageTypes.map(page => ([page.name, page.path])));
    const components = Object.fromEntries(entries);
    debug('registered page type components: %o', components);
    plugins.push(registerComponentsPlugin({components}));
  }

  // ROBOTS.TXT PLUGIN
  if (options.robots) {
    options.robots.host = options.robots.host || options.baseUrl || options.autometa.canonicalUrl;
    if (options.sitemap && options.robots.host) {
      options.robots.sitemap = `${new URL(options.robots.host).origin}/sitemap.xml`;
    }

    const {robotsTxtPlugin} = require(path.resolve(__dirname, 'plugins', 'plugin-robots'));
    plugins.push(robotsTxtPlugin(options.robots));
    debug('loaded robots.txt plugin with config: %o', options.robots);
  }

  // SITEMAP PLUGIN
  if (options.sitemap) {
    if (options.sitemap === true) options.sitemap = {};
    options.sitemap.baseUrl = options.sitemap.baseUrl || options.autometa.canonicalUrl || options.baseUrl;

    const {siteMapPlugin} = require(path.resolve(__dirname, 'plugins', 'plugin-sitemap'));
    plugins.push(siteMapPlugin(options.sitemap));
    debug('loaded sitemap plugin with config: %o', options.sitemap);
  }

  // SIDEBAR HEADER PLUGIN
  if (options.sidebarHeader) {
    options.sidebarHeader.repo = options.sidebarHeader.repo || options.sourceRepo;
    options.sidebarHeader.auto = true;

    const {sidebarHeaderPlugin} = require(path.resolve(__dirname, 'plugins', 'plugin-sidebar-header'));
    plugins.push(sidebarHeaderPlugin(options.sidebarHeader));
    debug('loaded sidebar header plugin with config: %o', options.sidebarHeader);
  }

  // READ MODE PLUGIN
  if (options.readMode) {
    const {readModePlugin} = require(path.resolve(__dirname, 'plugins', 'plugin-read-mode'));
    plugins.push(readModePlugin(options.readMode));
    debug('loaded read mode plugin with config: %o', options.readMode);
  }

  // VERSIONS PAGE PLUGIN
  if (options.versionsPage) {
    options.versionsPage.repo = options.versionsPage.repo || options.sourceRepo;
    options.versionsPage.docsDir = options.versionsPage.docsDir || options.docsDir;
    options.versionsPage.docsBranch = options.versionsPage.docsBranch || options.docsBranch;

    const {versionsPagePlugin} = require(path.resolve(__dirname, 'plugins', 'plugin-versions-page'));
    plugins.push(versionsPagePlugin(options.versionsPage, options.sidebar));
    debug('loaded versions page plugin with config: %o', options.versionsPage);
    // globally add the Version list component
    plugins.push(registerComponentsPlugin({
      components: {
        VersionsList: path.resolve(__dirname, 'plugins', 'plugin-versions-page', 'VersionsList.vue'),
      },
    }));
  }

  // CONTRIBTUORS PAGE PLUGIN
  if (options.contributorsPage) {
    options.contributorsPage.repo = options.contributorsPage.repo || options.sourceRepo;
    options.contributorsPage.docsDir = options.contributorsPage.docsDir || options.docsDir;
    options.contributorsPage.docsBranch = options.contributorsPage.docsBranch || options.docsBranch;

    const {contributorsPagePlugin} = require(path.resolve(__dirname, 'plugins', 'plugin-contributors-page'));
    plugins.push(contributorsPagePlugin(options.contributorsPage, options.sidebar));
    debug('loaded contributors page plugin with config: %o', options.contributorsPage);
    // globally add the Version list component
    plugins.push(registerComponentsPlugin({
      components: {
        ContributorList: path.resolve(__dirname, 'plugins', 'plugin-contributors-page', 'ContributorList.vue'),
      },
    }));
  }

  // SIMPLE TAGS PLUGIN
  if (options.tags) {
    const {simpleTagsPlugin} = require(path.resolve(__dirname, 'plugins', 'plugin-simple-tags'));
    plugins.push(simpleTagsPlugin(options.tags));
    debug('loaded simple tags plugin with config: %o', options.tags);

    plugins.push(registerComponentsPlugin({
      components: {
        TagPage: path.resolve(__dirname, 'plugins', 'plugin-simple-tags', 'TagPage.vue'),
      },
    }));
  }

  return {
    name: '@lando/vuepress-theme-default-plus',
    extends: defaultTheme(options),
    layouts: path.resolve(__dirname, 'layouts'),
    clientConfigFile: path.resolve(__dirname, 'client.js'),
    alias: {
      ...{
        // override defaults
        '@theme/NavbarBrand.vue': path.resolve(__dirname, 'components', 'CustomNavbarBrand.vue'),
        '@theme/PageMeta.vue': path.resolve(__dirname, 'components', 'CustomPageMeta.vue'),
        // make overideable
        '@theme/BlogHeader.vue': path.resolve(__dirname, 'components', 'BlogHeader.vue'),
        '@theme/BlogPost.vue': path.resolve(__dirname, 'components', 'BlogPost.vue'),
        '@theme/Guide.vue': path.resolve(__dirname, 'components', 'Guide.vue'),
        '@theme/GuideHeader.vue': path.resolve(__dirname, 'components', 'GuideHeader.vue'),
        '@theme/CarbonAds.vue': path.resolve(__dirname, 'components', 'CarbonAds.vue'),
        '@theme/SocialLinks.vue': path.resolve(__dirname, 'components', 'SocialLinks.vue'),
        '@theme/TOC.vue': path.resolve(__dirname, 'components', 'TOC.vue'),
        // override overrides
        '@theme/CustomNavbarBrand.vue': path.resolve(__dirname, 'components', 'CustomNavbarBrand.vue'),
        '@theme/CustomPageMeta.vue': path.resolve(__dirname, 'components', 'CustomPageMeta.vue'),
        // @NOTE: special we override the plugin alias because this is requried in our layout regardless of whether the plugin
        // loads or not
        // '@theme/ReadMode.vue': path.resolve(__dirname, 'plugins', 'plugin-read-mode', 'ReadMode.vue'),
        '@theme/SidebarHeader.vue': path.resolve(__dirname, 'plugins', 'plugin-sidebar-header', 'SidebarHeader.vue'),
        '@theme/TagList.vue': path.resolve(__dirname, 'plugins', 'plugin-simple-tags', 'TagList.vue'),
      },
      ...options.alias,
    },
    define: {
      __THEME_OPTIONS__: options,
    },
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
