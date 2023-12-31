import _ from 'lodash';
import Debug from 'debug';
import satisfies from 'semver/functions/satisfies.js';

import {chalk, fs, getDirname, path, warn} from '@vuepress/utils';
import {createPage} from '@vuepress/core';
import {getTopLevelPages} from './utils.js';
import {isLinkHttp} from '@vuepress/shared';
import {Octokit} from '@octokit/core';
import {paginateRest} from '@octokit/plugin-paginate-rest';
import url from 'url';

const __dirname = getDirname(import.meta.url);

export const versionsPagePlugin = (options = {}, sidebar = []) => {
  const name = '@lando/plugin-versions-page';
  const MyOctokit = Octokit.plugin(paginateRest);
  const octokit = new MyOctokit({auth: process.env.GITHUB_TOKEN});
  const debug = Debug(name); // eslint-disable-line

   const defaults = {
     content: fs.readFileSync(path.resolve(__dirname, 'versions.md')),
     data: [],
     docsBranch: 'main',
     docsDir: '',
     link: '/versions.html',
     showEdge: false,
     title: 'Previous Versions',
     trimLatest: true,
   };

  // Reset on defaults
  options = _.merge(defaults, options);

  // If auto mode is on and repo is set
  if (options.auto && !options.repo) {
    warn(`plugin ${chalk.magenta(name)} repo must be set to use auto mode`);
  }
  if (options.auto && options.repo ) {
    if (!isLinkHttp(options.repo) || /github\.com/.test(options.sourceRep)) {
      options.isGitHub = true;
      options.owner = url.parse(options.repo).pathname.split('/')[0];
      options.project = url.parse(options.repo).pathname.split('/')[1];
    } else {
      warn(`plugin ${chalk.magenta(name)} repo must be a GitHub repo to use auto mode`);
    }
  }

  // Get top level pages and warn if we alreayd have a page tehre
  return app => {
    const topLevelPages = getTopLevelPages(sidebar);
    debug('found normalized top level pages %o', topLevelPages);
    if (_.includes(topLevelPages, path.basename(options.link, path.extname(options.link)))) {
      warn(`plugin ${chalk.magenta(name)} detected a page already exists at ${options.link}, not generating!`);
      return {};
    }

    return {
      name,
      alias: {
        '@theme/VersionList.vue': path.resolve(__dirname, 'VersionList.vue'),
      },
      async onInitialized(app) {
        // Try to autopopulate versions data if we can and its not set
        // Note that user entered data takes priority
        if (options.auto && options.isGitHub && _.isEmpty(options.data)) {
          debug('trying to grab versions data from %o', options.repo);
          try {
            // Try to get versions
            const opts = {owner: options.owner, repo: options.project, per_page: 100};
            const response = await octokit.paginate('GET /repos/{owner}/{repo}/tags', opts);

            // Parse and format the response
            options.data = _(response)
              .map(version => ({
                name: version.name,
                href: `https://github.com/${options.owner}/${options.project}/tree/${version.name}/${options.docsDir}`,
                // @TODO: Make below two configurable?
                target: '_blank',
                rel: 'noopener noreferrer',
              }))
              .value();
            debug('grabbed and parsed versions are %O', options.data);
          } catch (error) {
            warn('could not automatically grab latest version with error', error);
          };
        }

        // filter versions by satisifies if its set
        if (options.satisfies) {
          options.data = options.data.filter(datum => {
            return satisfies(datum.name, options.satisfies, {includePrerelease: true, loose: true});
          });
          debug('filtered versions based on %o are %O', options.satisfies, options.data);
        }

        // Trim latests version if applicable
        if (options.trimLatest) {
          const latest = options.data.shift();
          debug('trimmed latest version (%o) from list', latest.name);
        }

        // Add if we dont already have a versions page and sidebar is on
        if (sidebar !== false && _.isArray(sidebar)) {
          sidebar.push({text: options.title, link: options.link});
          debug('programatically added %o to sidebar linking to %o', options.title, options.link);
        }

        // Add information about the "edge" release if we can
        if (isLinkHttp(options.showEdge)) {
          options.edgeVersion = {
            href: options.showEdge,
            name: 'edge',
            target: '_blank',
            rel: 'noopener noreferrer',
          };
        } else if (options.showEdge && options.isGitHub) {
          const {owner, project, docsBranch, docsDir} = options;
          options.edgeVersion = {
            href: `https://github.com/${owner}/${project}/tree/${docsBranch}/${docsDir}`,
            name: docsBranch,
            target: '_blank',
            rel: 'noopener noreferrer',
          };
        };

        // Also add the page if its an internal link and we dont have a page already
        if (!isLinkHttp(options.link) && app.pages.every(page => page.path !== options.link)) {
          const versionsPage = await createPage(app, {
            path: options.link,
            content: options.content,
            frontmatter: {
              contributors: false,
              description: 'Check out previous versions of this documentation.',
              editLink: false,
              edgeVersion: options.edgeVersion,
              lastUpdated: false,
              title: options.title,
              toc: false,
              versionsData: options.data,
            },
          });
          app.pages.push(versionsPage);
          debug('programatically added versions page to %o', options.link);
        }
      },
    };
  };
};
