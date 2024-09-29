#!/usr/bin/env node
import path from 'node:path';
import {format, inspect} from 'node:util';

import fs from 'fs-extra';
import parser from 'yargs-parser';
import {bold, dim, green, magenta, red} from 'colorette';
import {nanoid} from 'nanoid';
import {resolveConfig} from 'vitepress';

import {default as getStdOut} from '../utils/parse-layouts.js';
import {default as createExec} from '../utils/create-exec.js';
import {default as getTags} from '../utils/get-tags.js';
import {default as traverseUp} from '../utils/traverse-up.js';

import Debug from 'debug';

// debugger
const debug = Debug('@lando/mvb');  // eslint-disable-line

// enable debug if applicable
if (process.argv.includes('--debug')) Debug.enable(process.env.DEBUG ?? '*');

// kenny loggin utils
const log = (message = '', ...args) => {
  message = typeof message === 'string' ? message : inspect(message);
  if (debug.enabled) debug(message, ...args);
  else process.stdout.write(format(message, ...args) + '\n');
};

// lets start by getting argv
const argv = parser(process.argv.slice(2));
debug('received argv %o', argv);

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
log('found site %s at %s', magenta(site.title), magenta(osource));

// build default options
const defaults = {
  base: site?.base ?? '/',
  build: site?.themeConfig?.multiVersionBuild?.build ?? 'stable',
  match: site?.themeConfig?.multiVersionBuild?.match ?? 'v[0-9].*',
  outDir: path.relative(process.cwd(), siteConfig.outDir) ?? './.vitepress/dist',
  satisfies: site?.themeConfig?.multiVersionBuild?.satisfies ?? '*',
  versionBase: site?.themeConfig?.multiVersionBuild?.base ?? '/v/',
};
debug('default options %o', defaults);

// show help/usage if requested
if (help) {
  logToStderr(`
Usage: ${dim('[CI=1]')} ${bold(`${path.basename(process.argv[1])} <root>`)} ${dim('[--base <base>] [--build <alias>] [--match "<match>"] [--out-dir <dir>] [--satisifes "<satisfies>"] [--version-base <dir>] [--debug] [--help]')}

${green('Options')}:
  --base             sets site base ${dim(`[default: ${defaults.base}`)}]
  --build            uses this version alias for main/root build ${dim(`[default: ${defaults.build}`)}]
  --match            filters versions from git tags ${dim(`[default: "${defaults.match}"`)}]
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

// resolve options with argv input
// @TODO: /tmp location option?
const options = {...defaults, ...argv, tmpDir: path.resolve(siteConfig.tempDir, nanoid())};
debug('multiversion build from %o using resolved build options: %O', srcDir, options);

// determine gitdir
// @TODO: throw error if no git dir?
const gitDir = traverseUp(['.git'], osource).find(dir => fs.existsSync(dir));
debug('determined git-dir: %o', gitDir);

// destructure some helpful options
const {outDir, tmpDir} = options;

// do the initial setup
fs.removeSync(tmpDir, {force: true, maxRetries: 10, recursive: true});
fs.mkdirSync(tmpDir, {recursive: true});

// create execer for source and tmp ops
const oexec = createExec({cwd: process.cwd(), debug});
const exec = createExec({cwd: tmpDir, debug});

// start it up
log('collecting version information from %s...', magenta(gitDir));

// update args
const updateRefs = ['fetch', 'origin', '--tags', '--no-filter'];
// determine whether we have a shallow clone eg as on GHA
const shallow = getStdOut('git rev-parse --is-shallow-repository', {trim: true}) === 'true';
// if shallow then add to update refs
if (shallow) updateRefs.push('--unshallow');

// update all refs
await oexec('git', updateRefs);
// and clone from gitDir
await exec('git', ['clone', gitDir, './']);

// get extended version information
const {extended} = await getTags(gitDir, options);
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
    version.base = site.base;
    version.outDir = outDir;
  } else {
    version.base = path.resolve(`/${site.base}/${options.versionBase}/${version.alias ?? version.version}`) + '/';
    version.outDir = path.join(outDir, options.versionBase, version.alias ?? version.version);
  }

  return {...version, srcDir};
});

// report
log('found %s versions to build', magenta(builds.length - 1));
log('default/main/root build using alias %s, ref %s', magenta(builds[0]?.alias), magenta(builds[0]?.ref));
log('');

// and now build them all
for (const build of builds) {
  // @LOG: building?
  // separate out our stuff
  const {alias, ref, semantic, srcDir, version, ...config} = build;
  debug('building %o version %o with config %o', srcDir, `${alias ?? version}@${ref}`, config);
  log('building version %s, ref %s, from %s to %s...', magenta(alias ?? version), magenta(srcDir), magenta(ref), magenta(config.outDir));

  // reset HEAD HARD
  await exec('git', ['reset', 'HEAD', '--hard']);
  // checkout new ref
  await exec('git', ['checkout', ref]);
  await exec('cat', ['.git/config']);
  // await exec('git', ['rev-list', '--objects', '--all', '--missing=print']);
  // reset ref
  // await exec('git', ['reset', ref, '--hard']);
  // await exec('git', ['status']);
  // // attempt diagnosis
  // await exec('git', ['fsck', '--full']);
  // await exec('git', ['gc', '--prune', 'now']);
  // await exec('git', ['repack', '-a', '-d']);
  // await exec('git', ['status']);

  // wipe
  // await exec('rm', ['-rf', `${tmpDir}/node_modules`]);
  // reinstall
  await exec('npm', ['install']);

  // update package.json if needed
  const pjsonPath = path.join(tmpDir, 'package.json');
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
    await exec('npx', ['vitepress', 'build', srcDir, '--outDir', config.outDir, '--base', config.base]);
  } catch (error) {
    error.message = red(`Build failed for version ${version} with error: ${error.message}`);
    error.build = build;
    throw error;
  }
}

// clean original
fs.removeSync(siteConfig.outDir, {force: true, maxRetries: 10, recursive: true});
// move tmp to original
fs.moveSync(path.resolve(tmpDir, outDir), siteConfig.outDir);

// @LOG: finish info, where / and /v/ and how many versions built?
log('');
log('%s %s builds at %s!', green('completed'), magenta(builds.length), magenta(siteConfig.outDir));
