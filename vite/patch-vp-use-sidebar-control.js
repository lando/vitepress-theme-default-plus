import Debug from 'debug';
import {EOL} from 'node:os';

export default function({debug = Debug('@lando/vite-plugin')}) { // eslint-disable-line
  return {
    name: 'vp-use-sidebar-control',
    enforce: 'pre',
    transform: (code, id) => {
      const supportfile = 'dist/client/theme-default/composables/sidebar.js';
      if (id.includes(supportfile)) {
        // prepend our mvb normalizer
        code = `import { getItemNormalizedLink } from '@lando/vitepress-theme-default-plus';${EOL}${code}`;
        // and then use it
        code = code.replace(
          'isActive(page.value.relativePath, item.value.link)',
          'isActive(page.value.relativePath, getItemNormalizedLink(item.value))',
        );
        // log
        debug('patched %o to use getItemNormalizedLink', supportfile);
        return code;
      }
    },
  };
};
