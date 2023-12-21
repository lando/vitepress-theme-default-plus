
export default {
  name: 'vpmenugroup-columns',
  enforce: 'pre',
  transform: (code, id) => {
    if (id.endsWith('VPMenu.vue')) {
      return code.replace(':items="item.items"', ':items="item.items" :columns="item.columns"');
    }
  },
};
