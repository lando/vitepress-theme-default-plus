// mods
import {fileURLToPath} from 'node:url';

import merge from 'lodash/merge';
import Debug from 'debug';

import {defineConfigWithTheme} from 'vitepress';

// utils
import {default as createContainer} from './utils/create-container';
import {default as getGaHeaders} from './utils/get-ga-headers';
import {default as getHubspotHeaders} from './utils/get-hubspot-headers';
import {default as parseLayouts} from './utils/parse-layouts';

// parent config
import {defineConfig as parentDefineConfig} from '@jcamp/vitepress-blog-theme/config';

// plugins
import {default as addContributorsPlugin} from './node/add-contributors-plugin';
import {default as addLayoutsPlugin} from './vite/add-layout-components-plugin';
import {default as addMetadataPlugin} from './node/add-metadata-plugin';
import {default as allowInternalPlugin} from './vite/allow-internal-plugin';
import {genFeed as generateFeedPlugin} from '@jcamp/vitepress-blog-theme/config';
import {default as generateRobotsTxtPlugin} from './node/generate-robots-plugin';
import {default as linkOverridePlugin} from './markdown/link-override-plugin';
import {default as patchVPMenuColumnsPlugin} from './vite/patch-vp-menu-columns-plugin';
import {tabsMarkdownPlugin} from 'vitepress-plugin-tabs';
import {default as tabsMarkdownOverridePlugin} from './markdown/tabs-override-plugin';
import {processData as setupBlogPlugin} from '@jcamp/vitepress-blog-theme/config';

// base config
import {default as baseConfig} from './config/defaults';

export function defineConfig(userConfig = {}) {
  const debug = Debug('@lando/vpltheme'); // eslint-disable-line

  // merge config sources
  const config = merge({}, baseConfig, parentDefineConfig(), userConfig);
  const {markdown, themeConfig, sitemap, vite} = config;
  debug('incoming vitepress configuration %O', config);

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

  // extract
  const {containers, ga, hubspot, internalDomains, layouts} = themeConfig;

  // replacements
  const aliases = [
    {find: '@default-theme', replacement: fileURLToPath(new URL('./node_modules/vitepress/dist/client/theme-default', import.meta.url))},
    {find: /^.*\/VPDocFooterLastUpdated\.vue$/, replacement: fileURLToPath(new URL('./components/VPLDocFooterLastUpdated.vue', import.meta.url))},
    {find: /^.*\/VPMenuGroup\.vue$/, replacement: fileURLToPath(new URL('./components/VPLMenuGroup.vue', import.meta.url))},
    {find: /^.*\/VPNavBarMenuGroup\.vue$/, replacement: fileURLToPath(new URL('./components/VPLNavBarMenuGroup.vue', import.meta.url))},
    {find: /^.*\/VPTeamMembersItem\.vue$/, replacement: fileURLToPath(new URL('./components/VPLTeamMembersItem.vue', import.meta.url))},
  ];
  vite.resolve.alias.push(...aliases);
  debug('added vite resolver aliases %O', aliases);

  // vite plugins
  const plugins = [
    addLayoutsPlugin(layouts, {debug}),
    allowInternalPlugin(internalDomains, {debug}),
    patchVPMenuColumnsPlugin({debug}),
  ];
  vite.plugins.push(...plugins);

  // markdown plugins
  markdown.config = md => {
    // add custom markdown containers, including tabs
    for (const [name, opts] of Object.entries(containers)) {
      md.use(...createContainer(name, opts, md));
      debug('added custom markdown container %o with config %o', name, opts);
    }
    // add tabs plugin
    md.use(tabsMarkdownPlugin);
    // override the tabs container so we can inject styling
    md.use(tabsMarkdownOverridePlugin, {debug});
    // override the link plugin so it can handle internal domains
    md.use(linkOverridePlugin, {target: '_blank', rel: 'noreferrer', ...markdown.externalLinks}, config.base, internalDomains, debug);
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

  // build robots.txt and rssfeed
  config.buildEnd = async siteConfig => {
    // generate rss feed
    await generateFeedPlugin(siteConfig);
    // generate robots txt
    await generateRobotsTxtPlugin(siteConfig, {debug});
  };

  // augment pages with additional data
  config.transformPageData = async (pageData, ctx) => {
    // setup blog stuff
    await setupBlogPlugin(pageData, ctx);
    // add contributor information
    await addContributorsPlugin(pageData, {...ctx, debug});
    // add metadata information
    await addMetadataPlugin(pageData, {...ctx, debug});
  };

  return defineConfigWithTheme(config);
}
