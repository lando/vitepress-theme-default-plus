import {useData} from 'vitepress';
import {default as normalize} from './normalize-2base.js';
import {default as normalizeMvb} from './normalize-mvblink.js';
import {default as normalizeRoot} from './normalize-rootlink.js';

export default function getItemNormalizedLink(item) {
  // if we dont have what we need just return that garbage
  if (!item.link) return item.link;

  const {site} = useData();
  const base = site?.value?.base ?? '/';

  // handle special rels
  if (item.rel === 'mvb') return normalizeMvb(item.link);
  else if (item.rel === 'root') return normalizeRoot(item.link);

  // and this is everythign else
  return normalize(item.link, base);
};
