
import Debug from 'debug';

import {default as getTags} from '../utils/get-tags.js';

const debug = Debug('@lando/tags.data.js'); // eslint-disable-line
const siteConfig = globalThis.VITEPRESS_CONFIG;

export default {
  async load() {
    const config = siteConfig?.userConfig?.themeConfig?.multiVersionBuild ?? {};
    const root = siteConfig?.userConfig?.gitRoot;
    const tags = await getTags(root, config, {debug: debug.extend('get-tags')});
    debug('loading tag data %o', tags);
    return tags;
  },
};
