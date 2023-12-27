import {execSync} from 'node:child_process';

export default function(cmd, options) {
  return execSync(cmd, {maxBuffer: 1024 * 1024 * 10, encoding: 'utf-8', ...options});
};
