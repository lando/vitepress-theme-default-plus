// mods
import container from 'markdown-it-container';
import merge from 'lodash/merge';

import Debug from 'debug';

import {defineConfigWithTheme} from 'vitepress';
import {default as createContainer} from './utils/create-container';
import {fileURLToPath} from 'node:url';

// parents
import {defineConfig as parentDefineConfig} from '@jcamp/vitepress-blog-theme/config';

// plugins
import {tabsMarkdownPlugin} from 'vitepress-plugin-tabs';

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
    sponsors: false,
  },
  markdown: {},
  vite: {
    resolve: {alias: []},
    plugins: [],
  },
});

const parseTabsParams = input => {
  const match = input.match(/key:(\S+)/);
  return {shareStateKey: match?.[1]};
};

export function defineConfig(userConfig = {}) {
  const debug = Debug('@lando/vpltheme'); // eslint-disable-line
  const config = merge({}, defaults(), parentDefineConfig(), userConfig);
  const {themeConfig} = config;
  debug('initial vitepress configuration %O', config);

  // normalize things
  if (typeof themeConfig.internalDomain === 'string') themeConfig.internalDomain = [themeConfig.internalDomain];
  if (typeof themeConfig.internalDomains === 'string') themeConfig.internalDomains = [themeConfig.internalDomains];
  themeConfig.internalDomains = [...themeConfig.internalDomain, ...themeConfig.internalDomains];

  // allow our stuff to use default theme stuff
  config.vite.resolve.alias.push({
    find: '@default-theme',
    replacement: fileURLToPath(new URL('./node_modules/vitepress/dist/client/theme-default', import.meta.url)),
  });

  // patch VPMenu to handle columns
  config.vite.plugins.push({
    name: 'vpmenugroup-columns',
    enforce: 'pre',
    transform: (code, id) => {
      if (id.endsWith('VPMenu.vue')) {
        return code.replace(':items="item.items"', ':items="item.items" :columns="item.columns"');
      }
    },
  });
  debug('patched vitepress/theme VPMenu.vue so VPMenuGroup.vue can handle columns');

  // swap out VPMenuGroup for higer vibes
  const customVPMG = fileURLToPath(new URL('./components/VPLMenuGroup.vue', import.meta.url));
  config.vite.resolve.alias.push({
    find: /^.*\/VPMenuGroup\.vue$/,
    replacement: customVPMG,
  });
  debug('replaced vitepress/theme VPMenuGroup.vue with %o', customVPMG);

  // if we have internalDomains then patch VPLink.vue so it also considers a list of domains as "internal"
  if (Array.isArray(themeConfig.internalDomains) && themeConfig.internalDomains.length > 0) {
    config.vite.plugins.push({
      name: 'make-all-internal',
      enforce: 'pre',
      transform: (code, id) => {
        if (id.endsWith('VPLink.vue')) {
          const replacee = 'EXTERNAL_URL_RE.test(props.href)';
          const okdomains = themeConfig.internalDomains.map(domain => `!props.href.startsWith('${domain}')`);
          return code.replace(replacee, `(${replacee} && ${okdomains.join(' && ')})`);
        }
      },
    });
    debug('patched vitepress/theme VPLink.vue to whitelist %o', themeConfig.internalDomains);
  }

  // markdown
  config.markdown.config = md => {
    // add custom markdown containers, including tabs
    for (const [name, opts] of Object.entries(themeConfig.containers)) {
      md.use(...createContainer(name, opts, md));
    }

    // add tabs plugin
    md.use(tabsMarkdownPlugin);
    // override the tabs container so we can inject styling
    md.use(container, 'tabs', {
      render(tokens, index, _options, env) {
        const token = tokens[index];
        const style = token.info.trim().slice(4).trim();

        if (token.nesting === 1) {
          const params = parseTabsParams(token.info);
          const shareStateKeyProp = params.shareStateKey
            ? `sharedStateKey="${md.utils.escapeHtml(params.shareStateKey)}"`
            : '';
          return `<PluginTabs class="${style}" ${shareStateKeyProp}>\n`;
        } else {
          return `</PluginTabs>\n`;
        }
      },
    });
  };

  // debug here so we dont get duplicates
  for (const [name, opts] of Object.entries(themeConfig.containers)) {
    debug('added custom markdown container %o with config %o', name, opts);
  }
  debug('added custom markdown container %o with config %o', 'vitepress-plugin-tabs');

  return defineConfigWithTheme(config);
}
