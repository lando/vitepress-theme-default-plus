
import merge from 'lodash/merge';
import Debug from 'debug';

import {defineConfigWithTheme} from 'vitepress';

import {defineConfig as parentDefineConfig} from '@jcamp/vitepress-blog-theme/config';

export function defineConfig(userConfig = {}) {
  const debug = Debug('@lando/vpltheme'); // eslint-disable-line
  const config = merge({}, parentDefineConfig(), userConfig);
  debug('initial vitepress configuration %O', config);
  return defineConfigWithTheme(merge({}, parentDefineConfig(), config));
}
