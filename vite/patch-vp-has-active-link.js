import Debug from 'debug';
import {EOL} from 'node:os';

export default function({debug = Debug('@lando/vite-plugin')}) { // eslint-disable-line
  return {
    name: 'vp-has-active-links',
    enforce: 'pre',
    transform: (code, id) => {
      const supportfile = 'dist/client/theme-default/support/sidebar.js';
      if (id.includes(supportfile)) {
        // prepend our mvb normalizer
        code = `import { getItemNormalizedLink } from '@lando/vitepress-theme-default-plus';${EOL}${code}`;
        // and then use it
        code = code.replace('return isActive(path, items.link)', 'return isActive(path, getItemNormalizedLink(items))');
        // log
        debug('patched %o to use getItemNormalizedLink', supportfile);
        return code;
      }
    },
  };
};
