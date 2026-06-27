import {isAbsolute, resolve} from 'node:path';

import {default as execSync} from './parse-stdout.js';
import findIndex from 'lodash-es/findIndex.js';
import gravatarUrl from 'gravatar-url';
import groupBy from 'lodash-es/groupBy.js';

import Debug from 'debug';

import {default as getRepoCoordinate} from './get-repo-coordinate.js';
import {default as resolveGitHubUsernames} from '../node/resolve-github-usernames.js';

const parseStringInclude = data => {
  const parts = data.trim().split(' ');
  // add a single commit if we dont have any commits
  if (!Number.isInteger(parseInt(parts[0]))) parts[0] = 1;
  // mod part 0 so it is parsed correclty downstream
  parts[0] = parts[0] = `     ${parts[0]}\t`;

  return parts.join(' ');
};

const isGravatarAvatar = url => typeof url === 'string' && /^https?:\/\/(www\.)?gravatar\.com\//.test(url);

// extract github username from a configured github link (lets hand-configured
// maintainers benefit from avatar/tooltip upgrades without an API call)
const githubLoginFromLinks = links => {
  if (!Array.isArray(links)) return null;
  const githubLink = links.find(link => link?.icon === 'github')?.link;
  if (!githubLink) return null;
  const match = githubLink.match(/github\.com\/([^/?#]+)/);
  return match ? match[1] : null;
};

// set `github` field, swap gravatar->github avatars, seed github social link
const applyGitHubLogins = (contributors, mappings) => {
  for (const contributor of contributors) {
    const login = mappings?.get(contributor.email) ?? githubLoginFromLinks(contributor.links);
    if (!login) continue;
    contributor.github = login;
    if (isGravatarAvatar(contributor.avatar)) {
      contributor.avatar = `https://github.com/${login}.png`;
    }
    contributor.links = Array.isArray(contributor.links) ? contributor.links : [];
    if (!contributor.links.some(link => link?.icon === 'github')) {
      contributor.links.unshift({icon: 'github', link: `https://github.com/${login}`});
    }
  }
  return contributors;
};

export default async function(
  cwd,
  {
    merge = 'name',
    debotify = true,
    include = [],
    exclude = [],
    resolveGitHub = 'auto',
    cachePath,
    repo,
    token,
    maxPages,
    maxStalePages,
  } = {},
  {
    debug = Debug('@lando/get-contributors'), // eslint-disable-line
    paths = [],
    packageJson,
    // shared across calls so repo coord + GitHub mappings are resolved once per build
    ctx = {},
  } = {},
  ) {
  // start with a command that will get ALL THE AUTHORS
  const command = ['git', '--no-pager', 'shortlog', '-nes', 'HEAD'];
  const opts = {cwd, stdin: 'inherit'};

  // then scope to paths if appropriate
  if (paths.length > 0) command.push('--', ...paths);

  // run
  debug('running command %o with exec options %o', command, opts);
  const stdout = execSync(command.join(' '), opts);

  // parse git data into a string
  let data = stdout.split('\n');

  // separate out include strings and objects
  const includeStrings = include.filter(contributor => typeof contributor === 'string') ?? [];
  const includeObjects = include.filter(contributor => typeof contributor === 'object') ?? [];

  // add in any include strings
  if (includeStrings.length > 0) for (const contributor of includeStrings) data.push(parseStringInclude(contributor));

  // map strings to <VPTeamMembersItem.vue> compatible objects
  data = data.map(item => item.trim().match(/^(\d+)\t(.*) <(.*)>$/))
    .filter(item => item !== null)
    .map(([, commits, name, email]) => ({
      commits: Number.parseInt(commits, 10),
      email,
      name: name.trim(),
      avatar: gravatarUrl(email),
      title: undefined,
      org: undefined,
      maintainer: false,
      links: [],
    }));

  // add in any include objects
  if (includeObjects.length > 0) {
    for (const contributor of includeObjects) {
      // try to see if we already have this contrib
      const existing = data.find(member => member.email === contributor.email || member.email === contributor.mergeWith);
      // if we do then update it
      if (existing) Object.assign(existing, contributor);
      // otherwise treat it as a new contrib only merge only is true
      else if (!existing && contributor.mergeOnly !== true) data.push({name: '', email: '', ...contributor});
    }
  };

  // remove any bots
  if (debotify) {
    data = data
      .filter(contributor => !contributor.email.includes('[bot]') && !contributor.name.includes('[bot]'))
      .filter(contributor => contributor.email !== 'rtfm47@lando.dev');
  }

  // remove any excluded contributors
  if (exclude.length > 0) {
    for (let excluded of exclude) {
      // if excluded is a string then map into an object
      if (typeof excluded === 'string' && excluded.match(/^(.*) <(.*)>$/) !== null) {
        const parts = excluded.match(/^(.*) <(.*)>$/);
        excluded = {name: parts[1], email: parts[2]};
      }

      // attampte to exclude
      if (findIndex(data, excluded) > -1) data.splice(findIndex(data, excluded), 1);
    }
  }

  // attempt to merge same named entries together
  // this will prefer the member metadata eg email, avatar etc with the most commits
  // it will also add all the commits together
  if (merge !== false && ['email', 'name'].includes(merge)) {
    const grouped = groupBy(data, merge);

    // attempt merge strategy for any merge with more than one match
    for (const [id, matches] of Object.entries(grouped)) {
      if (matches.length > 1) {
        const best = matches[0];
        best.commits = matches.map(match => match.commits).reduce((sum, amount) => sum + amount, 0);

        // special handling for org/title
        for (const special of ['links', 'org', 'title']) {
          if (!best[special] || (Array.isArray(best[special]) && best[special].length === 0)) {
            best[special] = matches
              .map(match => match[special])
              .filter(data => data !== undefined && data !== null && data !== '' && data.length !== 0)[0];
          }
        }

        // reset matches
        grouped[id] = [best];
      }
    }

    // reset data with merged things
    data = Object.entries(grouped).map(([name, matches]) => matches[0]);
  }

  // sort by commits
  data = data.sort((a, b) => b.commits - a.commits);

  // resolve GitHub usernames (cached, build-global via ctx, graceful fallback)
  if (resolveGitHub !== false && data.length > 0) {
    if (ctx.mappings === undefined) {
      const apiToken = token ?? process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
      // warn (not debug) on explicit opt-in without a token — silent skip would mask misconfig
      if (resolveGitHub === true && !apiToken) {
        // eslint-disable-next-line no-console
        console.warn(
          '[@lando/vitepress-theme-default-plus] `themeConfig.contributors.resolveGitHub` is `true` '
          + 'but no `GITHUB_TOKEN` or `GH_TOKEN` environment variable is set; GitHub username resolution '
          + 'will fall back to cached results only',
        );
      }

      const repoCoord = repo && typeof repo === 'object' && repo.owner ? repo : getRepoCoordinate(cwd, {
        override: typeof repo === 'string' ? repo : undefined,
        packageJson,
        debug: debug.extend('repo-coord'),
      });
      ctx.repoCoord = repoCoord;

      if (repoCoord) {
        // skip emails that already have a configured github link
        const emailsToResolve = data
          .filter(c => !c.links?.some(link => link?.icon === 'github'))
          .map(c => c.email)
          .filter(Boolean);

        if (emailsToResolve.length > 0) {
          const resolvedCachePath = cachePath
            ? (isAbsolute(cachePath) ? cachePath : resolve(cwd, cachePath))
            : undefined;
          ctx.mappings = await resolveGitHubUsernames(emailsToResolve, {
            repo: repoCoord,
            token: apiToken,
            cachePath: resolvedCachePath,
            maxPages,
            maxStalePages,
            debug: debug.extend('resolve-github'),
          });
        } else {
          debug('all contributors already have github links configured; skipping API resolution');
          ctx.mappings = null;
        }
      } else {
        debug('no repo coordinate determined; skipping GitHub username resolution');
        ctx.mappings = null;
      }
    } else {
      debug('reusing pre-resolved GitHub mappings (%o entries)', ctx.mappings?.size ?? 0);
      // resolve any new emails not yet in mappings (e.g., from per-page includes)
      if (ctx.repoCoord && ctx.mappings !== null) {
        const newEmailsToResolve = data
          .filter(c => !c.links?.some(link => link?.icon === 'github'))
          .map(c => c.email)
          .filter(Boolean)
          .filter(email => !ctx.mappings.has(email));

        if (newEmailsToResolve.length > 0) {
          debug('found %o new emails to resolve', newEmailsToResolve.length);
          const apiToken = token ?? process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
          const resolvedCachePath = cachePath
            ? (isAbsolute(cachePath) ? cachePath : resolve(cwd, cachePath))
            : undefined;
          const newMappings = await resolveGitHubUsernames(newEmailsToResolve, {
            repo: ctx.repoCoord,
            token: apiToken,
            cachePath: resolvedCachePath,
            maxPages,
            maxStalePages,
            debug: debug.extend('resolve-github'),
          });
          if (newMappings) {
            for (const [email, login] of newMappings.entries()) {
              ctx.mappings.set(email, login);
            }
          }
        }
      }
    }

    // applies mappings AND scrapes hand-configured github links
    applyGitHubLogins(data, ctx.mappings);
  }

  // separate maintainers from contribs
  const maintainers = data.filter(contrib => contrib.maintainer);
  const contributors = data.filter(contrib => !contrib.maintainer);

  // return contribs with maintainers in the front
  return maintainers.concat(contributors);
}
