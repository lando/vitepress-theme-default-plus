import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname} from 'node:path';

import Debug from 'debug';

// walks default-branch commit history; one page = up to 100 commits
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
    // bail on anything that isn't a plain object — a corrupted cache (array,
    // null, primitive) would otherwise silently produce a Map keyed by array
    // indices or characters, defeating the cache and re-hitting the api
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      debug('cache file %o is not a plain object; ignoring', cachePath);
      return {};
    }
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
  maxPages = 100,
  maxStalePages = 10,
  debug = Debug('@lando/resolve-github-usernames'), // eslint-disable-line
} = {}) {
  // cache values: string = resolved login, null = negative-cached miss
  const cache = readCache(cachePath, debug);
  const result = new Map(Object.entries(cache));
  const unresolved = new Set(emails.filter(email => email && !result.has(email)));

  if (unresolved.size === 0) {
    debug('all %o emails already resolved from cache', emails.length);
    return result;
  }
  if (!token) {
    debug('no GITHUB_TOKEN/GH_TOKEN env var set; skipping API resolution for %o emails', unresolved.size);
    return result;
  }
  if (!repo || !repo.owner || !repo.name) {
    debug('no repo coordinate provided; skipping API resolution for %o emails', unresolved.size);
    return result;
  }

  debug('resolving %o emails via GitHub GraphQL for %o/%o', unresolved.size, repo.owner, repo.name);

  let cursor = null;
  let pages = 0;
  let stalePages = 0;
  let dirty = false;
  // only negative-cache when the search exhausts (ran out of history or
  // hit maxStalePages); cutting off at maxPages leaves emails retryable
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
    // never fail the build
    debug('GitHub API resolution failed (%o); falling back to cache + mailto', error.message);
  }

  if (exhaustedSearch) {
    for (const email of unresolved) {
      if (!result.has(email)) {
        result.set(email, null);
        dirty = true;
      }
    }
  }

  if (dirty && cachePath) {
    writeCache(cachePath, Object.fromEntries(result), debug);
  }

  return result;
};
