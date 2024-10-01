import {default as getStdOut} from './parse-stdout.js';

export default function async(cwd = process.cwd()) {
  // lando build env directly
  if (process.env?.LANDO_MVB_BRANCH) return process.env?.LANDO_MVB_BRANCH;
  // or from source
  else if (process.env?.LANDO_MVB_SOURCE) return getStdOut('git rev-parse --abbrev-ref HEAD', {cwd: process.env?.LANDO_MVB_SOURCE, trim: true});
  // or if we are on netlify
  else if (process.env?.NETLIFY) return process.env.HEAD;
  // or GHA PR
  else if (process.env?.GITHUB_HEAD_REF) return process.env.GITHUB_HEAD_REF;
  // or GHA branch
  else if (process.env?.GITHUB_REF_NAME) return process.env.GITHUB_REF_NAME;
  // otherwise try to get it from git
  else return getStdOut('git rev-parse --abbrev-ref HEAD', {cwd, trim: true});
};
