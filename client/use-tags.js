import {data as tags} from './tags.data.js';

import {useData} from 'vitepress';

export default function useTags() {
  // get version path data
  const {site} = useData();
  const base = site?.value?.base ?? '/';

  // generate links we can pass into VPLVersionLink
  const links = tags.versions
    .map(version => ({
      text: version,
      href: `/${base}/${version}/`.replace(/\/{2,}/g, '/'),
      prerelease: /^v?\d+\.\d+\.\d+-\S+$/.test(version),
      stable: tags?.aliases?.stable === version,
      edge: tags?.aliases?.edge === version,
    }));

  // also generate alias linkes
  const aliasLinks = {
    dev: `/${base}/dev/`.replace(/\/{2,}/g, '/'),
    edge: `/${base}/edge/`.replace(/\/{2,}/g, '/'),
    stable: `/${base}/stable/`.replace(/\/{2,}/g, '/'),
  };

  return {...tags, links, aliasLinks};
}
