
import {writeFileSync} from 'node:fs';
import {resolve} from 'node:path';

import merge from 'lodash-es/merge.js';
import robotstxt from 'generate-robotstxt';

import Debug from 'debug';

const defaults = {
  allowAll: false,
  disallowAll: false,
  policy: [],
  file: 'robots.txt',
};

const disallowAllPolicy = {
  userAgent: '*',
  disallow: '/',
};

const allowAllPolicy = {
  userAgent: '*',
  disallow: '',
};

export default async function({userConfig, outDir}, {debug = Debug('@lando/generate-robots')} = {}) { // eslint-disable-line
  // get robots config or defaults
  const robots = merge({}, defaults, userConfig.robots || userConfig?.themeConfig?.robots);

  // munge policies together
  robots.policy = [...robots.policy, ...robots.policies].filter(policy => policy);

  // if no polices and disallowAll=false then assume allowAll
  if (Array.isArray(robots.policy) && robots.policy.length === 0 && !robots.disallowAll) robots.allowAll = true;

  // robot vibes
  const {allowAll, disallowAll, host, sitemap} = robots;

  // if disallow all then thats all we need really
  if (disallowAll) robots.policy = [disallowAllPolicy];
  // ditto for allow all
  else if (allowAll) robots.policy = [allowAllPolicy];

  // build generate options
  const options = {policy: robots.policy};
  // add host
  if (host) options.host = host;
  // add sitemap
  if (sitemap) options.sitemap = sitemap;
  debug('resolved robots.txt config from %o to %o', robots, options);

  // write file
  try {
    const dest = resolve(outDir, robots.file);
    const content = await robotstxt(options);
    writeFileSync(dest, content);
    debug('generated %o with content \n%O', dest, content);
  } catch (error) {
    throw error;
  }
};
