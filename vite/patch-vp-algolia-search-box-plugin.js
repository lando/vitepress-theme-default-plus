import Debug from 'debug';

export default function({debug = Debug('@lando/vite-plugin')}) { // eslint-disable-line
  return {
    name: 'vpmenugroup-columns',
    enforce: 'pre',
    transform: (code, id) => {
      const searchbox = 'VPAlgoliaSearchBox.vue';
      if (id.endsWith(searchbox)) {
        debug('patched %o to add internalDomain support', searchbox);
        return code.replace('return', 'return url ??');
      }
    },
  };
};
