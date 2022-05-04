'use strict';

const _ = require('lodash');
const {chalk, fs, path, warn} = require('@vuepress/utils');
const {createPage} = require('@vuepress/core');

const name = '@lando/plugin-simple-tags';
const debug = require('debug')(name);

const simpleTagsPlugin = (options = {}) => {
  return app => {
    return {
      name,
      alias: {
        '@theme/TagList.vue': path.resolve(__dirname, 'TagList.vue'),
        '@theme/TagPage.vue': path.resolve(__dirname, 'TagPage.vue'),
        '@theme/TagPageCard.vue': path.resolve(__dirname, 'TagPageCard.vue'),
      },
      // start by augmenting tag data here because it runs before onInitialized
      extendsPage: page => {
        if (_.has(page, 'frontmatter.tags')) {
          page.data.tags = _(page.frontmatter.tags)
            .map(tag => ({
              name: tag,
              tag,
              key: _.kebabCase(tag),
              title: _.upperCase(tag),
              path: `/tag/${_.kebabCase(tag)}.html`,
            }))
            .value();
          debug('added tag data %o to %o', _.map(page.data.tags, tag => _.pick(tag, ['tag', 'path'])), page.path);
        }
      },
      async onInitialized(app) {
        // Get all pages that are tagged
        const taggedPages = _(app.pages)
          .filter(page => _.has(page, 'data.tags'))
          .value();
        debug('found tagged pages: %o', _.map(taggedPages, page => page.path));

        // Get list of tags
        const tags = _(taggedPages)
          .map(page => page.data.tags)
          .flatten()
          .uniqBy('key')
          .value();
        debug('found tags: %o', tags);

        // Build metadata for tag pages
        const tagPages = _(tags)
          .map(tag => _.assign(tag, {
            pages: _(taggedPages)
              .filter(page => _.includes(page.frontmatter.tags, tag.tag))
              .map(page => _.pick(page, ['data', 'key', 'path', 'title', 'lang', 'frontmatter', 'slug']))
              .map(page => _.merge({}, page, {
                authors: page.frontmatter.author ? [page.frontmatter.author] : page.frontmatter.authors,
                contributors: _.get(page, 'data.git.contributors'),
                date: _.get(page.frontmatter, 'updated.timestamp'),
                image: page.frontmatter.image,
                summary: page.frontmatter.description || page.frontmatter.byline || page.frontmatter.summary,
                tags: page.frontmatter.tags,
                updated: _.get(page, 'data.git.updatedTime'),
              }))
              .value(),
          }))
          .value();

        // Create tag pages
        for await (const tagPage of tagPages) {
          if (app.pages.some(page => page.path === tagPage.path)) {
            warn(`plugin ${chalk.magenta(name)} could not create page ${tagPage.path} because it already exists!`);
          } else {
            app.pages.push(await createPage(app, {
              path: tagPage.path,
              content: fs.readFileSync(path.resolve(__dirname, 'tag-page.md')),
              frontmatter: {
                contributors: false,
                description: `Check out all the ${tagPage.tag} content.`,
                lastUpdated: false,
                pages: tagPage.pages,
                readMode: false,
                tags: false,
                title: tagPage.title,
                toc: false,
              },
            }));
            debug('programatically added tag page %o to %o', tagPage.title, tagPage.path);
          }
        };
      },
    };
  };
};

module.exports = {simpleTagsPlugin};
