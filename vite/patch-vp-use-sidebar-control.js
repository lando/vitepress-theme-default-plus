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
        code = `import { normalizeItems } from '@lando/vitepress-theme-default-plus';${EOL}${code}`;

        // make sure we get "site" as well
        code = code.replace(
          'const { page, hash } = useData()',
          'const { site, page, hash } = useData()',
        );

        // and then use getItemNormalizedLink
        code = code.replace(
          'isActive(page.value.relativePath, item.value.link)',
          'isActive(page.value.relativePath, getItemNormalizedLink(item.value, site.value))',
        );

        // and also use normalizeItems
        code = code.replace(
          'containsActiveLink(page.value.relativePath, item.value.items)',
          'containsActiveLink(page.value.relativePath, normalizeItems(item.value.items, site.value))',
        );

        // log
        debug('patched %o to use getItemNormalizedLink', supportfile);
        return code;
      }
    },
  };
};
