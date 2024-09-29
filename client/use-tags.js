import {data as tags} from './tags.data.js';

import {useData} from 'vitepress';

export default function useTags() {
  console.log(tags);
  // get version path data
  const {theme} = useData();
  const base = theme?.value?.multiVersionBuild?.base ?? '/v/';

  // generate links we can pass into VPLVersionLink
  const links = tags.versions
    .map(version => ({
      text: version,
      href: `/${base}/${version}/`.replace(/\/{2,}/g, '/'),
      prerelease: /^v?\d+\.\d+\.\d+-\S+$/.test(version),
      stable: tags?.aliases?.stable === version,
      edge: tags?.aliases?.edge === version,
    }));

  return {...tags, links};
}
