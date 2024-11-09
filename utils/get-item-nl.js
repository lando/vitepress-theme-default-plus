import {default as normalize} from './normalize-2base.js';

export default function getItemNormalizedLink(item, site) {
  // if we dont have what we need just return that garbage
  if (!item.link) return item.link;

  // if this is not a special mvb then just return
  if (item.rel !== 'mvb') return item.link;

  // otherwise normalize on version base
  return normalize(item.link, site?.themeConfig?.multiVersionBuild?.base ?? '/', site);
};
