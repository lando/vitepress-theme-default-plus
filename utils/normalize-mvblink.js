import {default as normalize} from './normalize-2base.js';

export default function normalizemvbLink(url, site) {
  return normalize(url, site?.themeConfig?.multiVersionBuild?.mvbase ?? '/', site);
};
