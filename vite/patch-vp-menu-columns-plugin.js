import Debug from 'debug';

export default function({debug = Debug('@lando/vite-plugin')}) { // eslint-disable-line
  return {
    name: 'vpmenugroup-columns',
    enforce: 'pre',
    transform: (code, id) => {
      const menufile = 'VPMenu.vue';
      if (id.endsWith(menufile)) {
        debug('patched %o to add columns support to dropdown menu groups', menufile);
        return code.replace(':items="item.items"', ':items="item.items" :columns="item.columns"');
      }
    },
  };
};
