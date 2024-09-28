import {spawn} from 'node:child_process';
import {merge} from 'lodash-es';
import {bold, dim} from 'colorette';

import {default as mergePromise} from './merge-promise.js';

import Debug from 'debug';

export default function(defaults = {}) {
  return function(command, args = [], options = {}, stdout = '', stderr = '') {
    // @TODO: error handling?
    // merge our options over the defaults
    options = merge({debug: Debug('@lando/run-command'), ignoreReturnCode: false, env: process.env}, defaults, options); // eslint-disable-line
    const {debug} = options;

    // birth
    debug('running command %o %o', command, args);
    const child = spawn(command, args, options);

    return mergePromise(child, async () => {
      return new Promise((resolve, reject) => {
        child.on('error', error => {
          debug('command %o error %o', command, error?.message);
          stderr += error?.message ?? error;
        });

        child.stdout.on('data', data => {
          debug('%s %s', bold('stdout'), dim(data.toString().trim()));
          stdout += data;
        });

        child.stderr.on('data', data => {
          debug('%s %s', bold('stderr'), dim(data.toString().trim()));
          stderr += data;
        });

        child.on('close', code => {
          debug('command %o done with code %o', command, code);
          // if code is non-zero and we arent ignoring then reject here
          if (code !== 0 && !options.ignoreReturnCode) {
            const error = new Error(stderr);
            error.code = code;
            reject(error);
          }

          // otherwise return
          resolve({stdout, stderr, code});
        });
      });
    });
  };
};
