import {useData} from 'vitepress';
import {default as normalize} from './normalize-2base.js';

export default function normalizemvbLink(url) {
  const {site} = useData();
  return normalize(url, site?.value?.themeConfig?.multiVersionBuild?.mvbase ?? '/');
};
