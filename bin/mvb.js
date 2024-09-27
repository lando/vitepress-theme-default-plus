#!/usr/bin/env node
import path from 'node:path';
import {tmpdir} from 'node:os';

import fs from 'fs-extra';
import parser from 'yargs-parser';
import {bold, dim, green} from 'colorette';
import {nanoid} from 'nanoid';
import {resolveConfig} from 'vitepress';

import {default as createExec} from '../utils/create-exec.js';
import {default as getTags} from '../utils/get-tags.js';
import {default as traverseUp} from '../utils/traverse-up.js';

import Debug from 'debug';

// debugger
const debug = Debug('@lando/mvb');  // eslint-disable-line

// enable debug if applicable
if (process.argv.includes('--debug')) Debug.enable(process.env.DEBUG ?? '*');

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
  console.log(`
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
}

// resolve options with argv input
// @TODO: /tmp location option?
const options = {...defaults, ...argv, tmpDir: path.resolve(tmpdir(), nanoid())};
debug('multiversion build from %o using resolved build options: %O', srcDir, options);

// @TODO: clean versions in path? eg /v/1.0.0 instead of /v/v1.0.0/
// @TODO: wrap whole thing in try?
// @TODO: separate build exec func with try?
// @TODO: better cli message?

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
const oexec = createExec(process.cwd(), debug);
const exec = createExec(tmpDir, debug);

// update all osource
oexec('git fetch origin --tags');
// and clone from osource
exec(`git clone ${gitDir} ./`);

// get extended version information
const {extended} = await getTags(gitDir, options);
debug('determined versions to build: %o', extended);

// set up base build and unshift into extended
// @TODO: throw error if empty?
extended.unshift(extended.find(version => version.alias === options.build));
debug('determined main/root build is %o %o', options.build, extended[0]);

// now loop through extended and construct the build metadata
const builds = extended.map((version, index) => {
  // add base and outdir but remember index === 0 is special
  if (index === 0) {
    version.base = site.base;
    version.outDir = outDir;
  } else {
    version.base = path.resolve(`/${site.base}/${options.versionBase}/${version.alias ?? version.semantic}`) + '/';
    version.outDir = path.join(outDir, options.versionBase, version.alias ?? version.version);
  }

  return {...version, srcDir};
});

// and now build them all
for (const build of builds) {
  // separate out our stuff
  const {alias, ref, semantic, srcDir, version, ...config} = build;
  debug('building %o version %o from %o with config %o', srcDir, `${alias ?? version}@${ref}`, config);

  // reset HEAD HARD
  exec('git reset HEAD --hard');
  // checkout new ref
  exec(`git checkout ${ref}`);
  // reinstall
  exec('npm clean-install');

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
  exec(`npx vitepress build ${srcDir} --outDir ${config.outDir} --base ${config.base}`);
}

// clean original
fs.removeSync(siteConfig.outDir, {force: true, maxRetries: 10, recursive: true});
// move tmp to original
fs.moveSync(path.resolve(tmpDir, outDir), siteConfig.outDir);
