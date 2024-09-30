export default function(version) {
  // start by extracting the prerelease information
  const prs = version.indexOf('-');
  // if prs -1 then its a stable release
  if (prs === -1) return false;
  // get prerelase into
  const [build, hash] = version.slice(prs + 1).split('-');
  // if build is an integer and hash is a string of length five let's say its a dev release
  return Number.isInteger(parseInt(build)) && typeof hash === 'string' && hash.length === 5;
};
