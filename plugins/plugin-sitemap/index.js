const {path} = require('@vuepress/utils');
const {SitemapStream} = require('sitemap');
const {createWriteStream} = require('fs');
const debug = require('debug')('@lando/default-plus');

const name = '@lando/plugin-sitemap';

/**
 * @param {*} path
 * @param {*} localePathPrefixes
 * @return {*}
 */
function stripLocalePrefix(path, localePathPrefixes) {
  const matchingPrefix = localePathPrefixes.filter(prefix => path.startsWith(prefix)).shift();
  return {normalizedPath: path.replace(matchingPrefix, '/'), localePrefix: matchingPrefix};
}

module.exports = (options, app) => {
  const {
    hostUrl = '',
    outFile = 'sitemap.xml',
    changefreq = 'daily',
    priority = 0.5,
    urls = [],
    exclude = [],
  } = options;

  return {
    name,
    onGenerated: () => {
      const hostname = hostUrl === ''
        ? app.options.themeConfig.canonicalUrl || app.options.themeConfig.baseUrl
        : hostUrl;

      if (!hostname) {
        return debug('Not generating sitemap because there is no hostname / baseurl to use');
      }

      debug('Generating sitemap...');

      const base = app.siteData.base;
      const locales = app.siteData.locales;
      const pages = app.pages;

      const withBase = url => base.replace(/\/$/, '') + url;

      // Sort the locale keys in reverse order so that longer locales, such as '/en/', match before the default '/'
      const localeKeys = (locales && Object.keys(locales).sort().reverse()) || [];
      const localesByNormalizedPagePath = pages.reduce((map, page) => {
        const {normalizedPath, localePrefix} = stripLocalePrefix(page.path, localeKeys);
        const prefixesByPath = map.get(normalizedPath) || [];
        prefixesByPath.push(localePrefix);
        return map.set(normalizedPath, prefixesByPath);
      }, new Map());

      const pagesMap = new Map();

      pages.forEach(page => {
        const fmOpts = page.frontmatter.sitemap || {};
        const metaRobots = (page.frontmatter.meta || [])
          .find(meta => meta.name === 'robots');
        const excludePage = metaRobots
          ? (metaRobots.content || '').split(/,/).map(x => x.trim()).includes('noindex')
          : fmOpts.exclude === true;

        if (excludePage) {
          exclude.push(page.path);
        }

        const lastmodISO = page.data.git.updatedTime !== undefined
          ? new Date(page.data.git.updatedTime).toISOString()
          : new Date().toISOString();

        const {normalizedPath} = stripLocalePrefix(page.path, localeKeys);
        const relatedLocales = localesByNormalizedPagePath.get(normalizedPath);

        let links = [];
        if (relatedLocales.length > 1) {
          links = relatedLocales.map(localePrefix => {
            return {
              lang: locales[localePrefix].lang,
              url: withBase(normalizedPath.replace('/', localePrefix)),
            };
          });
        }

        pagesMap.set(
          page.path,
          {
            changefreq: fmOpts.changefreq || changefreq,
            priority: fmOpts.priority || priority,
            lastmodISO,
            links,
          },
        );
      });

      const sitemap = new SitemapStream({
        hostname,
      });

      const sitemapXML = path.resolve(app.options.dest || options.dest, outFile);
      const writeStream = createWriteStream(sitemapXML);
      sitemap.pipe(writeStream);

      // Add in all our page urls
      pagesMap.forEach((page, url) => {
        if (!exclude.includes(url)) {
          sitemap.write({
            url: withBase(url),
            changefreq: page.changefreq,
            priority: page.priority,
            lastmod: page.lastmodISO,
          });
        }
      });

      // Add in additional urls specified
      urls.forEach(url => {
        sitemap.write({
          url: withBase(url),
          changefreq: changefreq,
          priority: priority,
        });
      });

      sitemap.end();

      debug(`Sitemap has been written.`);
    },
  };
};
