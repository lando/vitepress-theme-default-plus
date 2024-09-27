import {default as getStdOut} from './parse-stdout.js';

import Debug from 'debug';

export default function(cwd, {
  debug = Debug('@lando/create-exec'), // eslint-disable-line
} = {}) {
  return (command, options) => {
    // combine options
    options = {cwd: cwd, stdio: 'inherit', ...options};
    // debug
    debug('running %o with %o', command, options);
    // exec
    return getStdOut(command, options);
  };
};
