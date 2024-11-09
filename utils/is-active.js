const EXT_RE = /(index)?\.(md|html)$/;
const HASH_RE = /#.*$/;
const inBrowser = typeof document !== 'undefined';
const normalize = path => decodeURI(path).replace(HASH_RE, '').replace(EXT_RE, '');

export default function isActive(currentPath, matchPath, asRegex) {
  if (matchPath === undefined) return false;

  currentPath = normalize(`/${currentPath}`);

  if (asRegex) return new RegExp(matchPath).test(currentPath);
  if (normalize(matchPath) !== currentPath) return false;

  const hashMatch = matchPath.match(HASH_RE);

  if (hashMatch) return (inBrowser ? location.hash : '') === hashMatch[0];

  return true;
};
