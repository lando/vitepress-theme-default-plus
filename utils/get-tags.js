import semver from 'semver';

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
  // start with a command that will get ALL THE AUTHORS
  const command = ['git', '--no-pager', 'tag', '--list', `"${match}"`];
  const opts = {cwd, trim: true};

  // get first load of tags
  debug('running command %o with exec options %o', command, opts);
  const tags = getStdOut(command.join(' '), opts);
  debug('matched %o tags with %o', tags.split('\n').length, match);

  // match tags to versions
  const versions = semver.rsort(tags.split('\n')
    .filter(tag => typeof tag === 'string')
    .filter(tag => semver.valid(semver.clean(tag)) !== null)
    .filter(tag => semver.satisfies(semver.clean(tag), satisfies, {includePrerelease: true}) === true));
  debug('matched %o versions using %o', versions.length, satisfies);

  // set aliases to HEAD by default
  const aliases = {dev: 'HEAD', edge: 'HEAD', stable: 'HEAD'};

  // if we have versions data we can reset them to actual tags
  if (versions.length > 0) {
    aliases.edge = versions[0];
    aliases.stable = versions.filter(version => semver.prerelease(version) === null)[0];
    aliases.dev = getStdOut(`git describe --tags --always --abbrev=1 --match="${match}"`, {trim: true});
  }

  debug('generated aliases %o', aliases);
  console.log(aliases);

  // construct extended information for ALL versions
  const extended = versions.map(version => ({
    ref: version,
    semantic: semver.clean(version),
    version: version,
  }));

  // add aliases into extended unless the alias does not exist yet or is invalid
  for (const [alias, ref] of Object.entries(aliases)) {
    console.log(aliases, ref, semver.valid(ref));
    if (semver.valid(ref) !== null) {
      extended.push({
        alias,
        ref: alias !== 'dev' ? ref : getStdOut('git rev-parse --abbrev-ref HEAD', {trim: true}),
        semantic: semver.clean(ref),
        version: ref,
      });
    }
  }
  debug('generated extended info %o', extended);
  console.log(extended);

  return {aliases, extended, versions};
}
