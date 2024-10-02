import {data as tags} from './tags.data.js';

import {useData} from 'vitepress';

export default function useTags() {
  // get version path data
  const {theme} = useData();
  // if no mvb then just return tags
  if (!theme.value.multiVersionBuild) return tags;

  // otherwise lets augment it with links and shit!
  const {absoluteBase} = theme.value.multiVersionBuild;

  // generate links we can pass into VPLVersionLink
  const links = tags.versions
    .map(version => ({
      text: version,
      href: `/${absoluteBase}/${version}/`.replace(/\/{2,}/g, '/'),
      prerelease: /^v?\d+\.\d+\.\d+-\S+$/.test(version),
      stable: tags?.aliases?.stable === version,
      edge: tags?.aliases?.edge === version,
    }));

  // also generate alias linkes
  const aliasLinks = {
    dev: `/${absoluteBase}/dev/`.replace(/\/{2,}/g, '/'),
    edge: `/${absoluteBase}/edge/`.replace(/\/{2,}/g, '/'),
    stable: `/${absoluteBase}/stable/`.replace(/\/{2,}/g, '/'),
  };

  return {...tags, links, aliasLinks};
}
