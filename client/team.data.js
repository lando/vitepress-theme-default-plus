
import Debug from 'debug';

import {default as getContributors} from '../utils/get-contributors.js';

const debug = Debug('@lando/team.data.js'); // eslint-disable-line
const siteConfig = globalThis.VITEPRESS_CONFIG;

export default {
  async load() {
    const contributors = siteConfig?.userConfig?.themeConfig?.contributors ?? false;
    const root = siteConfig?.userConfig?.gitRoot;
    const team = contributors !== false ? await getContributors(root, contributors, {debug: debug.extend('get-contribs'), paths: []}) : [];
    debug('loading team data %o', team);
    return team;
  },
};
