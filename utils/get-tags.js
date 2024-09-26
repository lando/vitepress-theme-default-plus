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
    .filter(tag => semver.valid(semver.clean(tag)) !== null)
    .filter(tag => semver.satisfies(semver.clean(tag), satisfies, {includePrerelease: true}) === true));
  debug('matched %o versions using %o', versions.length, satisfies);

  // get aliases
  const aliases = {
    dev: getStdOut(`git describe --tags --always --abbrev=1 --match="v[0-9].*"`, {trim: true}),
    edge: versions[0],
    stable: versions.filter(version => semver.prerelease(version) === null)[0],
  };
  debug('generated aliases %o', aliases);

  return {aliases, versions};
}
