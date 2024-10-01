#!/usr/bin/env node
import crypto from 'node:crypto';
import path from 'node:path';
import {format, inspect} from 'node:util';

import fs from 'fs-extra';
import parser from 'yargs-parser';
import {bold, dim, green, magenta, red} from 'colorette';
import {nanoid} from 'nanoid';
import {resolveConfig} from 'vitepress';

import {default as getStdOut} from '../utils/parse-stdout.js';
import {default as createExec} from '../utils/create-exec.js';
import {default as getBranch} from '../utils/get-branch.js';
import {default as getTags} from '../utils/get-tags.js';
import {default as traverseUp} from '../utils/traverse-up.js';

import Debug from 'debug';

// debugger
const debug = Debug('@lando/mvb');  // eslint-disable-line
// helper to get remote git clone url
const getCloneUrl = () => getStdOut('git config --get remote.origin.url', {trim: true});
// env
const onNetlify = process.env?.NETLIFY === 'true';

// enable debug if applicable
if (process.argv.includes('--debug') || process.env.RUNNER_DEBUG === '1') {
  Debug.enable(process.env.DEBUG ?? '*');
}

// kenny loggin utils
const log = (message = '', ...args) => {
  message = typeof message === 'string' ? message : inspect(message);
  if (debug.enabled) debug(message, ...args);
  else process.stdout.write(format(message, ...args) + '\n');
};

// lets start by getting argv
const argv = parser(process.argv.slice(2));
// source dir
const srcDir = argv._[0] ?? 'docs';
// orginal absolute path to source
const osource = path.resolve(process.cwd(), srcDir);
// help
const help = argv.h || argv.help;

// get site config
// @TODO: if no site then throw error? how do we determine that?
const siteConfig = await resolveConfig(osource, 'build', 'production');
const {site} = siteConfig;

// build default options
const defaults = {
  base: site?.base ?? '/',
  build: site?.themeConfig?.multiVersionBuild?.build ?? 'stable',
  cache: site?.themeConfig?.multiVersionBuild?.cache ?? true,
  match: site?.themeConfig?.multiVersionBuild?.match ?? 'v[0-9].*',
  outDir: path.relative(process.cwd(), siteConfig.outDir) ?? './.vitepress/dist',
  satisfies: site?.themeConfig?.multiVersionBuild?.satisfies ?? '*',
  versionBase: site?.themeConfig?.multiVersionBuild?.base ?? '/v/',
};

// show help/usage if requested
if (help) {
  log(`
Usage: ${dim('[CI=1]')} ${bold(`${path.basename(process.argv[1])} <root>`)} ${dim('[--base <base>] [--build <alias>] [--match "<match>"] [--no-cache] [--out-dir <dir>] [--satisifes "<satisfies>"] [--version-base <dir>] [--debug] [--help]')}

${green('Options')}:
  --base             sets site base ${dim(`[default: ${defaults.base}`)}]
  --build            uses this version alias for main/root build ${dim(`[default: ${defaults.build}`)}]
  --match            filters versions from git tags ${dim(`[default: "${defaults.match}"`)}]
  --no-cache         builds all versions every build ${dim(`[default: "${!defaults.cache}"`)}]
  --out-dir          builds into this location ${dim(`[default: ${defaults.outDir}`)}]
  --satisfies        builds versioned docs in this semantic range ${dim(`[default: "${defaults.satisfies}"`)}]
  --version-base     builds versioned docs in this location ${dim(`[default: ${defaults.versionBase}`)}]
  --debug            shows debug messages
  -h, --help         displays this message

${green('Environment Variables')}:
  CI                 installs in CI mode (e.g. does not prompt for user input)

`);
  process.exit(0);
}

// intial feedback
debug('received argv %o', argv);
debug('default options %o', defaults);
log('found site %s at %s', magenta(site.title), magenta(osource));

// determine cachebase
const cacheBase = onNetlify ? '/opt/build/cache' : siteConfig.cacheDir;

// resolve options with argv input
const options = {
  ...defaults,
  ...argv,
  cacheDir: path.resolve(cacheBase, '@lando', 'mvb'),
  tmpDir: path.resolve(siteConfig.tempDir, nanoid()),
};
debug('multiversion build from %o using resolved build options: %O', srcDir, options);

// determine gitdir
// @TODO: throw error if no git dir?
const gitDir = traverseUp(['.git'], osource).find(dir => fs.existsSync(dir));
debug('determined git-dir: %o', gitDir);

// do the initial setup
fs.removeSync(options.tmpDir, {force: true, maxRetries: 10, recursive: true});
fs.mkdirSync(options.tmpDir, {recursive: true});

// create execers for source and tmp opts
const oexec = createExec({cwd: process.cwd(), debug});
const exec = createExec({cwd: options.tmpDir, debug});

// start it up
log('collecting version information from %s...', magenta(gitDir));

// lets make sure the source repo at least has all the tag information it needs
const updateArgs = ['fetch', 'origin', '--tags', '--no-filter'];
// determine whether we have a shallow clone eg as on GHA
const shallow = getStdOut('git rev-parse --is-shallow-repository', {trim: true}) === 'true';
// if shallow then add to update refs
if (shallow) updateArgs.push('--unshallow');
// update all refs
await oexec('git', updateArgs);

// build clone args
const cloneArgs = ['clone', '--mirror'];
// netlicf clone
if (onNetlify) cloneArgs.push('--depth', '2147483647', '--branch', getBranch(), getCloneUrl(), './');
// generic clone
else cloneArgs.push('--no-local', '--no-hardlinks', gitDir, './');
// do the vampire
await exec('git', cloneArgs);
await exec('ls', 'ls -lsa');
await exec('git', ['--no-pager', 'tag']);
await exec('git', ['--no-pager', 'branch', '--all']);
await exec('git', ['checkout', 'remotes/pull/51/merge']);

// get extended version information
const {extended} = await getTags(options.tmpDir, options);
debug('determined versions to build: %o', extended);

// if we cant find the base build then reset it to dev
if (extended.find(version => version.alias === options.build) === undefined) {
  debug('could not find a ref for %o, resetting to %o', options.build, 'dev');
  options.build = 'dev';
}

// set the base build
extended.unshift(extended.find(version => version.alias === options.build));
debug('determined main/root build is %o %o', options.build, extended[0]);

// now loop through extended and construct the build metadata
const builds = extended.map((version, index) => {
  if (index === 0) {
    version.base = options.base;
    version.outDir = options.outDir;
  } else {
    version.base = path.resolve(`/${options.base}/${options.versionBase}/${version.alias ?? version.version}`) + '/';
    version.outDir = path.join(options.outDir, options.versionBase, version.alias ?? version.version);
  }

  // if caching then also suggest a cache location
  if (options.cache) {
    version.cacheKey = path.join(options.base, options.versionBase, version.version, version.base);
    version.cachePath = path.join(options.cacheDir, crypto.createHash('sha256').update(version.cacheKey).digest('hex'));
  }

  // return
  return {...version, srcDir};
});

// report
log('normal build at %s using alias %s, ref %s', magenta(options.base), magenta(builds[0]?.alias), magenta(builds[0]?.ref));
log('and found %s other versions to build', magenta(builds.length - 1));
log('');

// and now build them all
for (const build of builds) {
  // separate out our stuff
  const {alias, cachePath, ref, semantic, srcDir, version, ...config} = build;

  // if we have cache then lets just copy it over
  if (cachePath && fs.existsSync(cachePath)) {
    log('restoring version %s from %s at %s...', magenta(alias ?? version), magenta('cache'), magenta(cachePath));
    fs.removeSync(path.resolve(config.outDir), {force: true, maxRetries: 10, recursive: true});
    fs.mkdirSync(config.outDir, {recursive: true});
    fs.copySync(cachePath, path.resolve(config.outDir));
    continue;
  }

  // if we get here we need to actually do a build
  debug('building %o version %o with config %o', srcDir, `${alias ?? version}@${ref}`, config);
  log('building version %s, ref %s, from %s to %s...', magenta(alias ?? version), magenta(ref), magenta(srcDir), magenta(config.outDir));

  // reset HEAD HARD
  await exec('git', ['reset', 'HEAD', '--hard']);
  // checkout new ref
  await exec('git', ['checkout', ref]);
  // reinstall
  await exec('npm', ['clean-install']);

  // update package.json if needed
  const pjsonPath = path.join(options.tmpDir, 'package.json');
  const pjson = JSON.parse(fs.readFileSync(pjsonPath, {encoding: 'utf8'}));
  if (pjson.version !== semantic) {
    // update version
    pjson.version = semantic;
    // rewrite
    fs.writeFileSync(pjsonPath, JSON.stringify(pjson, null, 2));
    // log
    debug('updated %o version to %o', pjsonPath, semantic);
  }

  // build the version
  try {
    await exec(
      'npx',
      ['vitepress', 'build', srcDir, '--outDir', config.outDir, '--base', config.base],
      {env: {LANDO_MVB_BUILD: 1, LANDO_MVB_BRANCH: getBranch(gitDir), LANDO_MVB_SOURCE: process.cwd()}},
    );
  } catch (error) {
    error.message = red(`Build failed for version ${version} with error: ${error.message}`);
    error.build = build;
    throw error;
  }

  // clean original
  fs.removeSync(path.resolve(config.outDir), {force: true, maxRetries: 10, recursive: true});
  // copy tmp to original
  fs.copySync(path.join(options.tmpDir, config.outDir), path.resolve(config.outDir));

  // save cache if its on
  if (options.cache) {
    debug('saving version %s to %s at %s...', version, 'cache', cachePath);
    fs.copySync(path.resolve(config.outDir), cachePath);
  }
}

// FIN
log('');
log('%s %s builds at %s!', green('completed'), magenta(builds.length), magenta(siteConfig.outDir));
