// mods
import {existsSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

import isEmpty from 'lodash-es/isEmpty.js';
import merge from 'lodash-es/merge.js';
import Debug from 'debug';

import {defineConfigWithTheme} from 'vitepress';

// utils
import {default as createContainer} from './utils/create-container.js';
import {default as getContributors} from './utils/get-contributors.js';
import {default as getGaHeaders} from './utils/get-ga-headers.js';
import {default as getHubspotHeaders} from './utils/get-hubspot-headers.js';
import {default as parseLayouts} from './utils/parse-layouts.js';
import {default as traverseUp} from './utils/traverse-up.js';

// node/plugins
import {default as addContributors} from './node/add-contributors.js';
import {default as addLayoutsPlugin} from './vite/add-layout-components-plugin.js';
import {default as addMetadata} from './node/add-metadata.js';
import {default as augmentAuthors} from './node/augment-authors.js';
import {default as buildCollections} from './node/build-collections.js';
import {default as normalizeFrontmatter} from './node/normalize-frontmatter.js';
import {default as normalizeLegacyFrontmatter} from './node/normalize-legacy-frontmatter.js';
import {default as parseCollections} from './node/parse-collections.js';
import {default as generateFeeds} from './node/generate-feeds.js';
import {default as generateRobotsTxt} from './node/generate-robots.js';
import {default as linkOverridePlugin} from './markdown/link-override-plugin.js';
import {default as patchVPMenuColumnsPlugin} from './vite/patch-vp-menu-columns-plugin.js';
import {tabsMarkdownPlugin} from 'vitepress-plugin-tabs';
import {default as tabsMarkdownOverridePlugin} from './markdown/tabs-override-plugin.js';

// configsets
import {default as baseConfig} from './config/defaults.js';
import {default as lando3BaseConfig} from './config/landov3.js';
import {default as lando4BaseConfig} from './config/landov4.js';

export async function defineConfig(userConfig = {}, defaults = {}) {
  const debug = Debug('@lando/vpltheme'); // eslint-disable-line

  // theme root
  userConfig.themeRoot = dirname(fileURLToPath(import.meta.url));

  // prefer landov4 if defaults not set
  if (isEmpty(userConfig.defaults) && userConfig.landoDocs === 4) {
    debug('no user defaults set, using lando v4 defaults');
    defaults = lando4BaseConfig(userConfig);
  // ditto but for lando v3
  } else if (isEmpty(userConfig.defaults) && userConfig.landoDocs === 3) {
    debug('no user defaults set, using lando v3 defaults');
    defaults = lando3BaseConfig(userConfig);
  // Same as above but for legacy things
  } else if (isEmpty(userConfig.defaults) && (userConfig.landoDocs || userConfig.lando)) {
    debug('no user defaults set, using lando v3 defaults');
    defaults = lando3BaseConfig(userConfig);
  // Otherwise if we are empty then just set to defaults
  } else if (isEmpty(userConfig.defaults)) {
    debug('no user defaults set, using theme defaults');
    defaults = baseConfig(userConfig);
  }

  // merge config sources
  const config = merge({}, defaults, userConfig);
  // log
  debug('incoming vitepress configuration %O', config);

  // get git root if its not defined
  if (!config.gitRoot) {
    const gitDir = traverseUp(['.git'], resolve(config.themeRoot, '..')).find(dir => existsSync(dir));
    config.gitRoot = gitDir ? resolve(gitDir, '..') : config.themeRoot;
    debug('automatically set gitRoot to %o', config.gitRoot);
  }

  // If we want to show the shared navbar then lets add it to the begining of the navbar
  if (Array.isArray(config?.themeConfig?.sharedNav)) {
    config.themeConfig.nav = config.themeConfig.sharedNav.concat(config.themeConfig.nav);
    debug('prepended shared navbar to user specified navbar with %o', config.themeConfig.sharedNav);
  }

  // explode
  const {markdown, themeConfig, sitemap, vite} = config;

  // normalize id
  if (typeof themeConfig.internalDomain === 'string') themeConfig.internalDomain = [themeConfig.internalDomain];
  if (typeof themeConfig.internalDomains === 'string') themeConfig.internalDomains = [themeConfig.internalDomains];
  themeConfig.internalDomains = [...themeConfig.internalDomain, ...themeConfig.internalDomains];
  // normalize contribs
  if (themeConfig.contributors === true) themeConfig.contributors = baseConfig.themeConfig.contributors;
  // normalize layouts
  if (Object.keys(themeConfig.layouts).length > 0) themeConfig.layouts = parseLayouts(themeConfig.layouts);

  // normalize sitemap
  if (!sitemap.hostname && themeConfig?.autometa?.canonicalUrl) sitemap.hostname = themeConfig.autometa.canonicalUrl;

  // attempt to set a baseurl
  config.baseUrl = themeConfig?.autometa?.canonicalUrl ?? sitemap.hostname;

  // extract
  const {containers, contributors, ga, hubspot, internalDomains, layouts} = themeConfig;

  // debug here so it doesnt print like 10 times
  for (const [name, opts] of Object.entries(containers)) {
    debug('added custom markdown container %o with config %o', name, opts);
  }

  // vite
  vite.resolve.alias.push(...[
    {find: /^.*\/VPAlgoliaSearchBox\.vue$/, replacement: fileURLToPath(new URL('./components/VPLAlgoliaSearchBox.vue', import.meta.url))},
    {find: /^.*\/VPDocFooter\.vue$/, replacement: fileURLToPath(new URL('./components/VPLDocFooter.vue', import.meta.url))},
    {find: /^.*\/VPLink\.vue$/, replacement: fileURLToPath(new URL('./components/VPLLink.vue', import.meta.url))},
    {find: /^.*\/VPMenuGroup\.vue$/, replacement: fileURLToPath(new URL('./components/VPLMenuGroup.vue', import.meta.url))},
    {find: /^.*\/VPNavBarMenuGroup\.vue$/, replacement: fileURLToPath(new URL('./components/VPLNavBarMenuGroup.vue', import.meta.url))},
    {find: /^.*\/VPTeamMembersItem\.vue$/, replacement: fileURLToPath(new URL('./components/VPLTeamMembersItem.vue', import.meta.url))},
  ]);

  vite.plugins.push(...[
    addLayoutsPlugin(layouts, {debug: debug.extend('vite-plugin')}),
    patchVPMenuColumnsPlugin({debug: debug.extend('vite-plugin')}),
  ]);
  vite.optimizeDeps.exclude.push('fsevents', '@lando/vitepress-theme-default-plus');
  vite.ssr.noExternal.push('@lando/vitepress-theme-default-plus');
  debug('added vite resolver config %O', vite.resolve);
  debug('added vite plugins %O', vite.plugins);
  debug('added vite optimizeDeps config %O', vite.optimizeDeps);
  debug('added vite ssr config %O', vite.ssr);

  // markdown plugins
  markdown.config = md => {
    // add custom markdown containers, including tabs
    for (const [name, opts] of Object.entries(containers)) {
      md.use(...createContainer(name, opts, md));
    }
    // add tabs plugin
    md.use(tabsMarkdownPlugin);
    // override the tabs container so we can inject styling
    md.use(tabsMarkdownOverridePlugin, {debug: debug.extend('markdown-plugin')});
    // override the link plugin so it can handle internal domains
    md.use(linkOverridePlugin, {
        target: '_blank',
        rel: 'noreferrer',
        ...markdown.externalLinks,
      },
      config.base,
      internalDomains,
      debug.extend('markdown-plugin'),
    );
  };

  // add google analytics
  if (ga !== false && ga.id) {
    config.head.push(...getGaHeaders(ga.id));
    debug('added google analytics/gtm tracking with %o', ga);
  }

  // add hubspot
  if (hubspot !== false && hubspot.id) {
    config.head.push(...getHubspotHeaders(hubspot.id));
    debug('added hubspot tracking with %o', hubspot);
  }

  // get full team info
  const opts = {debug: debug.extend('get-contribs'), paths: []};
  const team = contributors !== false ? await getContributors(config.gitRoot, contributors, opts) : [];
  debug('discovered full team info %o', team);

  // build robots.txt and rssfeed
  config.buildEnd = async siteConfig => {
    // generate robots txt
    await generateRobotsTxt(siteConfig, {debug: debug.extend('generate-robots')});
    // generate rss feeds
    await generateFeeds(siteConfig, {debug: debug.extend('generate-feeds')});
  };

  // augment pages with additional data
  config.transformPageData = async (pageData, {siteConfig}) => {
    // make sure siteConfig.collections exists and is populated
    await buildCollections(siteConfig, {debug: debug.extend('build-collections')});
    // normalize legacy frontmatter
    await normalizeLegacyFrontmatter(pageData, {siteConfig, debug: debug.extend('page-data')});
    // normalize frontmatter
    await normalizeFrontmatter(pageData, {siteConfig, debug: debug.extend('page-data')});
    // add contributor information
    await addContributors(pageData, {siteConfig, debug: debug.extend('page-data')});
    // add metadata information
    await addMetadata(pageData, {siteConfig, debug: debug.extend('page-data')});
    // parse collections
    await parseCollections(pageData, {siteConfig, debug: debug.extend('page-data')});
    // normalize authors
    await augmentAuthors(pageData, {team, debug: debug.extend('page-data')});
  };

  return defineConfigWithTheme(config);
}
