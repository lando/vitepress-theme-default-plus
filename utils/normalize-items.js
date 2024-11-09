import {default as getItemNormalizedLink} from './get-item-nl.js';

export default function normalizeItems(items, site) {
  return items.map(item => {
    if (item.items && Array.isArray(item.items)) return normalizeItems(item.items, site);
    else if (item.rel !== 'mvb') return item;
    else return {...item, link: getItemNormalizedLink(item, site)};
  });
};
