// mods
import container from 'markdown-it-container';
import merge from 'lodash/merge';

import Debug from 'debug';

import {defineConfigWithTheme} from 'vitepress';
import {default as createContainer} from './utils/create-container';

// parents
import {defineConfig as parentDefineConfig} from '@jcamp/vitepress-blog-theme/config';

// plugins
import {tabsMarkdownPlugin} from 'vitepress-plugin-tabs';

const defaults = (config = {}) => ({
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
  markdown: {},
});

const parseTabsParams = input => {
  const match = input.match(/key:(\S+)/);
  return {shareStateKey: match?.[1]};
};

export function defineConfig(userConfig = {}) {
  const debug = Debug('@lando/vpltheme'); // eslint-disable-line
  const config = merge({}, defaults(), parentDefineConfig(), userConfig);
  debug('initial vitepress configuration %O', config);

  // debug here so we dont get duplicates
  for (const [name, opts] of Object.entries(config.containers)) {
    debug('adding custom markdown container %o with config %o', name, opts);
  }
  debug('adding custom markdown container %o with config %o', 'vitepress-plugin-tabs');

  // markdown
  config.markdown.config = md => {
    // add custom markdown containers, including tabs
    for (const [name, opts] of Object.entries(config.containers)) {
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

  return defineConfigWithTheme(config);
}
