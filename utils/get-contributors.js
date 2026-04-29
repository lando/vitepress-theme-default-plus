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

// Heuristic: detect contributor records whose avatar came from gravatar (the
// default we set when parsing git shortlog) so we know it's safe to replace
// with a GitHub avatar when we resolve their username. Matches both the
// www. and bare-domain variants gravatar-url has used over time.
const isGravatarAvatar = url => typeof url === 'string' && /^https?:\/\/(www\.)?gravatar\.com\//.test(url);

// Try to extract a GitHub username from an existing github link in the
// contributor's social-links array. This lets configured maintainers benefit
// from avatar/tooltip improvements without needing to hit the API.
const githubLoginFromLinks = links => {
  if (!Array.isArray(links)) return null;
  const githubLink = links.find(link => link?.icon === 'github')?.link;
  if (!githubLink) return null;
  const match = githubLink.match(/github\.com\/([^/?#]+)/);
  return match ? match[1] : null;
};

// Apply resolved email->login mappings to the contributor list. Sets a
// `github` field, swaps gravatar avatars for GitHub avatars, and seeds the
// `links` array with a GitHub link if one isn't already present.
const applyGitHubLogins = (contributors, mappings) => {
  for (const contributor of contributors) {
    // prefer an api-resolved login, fall back to scraping an existing
    // github link configured by hand on a maintainer entry
    const login = mappings?.get(contributor.email) ?? githubLoginFromLinks(contributor.links);
    if (!login) continue;
    contributor.github = login;
    // upgrade gravatar -> github avatar (better-quality, no email-hash leak)
    if (isGravatarAvatar(contributor.avatar)) {
      contributor.avatar = `https://avatars.githubusercontent.com/${login}`;
    }
    // seed a github social link if the contributor doesn't already have one
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

  // resolve GitHub usernames via the GraphQL API (cached, with graceful
  // fallback). this swaps gravatar avatars for GitHub avatars, populates
  // a `github` field for tooltips, and seeds a GitHub link in the
  // contributor's social-links array when none is configured.
  if (resolveGitHub !== false && data.length > 0) {
    let mappings = null;
    const repoCoord = repo && typeof repo === 'object' && repo.owner ? repo : getRepoCoordinate(cwd, {
      override: typeof repo === 'string' ? repo : undefined,
      packageJson,
      debug: debug.extend('repo-coord'),
    });

    if (repoCoord) {
      // only ask the api for emails we don't already have a github link for
      // (configured maintainers contribute their username via the link)
      const emailsToResolve = data
        .filter(c => !c.links?.some(link => link?.icon === 'github'))
        .map(c => c.email)
        .filter(Boolean);

      if (emailsToResolve.length > 0) {
        // resolve relative cache paths against the git root so users can
        // configure something convenient like 'docs/.vitepress/cache/...'
        const resolvedCachePath = cachePath
          ? (isAbsolute(cachePath) ? cachePath : resolve(cwd, cachePath))
          : undefined;
        mappings = await resolveGitHubUsernames(emailsToResolve, {
          repo: repoCoord,
          token,
          cachePath: resolvedCachePath,
          maxPages,
          maxStalePages,
          debug: debug.extend('resolve-github'),
        });
      } else {
        debug('all contributors already have github links configured; skipping API resolution');
      }
    }

    // always apply — even with no api mappings, this scrapes existing
    // github links on maintainer entries and uses them to swap avatars
    // and populate the `github` field
    applyGitHubLogins(data, mappings);
  }

  // separate maintainers from contribs
  const maintainers = data.filter(contrib => contrib.maintainer);
  const contributors = data.filter(contrib => !contrib.maintainer);

  // return contribs with maintainers in the front
  return maintainers.concat(contributors);
}
