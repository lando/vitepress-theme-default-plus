
import {defineConfigWithTheme} from 'vitepress';
import merge from 'lodash/merge';

import {defineConfig as parentDefineConfig} from '@jcamp/vitepress-blog-theme/config';

export function defineConfig(config = {}) {
  return defineConfigWithTheme(merge({}, parentDefineConfig(), config));
}
