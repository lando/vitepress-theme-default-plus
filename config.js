// mods
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

import merge from 'lodash/merge.js';
import Debug from 'debug';

import {defineConfigWithTheme} from 'vitepress';

// utils
import {default as createContainer} from './utils/create-container.js';
import {default as getContributors} from './utils/get-contributors.js';
import {default as getGaHeaders} from './utils/get-ga-headers.js';
import {default as getHubspotHeaders} from './utils/get-hubspot-headers.js';
import {default as parseLayouts} from './utils/parse-layouts.js';

// node/plugins
import {default as addContributors} from './node/add-contributors.js';
import {default as addLayoutsPlugin} from './vite/add-layout-components-plugin.js';
import {default as addMetadata} from './node/add-metadata.js';
import {default as augmentAuthors} from './node/augment-authors.js';
import {default as allowInternalPlugin} from './vite/allow-internal-plugin.js';
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

// base config
import {default as baseConfig} from './config/defaults.js';

export async function defineConfig(userConfig = {}) {
  const debug = Debug('@lando/vpltheme'); // eslint-disable-line
  // merge config sources
  const config = merge({}, baseConfig, userConfig);
  // set srcRoot
  debug('incoming vitepress configuration %O', config);

  // get plugin root
  config.gitRoot = dirname(fileURLToPath(import.meta.url));
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

  // replacements
  const aliases = [
    {find: '@default-theme', replacement: fileURLToPath(new URL('./node_modules/vitepress/dist/client/theme-default', import.meta.url))},
    {find: /^.*\/VPDocFooter\.vue$/, replacement: fileURLToPath(new URL('./components/VPLDocFooter.vue', import.meta.url))},
    {find: /^.*\/VPMenuGroup\.vue$/, replacement: fileURLToPath(new URL('./components/VPLMenuGroup.vue', import.meta.url))},
    {find: /^.*\/VPNavBarMenuGroup\.vue$/, replacement: fileURLToPath(new URL('./components/VPLNavBarMenuGroup.vue', import.meta.url))},
    {find: /^.*\/VPTeamMembersItem\.vue$/, replacement: fileURLToPath(new URL('./components/VPLTeamMembersItem.vue', import.meta.url))},
  ];
  vite.resolve.alias.push(...aliases);
  debug('added vite resolver aliases %O', aliases);

  // vite plugins
  vite.plugins.push(...[
    addLayoutsPlugin(layouts, {debug: debug.extend('vite-plugin')}),
    allowInternalPlugin(internalDomains, {debug: debug.extend('vite-plugin')}),
    patchVPMenuColumnsPlugin({debug: debug.extend('vite-plugin')}),
  ]);

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
