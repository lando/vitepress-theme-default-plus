import _ from 'lodash';
import Debug from 'debug';
import {chalk, fs, path, warn} from '@vuepress/utils';

import {createPage} from '@vuepress/core';
import {getTopLevelPages} from './utils';
import {isLinkHttp} from '@vuepress/shared';
import {Octokit} from '@octokit/core';
import {paginateRest} from '@octokit/plugin-paginate-rest';
import url from 'url';

export const contributorsPagePlugin = (options = {}, sidebar = []) => {
  const name = '@lando/plugin-contributors-page';
  const MyOctokit = Octokit.plugin(paginateRest);
  const octokit = new MyOctokit({auth: process.env.GITHUB_TOKEN});
  const debug = Debug(name); // eslint-disable-line

   const defaults = {
     content: fs.readFileSync(path.resolve(__dirname, 'contributors.md')),
     data: [],
     docsBranch: 'main',
     docsDir: '',
     excludes: [],
     link: '/contributors.html',
     title: 'Contributorz',
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
        '@theme/ContributorList.vue': path.resolve(__dirname, 'ContributorList.vue'),
        '@theme/Contributor.vue': path.resolve(__dirname, 'Contributor.vue'),
      },
      async onInitialized(app) {
        // Try to autopopulate contributors data if we can and its not set
        // Note that user entered data takes priority
        if (options.auto && options.isGitHub && _.isEmpty(options.data)) {
          debug('trying to grab contributors data from %o', options.repo);
          try {
            // Try to get contributors
            const opts = {owner: options.owner, repo: options.project, per_page: 100};
            const response = await octokit.paginate('GET /repos/{owner}/{repo}/contributors', opts);

            // Parse and format the response
            options.data = _(response)
              .map(contributor => ({
                name: contributor.login,
                img: contributor.avatar_url,
                link: contributor.html_url,
                score: contributor.contributions,
              }))
              .value();
            debug('grabbed and parsed contributors are %O', options.data);
            debug('excluded the following contributors %o', options.exclude);
          } catch (error) {
            warn('could not automatically grab contributors with error', error);
          };
        }

        if (sidebar !== false && _.isArray(sidebar)) {
          sidebar.push({text: options.title, link: options.link});
          debug('programatically added %o to sidebar linking to %o', options.title, options.link);
        }

        // Also add the page if its an internal link and we dont have a page already
        if (!isLinkHttp(options.link) && app.pages.every(page => page.path !== options.link)) {
          const contributorsPage = await createPage(app, {
            path: options.link,
            content: options.content,
            frontmatter: {
              contributors: false,
              contributorsData: _(options.data)
              .filter(contributor => !options.exclude.includes(contributor.name))
              .value(),
              description: 'Check out all the awesome people who contributed to this project!',
              editLink: false,
              lastUpdated: false,
              title: options.title,
              toc: false,
            },
          });
          app.pages.push(contributorsPage);
          debug('programatically added contributors page to %o', options.link);
        }
      },
    };
  };
};
