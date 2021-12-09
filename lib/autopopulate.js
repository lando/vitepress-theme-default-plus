// Mods
const _ = require('lodash');
const debug = require('debug')('@lando/default-plus');
const {paginateRest} = require('@octokit/plugin-paginate-rest');

const {Octokit} = require('@octokit/core');
const MyOctokit = Octokit.plugin(paginateRest);
const octokit = new MyOctokit({auth: process.env.GITHUB_TOKEN});

exports.contributors = async ({githubOwner, githubRepo}) => {
  // Try to get contributors
  const opts = {owner: githubOwner, repo: githubRepo, per_page: 100};
  const response = await octokit.paginate('GET /repos/{owner}/{repo}/contributors', opts);

  // Map to what we need and return
  return _(response)
    .map(contributor => ({
      name: contributor.login,
      img: contributor.avatar_url,
      link: contributor.html_url,
      score: contributor.contributions,
    }))
    .value();
};

exports.latestVersion = async ({githubOwner, githubRepo}, {docsDir = ''}) => {
  const versions = await exports.versions({githubOwner, githubRepo}, {docsDir, trimLatest: false});

  // Trim earliest version if applicable
  const latestVersion =_.first(versions);
  debug('grabbed latest version (%s) from list', latestVersion.name);

  return {
    name: latestVersion.name,
    url: `https://github.com/${githubOwner}/${githubRepo}/tree/${latestVersion.name}/${docsDir}`,
  };
};

exports.versions = async ({githubOwner, githubRepo}, {trimLatest = true, docsDir = ''}) => {
  // Try to get contributors
  const opts = {owner: githubOwner, repo: githubRepo, per_page: 100};
  const response = await octokit.paginate('GET /repos/{owner}/{repo}/tags', opts);

  // Trim earliest version if applicable
  if (trimLatest) {
    const latest = response.shift();
    debug('trimmed latest version (%s) from list', latest.name);
  }

  // Parse response into smallest thing we need and return
  return _(response)
    .map(version => ({
      name: version.name,
      href: `https://github.com/${githubOwner}/${githubRepo}/tree/${version.name}/${docsDir}`,
      // @TODO: Make below two configurable?
      target: '_blank',
      rel: 'noopener noreferrer',
    }))
    .value();
};
