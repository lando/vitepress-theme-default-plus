// mods
import merge from 'lodash/merge';

import Debug from 'debug';

import {defineConfigWithTheme} from 'vitepress';
import {default as createContainer} from './utils/create-container';
import {fileURLToPath} from 'node:url';

// parents
import {defineConfig as parentDefineConfig} from '@jcamp/vitepress-blog-theme/config';

// plugins
import {default as allowInternalPlugin} from './vite/allow-internal-plugin';
import {default as linkOverridePlugin} from './markdown/link-override-plugin';
import {default as patchVPMenuColumnsPlugin} from './vite/patch-vp-menu-columns-plugin';
import {tabsMarkdownPlugin} from 'vitepress-plugin-tabs';
import {default as tabsMarkdownOverridePlugin} from './markdown/tabs-override-plugin';

const defaults = (config = {}) => ({
  themeConfig: {
    alert: false,
    containers: {
      'brand': {defaultTitle: 'BRAND'},
      'box': {},
      'box-blue': {},
      'box-brand': {},
      'box-green': {},
      'box-red': {},
      'box-yellow': {},
      'caption': {},
      'card': {},
      'center': {},
      'half': {},
      'highlight': {},
      'left': {},
      'right': {},
      'success': {defaultTitle: 'SUCCESS'},
      'third': {},
      'thumbnail': {},
    },
    internalDomain: [],
    internalDomains: [],
    jobs: false,
    lastUpdated: {
      text: 'Last updated',
    },
    sponsors: false,
  },
  markdown: {},
  vite: {
    resolve: {alias: []},
    plugins: [],
  },
});


export function defineConfig(userConfig = {}) {
  const debug = Debug('@lando/vpltheme'); // eslint-disable-line

  // resolve paths
  const themeDefaultPath = fileURLToPath(new URL('./node_modules/vitepress/dist/client/theme-default', import.meta.url));
  const customVPMG = fileURLToPath(new URL('./components/VPLMenuGroup.vue', import.meta.url));
  const customVPNBMG = fileURLToPath(new URL('./components/VPLNavBarMenuGroup.vue', import.meta.url));

  // merge config sources
  const config = merge({}, defaults(), parentDefineConfig(), userConfig);
  const {markdown, themeConfig} = config;
  debug('initial vitepress configuration %O', config);

  // normalize things
  if (typeof themeConfig.internalDomain === 'string') themeConfig.internalDomain = [themeConfig.internalDomain];
  if (typeof themeConfig.internalDomains === 'string') themeConfig.internalDomains = [themeConfig.internalDomains];
  themeConfig.internalDomains = [...themeConfig.internalDomain, ...themeConfig.internalDomains];
  const {containers, internalDomains} = themeConfig;

  // allow our stuff to use default theme stuff
  config.vite.resolve.alias.push({find: '@default-theme', replacement: themeDefaultPath});

  // patch VPMenu to handle columns
  config.vite.plugins.push(patchVPMenuColumnsPlugin);
  debug('patched vitepress/theme VPMenu.vue so VPMenuGroup.vue can handle columns');

  // patch VPLink.vue so it also considers a list of domains as "internal"
  config.vite.plugins.push(allowInternalPlugin(internalDomains));
  debug('patched vitepress/theme VPLink.vue to whitelist %o', internalDomains);

  // swap out VPMenuGroup for higer vibes
  config.vite.resolve.alias.push({find: /^.*\/VPMenuGroup\.vue$/, replacement: customVPMG});
  debug('replaced vitepress/theme VPMenuGroup.vue with %o', customVPMG);

  // swap out VPNavBarMenuGroup for higer vibes
  config.vite.resolve.alias.push({find: /^.*\/VPNavBarMenuGroup\.vue$/, replacement: customVPNBMG});
  debug('replaced vitepress/theme VPNavBarMenuGroup.vue with %o', customVPNBMG);

  // markdown
  markdown.config = md => {
    // add custom markdown containers, including tabs
    for (const [name, opts] of Object.entries(containers)) md.use(...createContainer(name, opts, md));
    // add tabs plugin
    md.use(tabsMarkdownPlugin);
    // override the tabs container so we can inject styling
    md.use(tabsMarkdownOverridePlugin);
    // override the link plugin so it can handle internal domains
    md.use(linkOverridePlugin, {target: '_blank', rel: 'noreferrer', ...markdown.externalLinks}, config.base, internalDomains);
  };

  // debug here so we dont get duplicates
  for (const [name, opts] of Object.entries(containers)) {
    debug('added custom markdown container %o with config %o', name, opts);
  }
  debug('added custom markdown container %o with config %o', 'vitepress-plugin-tabs');
  debug('added custom markdown link_open rule with config %o', internalDomains);

  // contrib data
  // config.transformPageData = async (pageData, {siteConfig}) => {
  //   // debug('hello %O %O', pageData, siteConfig);
  // };

  return defineConfigWithTheme(config);
}
