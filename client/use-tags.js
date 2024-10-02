import {data as tags} from './tags.data.js';

import {useData} from 'vitepress';

export default function useTags() {
  // get version path data
  const {site, theme} = useData();
  const base = site?.value?.base ?? '/';
  const vbase = theme?.value?.multiVersionBuild?.base ?? '/v/';

  // generate links we can pass into VPLVersionLink
  const links = tags.versions
    .map(version => ({
      text: version,
      href: `${base}/${vbase}/${version}/`.replace(/\/{2,}/g, '/'),
      prerelease: /^v?\d+\.\d+\.\d+-\S+$/.test(version),
      stable: tags?.aliases?.stable === version,
      edge: tags?.aliases?.edge === version,
    }));

  // also generate alias linkes
  const aliasLinks = {
    dev: `${base}/${vbase}/dev/`.replace(/\/{2,}/g, '/'),
    edge: `${base}/${vbase}/edge/`.replace(/\/{2,}/g, '/'),
    stable: `${base}/${vbase}/stable/`.replace(/\/{2,}/g, '/'),
  };

  return {...tags, links, aliasLinks};
}
