import Debug from 'debug';
import {default as createContentLoader} from '../utils/create-content-loader.js';

const config = globalThis.VITEPRESS_CONFIG?.site?.themeConfig?.collections ?? {};
const debug = Debug('@lando/collections.data.js'); // eslint-disable-line
const siteConfig = globalThis.VITEPRESS_CONFIG;

const patterns = Object.entries(config)
  .map(([type, config]) => config.patterns)
  .flat(Number.POSITIVE_INFINITY);

debug('loading collections data with patterns config %o', patterns);

export default createContentLoader(patterns, {siteConfig}, {debug});
