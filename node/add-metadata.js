import {resolve} from 'node:path';

import Debug from 'debug';

export default async function(pageData, {
  debug = Debug('@lando/add-metadata'),  // eslint-disable-line
  siteConfig,
} = {}) {
  debug = debug.extend(`${pageData.relativePath}`);
  // get stuff
  const {frontmatter, lastUpdated, relativePath} = pageData;
  const {site} = siteConfig;

  // make sure header info is at least an empty array
  if (!Array.isArray(frontmatter.head)) frontmatter.head = [];
  // retrieve metadata
  const autometa = siteConfig?.site?.themeConfig?.autometa ?? false;

  if (autometa !== false) {
    const {canonicalUrl, image, twitter, x} = autometa;
    const title = frontmatter.title ?? pageData.title ?? site.title;
    const description = frontmatter.description ?? frontmatter.summary ?? site.description;
    const i = frontmatter.image ?? image ?? site?.logo?.src;
    const xandle = x ?? twitter;
    const published = new Date(lastUpdated);

    // generics
    frontmatter.head.push(
      ['meta', {name: 'twitter:card', content: 'summary'}],
      ['meta', {name: 'twitter:title', content: title}],
      ['meta', {name: 'twitter:description', content: description}],
      ['meta', {name: 'twitter:image', content: i}],
      ['meta', {name: 'twitter:image:alt', content: title}],
      ['meta', {property: 'og:type', content: 'article'}],
      ['meta', {property: 'og:title', content: title}],
      ['meta', {property: 'og:description', content: description}],
      ['meta', {property: 'og:site_name', content: site.title}],
      ['meta', {name: 'og:image', content: i}],
      ['meta', {name: 'og:image:alt', content: title}],
      ['meta', {property: 'article:published_time', content: published}],
      ['meta', {itemprop: 'name', content: title}],
      ['meta', {itemprop: 'description', content: description}],
    );
    debug('set metadata %o', {title, description, i, published});

    // twitter/x
    if (xandle) {
      frontmatter.head.push(['meta', {name: 'twitter:site', content: xandle}]);
      debug('set xandle to %o', xandle);
    }

    // canonical stuff
    if (canonicalUrl) {
      const pathname = relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, site.cleanUrls ? '' : '.html');
      const url = new URL(resolve(site.base, pathname), canonicalUrl);
      const {href} = url;
      frontmatter.head.unshift(
        ['meta', {name: 'twitter:url', content: href}],
        ['meta', {property: 'og:url', content: href}],
        ['link', {rel: 'canonical', href: href}],
      );
      debug('set canonical url to %o', href);
    }
  }
};
