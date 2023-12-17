// Mods
import _ from 'lodash';
import Debug from 'debug';
import chokidar from 'chokidar';

// vuepress things
import {chalk, getDirname, logger, path} from '@vuepress/utils';
import {defaultTheme} from '@vuepress/theme-default';

// vuepress core plugins
import {googleAnalyticsPlugin} from '@vuepress/plugin-google-analytics';
import {registerComponentsPlugin} from '@vuepress/plugin-register-components';
import {searchPlugin} from '@vuepress/plugin-search';

// our plugins
import {alertPlugin} from './plugins/plugin-alert/index.js';
import {autometaPlugin} from './plugins/plugin-autometa/index.js';
import {contributorsPagePlugin} from './plugins/plugin-contributors-page/index.js';
import {docSearchPlusPlugin} from './plugins/plugin-docsearch-plus/index.js';
import {fauxInternalPlugin} from './plugins/plugin-faux-internal/index.js';
import {getPlugins} from './lib/plugins.js';
import {hubspotPlugin} from './plugins/plugin-hubspot-tracking/index.js';
import {readModePlugin} from './plugins/plugin-read-mode/index.js';
import {robotsTxtPlugin} from './plugins/plugin-robots/index.js';
import {sidebarHeaderPlugin} from './plugins/plugin-sidebar-header/index.js';
import {simpleTagsPlugin} from './plugins/plugin-simple-tags/index.js';
import {siteMapPlugin} from './plugins/plugin-sitemap/index.js';
import {versionsPagePlugin} from './plugins/plugin-versions-page/index.js';

// our defaults
import themeDefaults from './config/defaults.js';
import themeLandoV3Defaults from './config/landov3.js';
import themeLandoV4Defaults from './config/landov4.js';

const __dirname = getDirname(import.meta.url);

export const defaultThemePlus = options => {
  const debug = Debug('@lando/vuepress-theme-default-plus'); // eslint-disable-line

  // prefer landov4 if defaults not set
  if (_.isEmpty(options.defaults) && options.landoDocs === 4) {
    debug('no user defaults set, using lando v4 defaults');
    options.defaults = themeLandoV4Defaults;
  // ditto but for lando v3
  } else if (_.isEmpty(options.defaults) && options.landoDocs === 3) {
    debug('no user defaults set, using lando v3 defaults');
    options.defaults = themeLandoV3Defaults;
  // Same as above but for legacy things
  } else if (_.isEmpty(options.defaults) && (options.landoDocs || options.lando)) {
    debug('no user defaults set, using lando v3 defaults');
    options.defaults = themeLandoV3Defaults;
  // Otherwise if we are empty then just set to defaults
  } else if (_.isEmpty(options.defaults)) {
    debug('no user defaults set, using theme defaults');
    options.defaults = themeDefaults;
  }

  // Rebase options on defaults
  options = _.merge({}, options.defaults, options);

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
  if (!_.isNil(options.sharedNavbar) && _.isArray(options.sharedNavbar)) {
    options.navbar = options.sharedNavbar.concat(options.navbar);
    debug('prepended shared navbar to user specified navbar with %o', options.sharedNavbar);
  }

  // ALWAYS ON PLUGINS
  const plugins = getPlugins(options);
  debug('loaded always on plugins %o', _.map(plugins, plugin => plugin.name));

  // GOOGLE ANALYTICS PLUGIN
  if (options.ga) {
    plugins.push(googleAnalyticsPlugin(options.ga));
    debug('loaded google analytics plugin with config %o', options.ga);
  }

  // HUBSPOT TRACKING PLUGIN
  if (options.hubspot) {
    plugins.push(hubspotPlugin(options.hubspot));
    debug('loaded hubspot tracking plugin with config %o', options.hubspot);
  }

  // AUTOMETA PLUGIN
  if (options.autometa) {
    plugins.push(autometaPlugin(options.autometa));
    debug('loaded autometa plugin with config: %o', options.autometa);
  }

  // FAUX INTERNAL LINKS PLUGIN
  if (options.baseUrl) {
    plugins.push(fauxInternalPlugin(options));
    debug('loaded faux internal plugin with baseurl: %o', options.baseUrl);
  }

  // SEARCH PLUGIN
  if (options.search) {
    // Use advanced search
    if (options.search.apiKey && options.search.indexName) {
      options.search.searchBase = options.search.searchBase || options.baseUrl;
      plugins.push(docSearchPlusPlugin(options.search));
      debug('loaded docsearch plus plugin with config: %o', options.search);

    // Use default search
    } else {
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

    plugins.push(robotsTxtPlugin(options.robots));
    debug('loaded robots.txt plugin with config: %o', options.robots);
  }

  // SITEMAP PLUGIN
  if (options.sitemap) {
    if (options.sitemap === true) options.sitemap = {};
    options.sitemap.baseUrl = options.sitemap.baseUrl || options.autometa.canonicalUrl || options.baseUrl;

    plugins.push(siteMapPlugin(options.sitemap));
    debug('loaded sitemap plugin with config: %o', options.sitemap);
  }

  // SIDEBAR HEADER PLUGIN
  if (options.sidebarHeader) {
    options.sidebarHeader.repo = options.sidebarHeader.repo || options.sourceRepo;
    options.sidebarHeader.auto = true;

    plugins.push(sidebarHeaderPlugin(options.sidebarHeader));
    debug('loaded sidebar header plugin with config: %o', options.sidebarHeader);
  }

  // READ MODE PLUGIN
  if (options.readMode) {
    plugins.push(readModePlugin(options.readMode));
    debug('loaded read mode plugin with config: %o', options.readMode);
  }

  // VERSIONS PAGE PLUGIN
  if (options.versionsPage) {
    options.versionsPage.repo = options.versionsPage.repo || options.sourceRepo;
    options.versionsPage.docsDir = options.versionsPage.docsDir || options.docsDir;
    options.versionsPage.docsBranch = options.versionsPage.docsBranch || options.docsBranch;

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
    plugins.push(simpleTagsPlugin(options.tags));
    debug('loaded simple tags plugin with config: %o', options.tags);

    plugins.push(registerComponentsPlugin({
      components: {
        TagPage: path.resolve(__dirname, 'plugins', 'plugin-simple-tags', 'TagPage.vue'),
      },
    }));
  }

  // ALERT PLUGIN
  if (options.alert) {
    plugins.push(alertPlugin(options.alert));
    debug('loaded alert plugin with config: %o', options.alert);
  }

  return {
    name: '@lando/vuepress-theme-default-plus',
    extends: defaultTheme(options),
    clientConfigFile: path.resolve(__dirname, 'client.js'),
    alias: {
      ...{
        // override defaults
        '@theme/NavbarBrand.vue': path.resolve(__dirname, 'components', 'CustomNavbarBrand.vue'),
        '@theme/NavbarDropdown.vue': path.resolve(__dirname, 'components', 'CustomNavbarDropdown.vue'),
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
        '@theme/Alert.vue': path.resolve(__dirname, 'plugins', 'plugin-alert', 'Alert.vue'),
        '@theme/ReadMode.vue': path.resolve(__dirname, 'plugins', 'plugin-read-mode', 'ReadMode.vue'),
        '@theme/SidebarHeader.vue': path.resolve(__dirname, 'plugins', 'plugin-sidebar-header', 'SidebarHeader.vue'),
        '@theme/TagList.vue': path.resolve(__dirname, 'plugins', 'plugin-simple-tags', 'TagList.vue'),
      },
      ...options.alias,
    },
    define: {
      __THEME_OPTIONS__: options,
    },

    // all our plugins
    plugins,

    // we need to make sure that blueimp is included in dep optimization because it is commonjs
    extendsBundlerOptions: (bundlerOptions, app) => {
      // extends options of @vuepress/bundler-vite
      if (app.options.bundler.name === '@vuepress/bundler-vite') {
        const path = 'viteOptions.optimizeDeps.include';
        const includes = _.get(bundlerOptions, path, []);
        includes.push('blueimp-md5');
        _.set(bundlerOptions, path, _.uniq(includes));
        debug('modified vite to include blueimp-md5, includes are now %j', _.get(bundlerOptions, path));
      }
    },

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
