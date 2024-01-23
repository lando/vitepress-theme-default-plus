import {existsSync} from 'node:fs';
import {basename, dirname} from 'node:path';

import Debug from 'debug';

import {default as execSync} from './parse-stdout.js';

export default function async(file,
  {
    debug = Debug('@lando/get-timestamp'), // eslint-disable-line
  } = {},
  ) {
  // blow up
  const cwd = dirname(file);
  const fileName = basename(file);

  // if this is a new file then i guess just return now?
  if (!existsSync(cwd)) return Date.now();

  // command and opts
  const command = ['git', 'log', '-1', '--pretty="%ai"', fileName];
  const opts = {cwd, stdin: 'inherit'};

  // run
  debug('running command %o with exec options %o', command, opts);
  const stdout = execSync(command.join(' '), opts);
  return stdout.trim();
}
