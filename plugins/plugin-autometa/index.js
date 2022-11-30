import _ from 'lodash';
import {chalk, warn} from '@vuepress/utils';

export const autometaPlugin = ({twitter, canonicalUrl}) => {
  const name = '@lando/plugin-autometa';
  if (!twitter) {
    warn(`plugin ${chalk.magenta(name)} has no twitter set, this means twitter:site will not bet set`);
  }
  if (!canonicalUrl) {
    warn(`plugin ${chalk.magenta(name)} has no canonicalUrl set, this means no URL based tags will be set`);
  }

  return app => {
    return {
      name,
      extendsPage: page => {
        // if head is not an array then lets make it into an empty array
        if (!_.isArray(page.data.frontmatter.head)) page.data.frontmatter.head = [];

        // construct twitter metadata push unshift into frontmatter
        // Vuepress2 seems to prioritize the earliest same named content so we need to push
        // instead of unshift
        const title = page.frontmatter.title || page.data.title || app.options.title || app.siteData.title;
        const description = page.frontmatter.description
          || page.data.frontmatter.description
          || page.frontmatter.byline
          || page.data.frontmatter.byline
          || page.frontmatter.summary
          || page.data.frontmatter.summary
          || app.options.title;
        const timestamp = _.get(page, 'data.git.updatedTime', new Date().getTime());
        page.data.frontmatter.head.push(
          ['meta', {name: 'twitter:card', content: 'summary'}],
          ['meta', {name: 'twitter:title', content: title}],
          ['meta', {name: 'twitter:description', content: description}],
          ['meta', {property: 'og:type', content: 'article'}],
          ['meta', {property: 'og:title', content: title}],
          ['meta', {property: 'og:description', content: description}],
          ['meta', {property: 'og:site_name', content: app.siteData.title}],
          ['meta', {property: 'article:published_time', content: new Date(timestamp)}],
          ['meta', {itemprop: 'name', content: title}],
          ['meta', {itemprop: 'description', content: description}],
        );

        // add twitter site if we can
        if (twitter) {
          page.data.frontmatter.head.push(
            ['meta', {name: 'twitter:site', content: twitter}],
          );
        }

        // add urls if we can
        if (canonicalUrl) {
          const origin = new URL(canonicalUrl).origin;
          const url = `${origin}${app.options.base}${_.trim(page.data.path, '/')}`;
          page.data.frontmatter.head.push(
            ['meta', {name: 'twitter:url', content: url}],
            ['meta', {property: 'og:url', content: url}],
            ['link', {rel: 'canonical', href: url}],
          );
        }

        // add image if we can
        if (_.has(page, 'frontmatter.image')) {
          const image = page.frontmatter.image;
          page.data.frontmatter.head.push(
            ['meta', {name: 'og:image', content: image}],
            ['meta', {name: 'og:image:alt', content: title}],
            ['meta', {name: 'twitter:image', content: image}],
            ['meta', {name: 'twitter:image:alt', content: title}],
          );
        }
      },
    };
  };
};
