const {chalk, fs, path, warn} = require('@vuepress/utils');
const {SitemapStream, streamToPromise} = require('sitemap');

const name = '@lando/plugin-sitemap';
const debug = require('debug')(name);

const stripLocalePrefix = (path, localePathPrefixes) => {
  const matchingPrefix = localePathPrefixes.filter(prefix => path.startsWith(prefix)).shift();
  return {normalizedPath: path.replace(matchingPrefix, '/'), localePrefix: matchingPrefix};
};

module.exports = (options, app) => {
  const {
    baseUrl = '',
    outFile = 'sitemap.xml',
    changefreq = 'daily',
    priority = 0.5,
    urls = [],
    exclude = [],
  } = options;

  return {
    name,
    onGenerated: () => {
      if (!baseUrl) {
        warn(`plugin ${chalk.magenta(name)} not generating sitemap because there is no baseurl to use`);
        return {};
      }

      debug('generating sitemap...');

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

        const lastmodISO = page.data.git !== undefined && page.data.git.updatedTime !== undefined
          ? new Date(page.data.git.updatedTime).toISOString()
          : new Date().toISOString();

        const {normalizedPath} = stripLocalePrefix(page.path, localeKeys);
        const relatedLocales = localesByNormalizedPagePath.get(normalizedPath);

        let links = [];
        if (locales.length > 0 && relatedLocales.length > 1) {
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

      const sitemap = new SitemapStream({hostname: baseUrl});
      const destFile = path.resolve(app.options.dest || options.dest, outFile);

      // Add in all our page urls
      pagesMap.forEach((page, url) => {
        if (!exclude.includes(url)) {
          const data = {
            url: withBase(url),
            changefreq: page.changefreq,
            priority: page.priority,
            lastmod: page.lastmodISO,
          };
          debug('added %s to sitemap with %o', data.url, data);
          sitemap.write(data);
        }
      });

      // Add in additional urls specified
      urls.forEach(url => {
        const data = {
          url: withBase(url),
          changefreq: changefreq,
          priority: priority,
        };
        debug('added additional page %s to sitemap with %o', data.url, data);
        sitemap.write(data);
      });

      sitemap.end();
      streamToPromise(sitemap).then(result => {
        fs.writeFileSync(destFile, result.toString());
        debug(`sitemap has been written to %s`, destFile);
      });
    },
  };
};
