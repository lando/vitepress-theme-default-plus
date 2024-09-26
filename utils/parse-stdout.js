import {execSync} from 'node:child_process';

export default function(cmd, options) {
  const stdout = execSync(cmd, {maxBuffer: 1024 * 1024 * 10, encoding: 'utf-8', ...options});
  return options.trim === true ? stdout.trim() : stdout;
};
