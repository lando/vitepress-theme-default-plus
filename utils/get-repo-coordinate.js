import {default as execSync} from './parse-stdout.js';

import Debug from 'debug';

// Parse a GitHub repo URL into {owner, name}. Handles:
//  - git@github.com:owner/name.git       (ssh)
//  - https://github.com/owner/name.git   (https)
//  - https://github.com/owner/name       (no .git)
//  - github:owner/name                   (npm shorthand)
const parseUrl = url => {
  if (typeof url !== 'string' || url.length === 0) return null;
  // npm shorthand: "github:owner/name"
  const npmMatch = url.match(/^github:([^/]+)\/([^/.]+?)(?:\.git)?$/);
  if (npmMatch) return {owner: npmMatch[1], name: npmMatch[2]};
  // ssh or https URL pointing at github.com
  const urlMatch = url.match(/github\.com[:/]([^/]+)\/([^/.]+?)(?:\.git)?\/?$/);
  if (urlMatch) return {owner: urlMatch[1], name: urlMatch[2]};
  return null;
};

// Try `git remote get-url origin`, fall back to package.json's `repository`
// field, fall back to nothing. Always non-throwing — callers degrade
// gracefully when no coordinate is available.
export default function getRepoCoordinate(cwd, {
  override,
  packageJson,
  debug = Debug('@lando/get-repo-coordinate'), // eslint-disable-line
} = {}) {
  // explicit override always wins
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

  // try git remote
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

  // try package.json `repository` field
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
