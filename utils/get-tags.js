import * as semver from 'es-semver';

import {default as getBranch} from './get-branch.js';
import {default as getStdOut} from './parse-stdout.js';

import Debug from 'debug';

export default function async(
  cwd,
  {
    match = 'v[0-9].*',
    satisfies = '*',
  } = {},
  {
    debug = Debug('@lando/get-tags'), // eslint-disable-line
  } = {},
  ) {
  // stdout opts
  const opts = {cwd, trim: true};
  // quiet opts
  const qopts = {...opts, stdio: ['pipe', 'pipe', 'ignore']};

  // commands
  const tagCmd = ['git', '--no-pager', 'tag', '--list', `"${match}"`];
  const devReleaseCmd = ['git', 'describe', '--tags', '--always', '--abbrev=1', `--match="${match}"`];
  debug('getting tags with %o with exec options %o', tagCmd, opts);
  debug('getting dev release with %o with exec options %o', devReleaseCmd, opts);

  const tags = getStdOut(tagCmd.join(' '), opts);
  debug('matched %o tags with %o', tags.split('\n').length, match);

  // match tags to versions
  const versions = semver.rsort(tags.split('\n')
    .filter(tag => typeof tag === 'string')
    .filter(tag => semver.valid(semver.clean(tag)) !== null)
    .filter(tag => semver.satisfies(semver.clean(tag), satisfies, {includePrerelease: true}) === true));

  debug('matched %o versions using %o', versions.length, satisfies);

  // set aliases to HEAD by default
  const aliases = {dev: 'HEAD', edge: 'HEAD', stable: 'HEAD'};

  // get the dev alias
  aliases.dev =
    process?.env?.VPL_MVB_DEV_VERSION ??
    getStdOut(`${devReleaseCmd.join(' ')} ${getBranch(cwd)} || ${devReleaseCmd.join(' ')}`, qopts);

  // if we have versions data we can reset them to actual tags
  if (versions.length > 0) {
    aliases.edge = versions[0];
    aliases.stable = versions.filter(version => semver.prerelease(version) === null)[0];
  }
  debug('generated aliases %o', aliases);

  // construct extended information for ALL versions
  const extended = versions.map(version => ({
    ref: version,
    semantic: semver.clean(version),
    version: version,
  }));

  // add build aliases into extended unless the alias does not exist yet or is invalid
  for (const [alias, ref] of Object.entries(aliases)) {
    if (semver.valid(ref) !== null && alias !== 'dev') {
      extended.push({
        alias,
        ref,
        semantic: semver.clean(ref),
        version: ref,
      });
    }
  }

  // dev should always exist in extended
  extended.push({
    alias: 'dev',
    ref: getBranch(cwd),
    semantic: semver.valid(aliases.dev) === null ? '0.0.0' : semver.clean(aliases.dev),
    version: semver.valid(aliases.dev) === null ? 'v0.0.0' : aliases.dev,
  });
  debug('generated extended info %o', extended);

  return {aliases, extended, versions};
}
