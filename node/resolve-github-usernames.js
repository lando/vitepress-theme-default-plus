import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname} from 'node:path';

import Debug from 'debug';

// GraphQL query that walks a repository's default-branch commit history
// returning the email + GitHub login for each commit's author. One request
// returns up to 100 commits, so for typical repos we resolve every email in
// 1-2 calls. This is much friendlier on rate limits than per-email lookups.
const GRAPHQL_QUERY = `
query($owner: String!, $name: String!, $cursor: String) {
  repository(owner: $owner, name: $name) {
    defaultBranchRef {
      target {
        ... on Commit {
          history(first: 100, after: $cursor) {
            pageInfo { hasNextPage endCursor }
            nodes {
              author {
                email
                user { login }
              }
            }
          }
        }
      }
    }
  }
}`;

const readCache = (cachePath, debug) => {
  if (!cachePath || !existsSync(cachePath)) return {};
  try {
    const data = JSON.parse(readFileSync(cachePath, 'utf8'));
    debug('loaded %o cached email->login mappings from %o', Object.keys(data).length, cachePath);
    return data;
  } catch (error) {
    debug('failed to read cache file %o: %o', cachePath, error.message);
    return {};
  }
};

const writeCache = (cachePath, data, debug) => {
  if (!cachePath) return;
  try {
    mkdirSync(dirname(cachePath), {recursive: true});
    writeFileSync(cachePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
    debug('wrote %o email->login mappings to cache %o', Object.keys(data).length, cachePath);
  } catch (error) {
    debug('failed to write cache file %o: %o', cachePath, error.message);
  }
};

// Fetch a page of commit history via the GitHub GraphQL API.
const fetchPage = async ({owner, name, cursor, token, debug}) => {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': '@lando/vitepress-theme-default-plus',
    },
    body: JSON.stringify({
      query: GRAPHQL_QUERY,
      variables: {owner, name, cursor},
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    debug('GitHub API returned %o: %o', response.status, text.slice(0, 200));
    throw new Error(`GitHub API ${response.status}: ${response.statusText}`);
  }

  const json = await response.json();
  if (json.errors) {
    debug('GraphQL errors: %o', json.errors);
    throw new Error(`GraphQL: ${json.errors.map(e => e.message).join(', ')}`);
  }

  const history = json?.data?.repository?.defaultBranchRef?.target?.history;
  if (!history) {
    debug('no commit history returned from GraphQL response: %o', json);
    return {nodes: [], pageInfo: {hasNextPage: false}};
  }
  return history;
};

export default async function resolveGitHubUsernames(emails, {
  repo,
  token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN,
  cachePath,
  // hard ceiling on commit-history pages we'll fetch in a single run.
  // 100 pages = 10000 commits, which covers all but the largest repos.
  // bumping this is cheap rate-limit wise (1 graphql point per page) but
  // costs build time on first run.
  maxPages = 100,
  // bail after this many consecutive pages with no progress on the
  // unresolved set — handles the long tail of "this email just doesn't
  // map to a github user" without wasting calls walking deep history.
  // 10 is forgiving enough that a contributor whose only commits are
  // buried a few pages deep (e.g. they switched emails) still gets
  // resolved on a deep walk.
  maxStalePages = 10,
  debug = Debug('@lando/resolve-github-usernames'), // eslint-disable-line
} = {}) {
  // start with whatever's in the cache (a prior run's results). cache values
  // can be a string (resolved login) or null (we tried and couldn't resolve;
  // skip on subsequent runs to avoid burning api calls every build)
  const cache = readCache(cachePath, debug);
  const result = new Map(Object.entries(cache));

  // figure out which emails still need resolving — anything not in the
  // cache at all. previously-failed lookups (null) stay null and are not
  // retried; users can delete the cache file to force a re-resolve.
  const unresolved = new Set(emails.filter(email => email && !result.has(email)));

  // nothing to do? bail without touching the network
  if (unresolved.size === 0) {
    debug('all %o emails already resolved from cache', emails.length);
    return result;
  }

  // need a token to talk to the API; warn and bail if missing
  if (!token) {
    debug('no GITHUB_TOKEN/GH_TOKEN env var set; skipping API resolution for %o emails', unresolved.size);
    return result;
  }

  // need a repo coordinate to know which history to walk
  if (!repo || !repo.owner || !repo.name) {
    debug('no repo coordinate provided; skipping API resolution for %o emails', unresolved.size);
    return result;
  }

  debug('resolving %o emails via GitHub GraphQL for %o/%o', unresolved.size, repo.owner, repo.name);

  // walk pages of commit history until we've resolved everyone, hit maxPages,
  // or hit maxStalePages with no new progress on the unresolved set
  let cursor = null;
  let pages = 0;
  let stalePages = 0;
  let dirty = false;
  // we only persist negative-cache entries (null) when we've confidently
  // exhausted the search — i.e. either ran off the end of history or hit
  // maxStalePages. when we cut off early at maxPages, the search was
  // incomplete and the unresolved emails should be retried on the next
  // build (where deeper history may have been merged in, or the user may
  // have bumped maxPages).
  let exhaustedSearch = false;

  try {
    while (unresolved.size > 0 && pages < maxPages) {
      const {nodes, pageInfo} = await fetchPage({owner: repo.owner, name: repo.name, cursor, token, debug});
      pages++;

      let progress = false;
      for (const node of nodes) {
        const email = node?.author?.email;
        const login = node?.author?.user?.login;
        if (!email || !login) continue;
        // record any email->login pair we see, even ones we weren't asked
        // about, so the cache builds up over time and helps future builds
        if (!result.has(email)) {
          result.set(email, login);
          dirty = true;
        }
        if (unresolved.delete(email)) progress = true;
      }

      stalePages = progress ? 0 : stalePages + 1;
      if (stalePages >= maxStalePages) {
        debug('giving up after %o stale page(s); %o emails still unresolved', stalePages, unresolved.size);
        exhaustedSearch = true;
        break;
      }

      if (!pageInfo.hasNextPage) {
        exhaustedSearch = true;
        break;
      }
      cursor = pageInfo.endCursor;
    }

    debug('walked %o page(s); %o emails still unresolved (exhausted=%o)', pages, unresolved.size, exhaustedSearch);
  } catch (error) {
    // never fail the build — degrade gracefully and just return what we have
    debug('GitHub API resolution failed (%o); falling back to cache + mailto', error.message);
  }

  // only negative-cache emails when the search ran to completion. if we cut
  // off at maxPages we don't know if the email resolves or not, so leave it
  // out of the cache entirely so future builds can retry (potentially with
  // a higher maxPages or after additional commit history exists).
  if (exhaustedSearch) {
    for (const email of unresolved) {
      if (!result.has(email)) {
        result.set(email, null);
        dirty = true;
      }
    }
  }

  // persist cache
  if (dirty && cachePath) {
    writeCache(cachePath, Object.fromEntries(result), debug);
  }

  return result;
};
