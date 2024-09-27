#!/usr/bin/env node
import path from 'node:path';
import fs from 'fs-extra';

import {tmpdir} from 'node:os';
import {nanoid} from 'nanoid';
import {build, resolveConfig} from 'vitepress';

import {default as getStdOut} from '../utils/parse-stdout.js';
import {default as getTags} from '../utils/get-tags.js';
import {default as traverseUp} from '../utils/traverse-up.js';

import Debug from 'debug';

const debug = Debug('@lando/vitepress-mvb'); // eslint-disable-line

// @TODO: args parsing?
//  * support all vitepress build opts
//  * support /tmp location?
//  * support starting version?
// @TODO: do we want a help/usage of some kind?
// @TODO: remove defaults once we have arg handling
// @TODO: wrap whole thing in try?
const options = {
  clean: true,
  // configPath
  logLevel: 'debug',
  outDir: './.vitepress/dist',
  owd: process.cwd(),
  srcDir: './docs',
  ssr: false,
  tmpDir: tmpdir(),
  watch: false,
};

// turn on debugger if flag is present
if (options.logLevel === 'debug') Debug.enable(process.env.DEBUG ?? '*');
// append an id to the tmpdir
options.tmpDir = path.resolve(options.tmpDir, nanoid());

// get site config to help with options resolution
const siteConfig = await resolveConfig(path.resolve(process.cwd(), options.srcDir), 'build', 'production');
const config = siteConfig?.site?.themeConfig?.multiVersionBuild ?? {};

// debug log final options resolution
debug('multiversion build using build options: %O', options);
debug('multiversion build using mvb options: %O', config);

// build a helper for running commands in tmp
const exec = (command, options = {}) => {
  // combine options
  options = {cwd: tmpDir, stdio: 'inherit', ...options};
  // debug
  debug('running %o with %o', command, options);
  // exec
  return getStdOut(command, options);
};

// break it up
const {clean, logLevel, outDir, owd, srcDir, tmpDir} = options;

// do the initial setup
fs.removeSync(tmpDir, {force: true, maxRetries: 10, recursive: true});
fs.mkdirSync(tmpDir, {recursive: true});

// save current working directory because we need to switch back to this when we copy?
const gitDir = traverseUp(['.git'], path.resolve(owd, srcDir)).find(dir => fs.existsSync(dir));
debug('determined git-dir: %o', gitDir);

// get remote git URL
const gitUrl = getStdOut('git config --get remote.origin.url', {trim: true});
debug('determined remote.origin.url: %o', gitUrl);

// get versions and aliases
const {aliases, versions} = await getTags(gitDir, config);
console.log(aliases, versions);
process.exit();

// switch cwd to tmpdir
process.chdir(tmpDir);
debug('changed cwd to: %o', process.cwd());

// clone repo into tmp
exec(`git clone ${gitUrl} ./`);
// get all refs
exec('git fetch origin');
// and tags
exec('git pull --tags');
// npm install
exec('npm clean-install');

// get all semantically versioned git tags from starting with tag, include prereleases and sort them

// @TODO:
// log aliases
// implement starting versions
// build array of build config? {version, ref, buildOpts}
// push aliases
// unshift root

process.exit(1);

// loop through and build
  // git reset HEAD --hard
  // git checkout
  // npm i?
  // update package.json version with version info if mismatch

// create some kind of index page? add tag data to pages?
// tags.data.js and then a v/index.hml?


// options.srcDir = path.resolve(process.cwd(), options.srcDir);
// options.outDir = path.resolve(process.cwd(), options.srcDir, options.outDir);
// options.mvDir = path.resolve(process.cwd(), options.srcDir, options.mvDir);

// test build
await build(srcDir, {outDir: path.join(srcDir, outDir), logLevel});

// resolve outdirs
const tmpOutDir = path.resolve(tmpDir, srcDir, outDir);
const owdOutDir = path.resolve(owd, srcDir, outDir);

// if clean then wipe owd outdir
if (clean) fs.removeSync(owdOutDir, {force: true, maxRetries: 10, recursive: true});

// then move tmp to owd
console.log(tmpOutDir, owdOutDir);
fs.moveSync(tmpOutDir, owdOutDir);

// done?
