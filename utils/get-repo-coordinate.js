import {default as execSync} from './parse-stdout.js';

import Debug from 'debug';

// parse {owner, name} from ssh/https github URLs or npm `github:owner/name` shorthand
const parseUrl = url => {
  if (typeof url !== 'string' || url.length === 0) return null;
  const npmMatch = url.match(/^github:([^/]+)\/([^/]+?)(?:\.git)?$/);
  if (npmMatch) return {owner: npmMatch[1], name: npmMatch[2]};
  const urlMatch = url.match(/github\.com[:/]([^/]+)\/([^/]+?)(?:\.git)?\/?$/);
  if (urlMatch) return {owner: urlMatch[1], name: urlMatch[2]};
  return null;
};

// non-throwing: tries override → git remote → package.json → null
export default function getRepoCoordinate(cwd, {
  override,
  packageJson,
  debug = Debug('@lando/get-repo-coordinate'), // eslint-disable-line
} = {}) {
  if (override) {
    if (typeof override === 'string') {
      const parts = override.split('/');
      if (parts.length === 2) {
        debug('using override repo coordinate %o/%o', parts[0], parts[1]);
        return {owner: parts[0], name: parts[1]};
      }
    } else if (override.owner && override.name) {
      debug('using override repo coordinate %o/%o', override.owner, override.name);
      return override;
    }
  }

  try {
    const url = execSync('git remote get-url origin', {cwd, trim: true, stdio: ['ignore', 'pipe', 'ignore']});
    const parsed = parseUrl(url);
    if (parsed) {
      debug('parsed repo coordinate %o/%o from git remote %o', parsed.owner, parsed.name, url);
      return parsed;
    }
    debug('git remote %o did not look like a github URL', url);
  } catch (error) {
    debug('git remote lookup failed: %o', error.message);
  }

  if (packageJson) {
    const repoField = packageJson.repository?.url ?? packageJson.repository;
    const parsed = parseUrl(repoField);
    if (parsed) {
      debug('parsed repo coordinate %o/%o from package.json', parsed.owner, parsed.name);
      return parsed;
    }
  }

  debug('no repo coordinate could be determined');
  return null;
};
