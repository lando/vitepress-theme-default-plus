import fg from 'fast-glob';
import Debug from 'debug';

export default async function(siteConfig, {debug = Debug('@lando/build-collections')} = {}) {  // eslint-disable-line
  // ensure siteConfig.collections is at least an empty object
  if (!siteConfig.collections || typeof siteConfig.collections !== 'object') siteConfig.collections = {};

  // before we start lets make sure we have a list of paths for each collection
  // we do it like this to minimize running fastglob a bunch of times
  for (const [collection, config] of Object.entries(siteConfig?.site?.themeConfig?.collections ?? {})) {
    if (!Array.isArray(siteConfig.collections[collection])) {
      siteConfig.collections[collection] = fg.globSync(config.patterns ?? [], {
        dot: true,
        cwd: siteConfig.srcDir,
        onlyFiles: true,
      });
      debug('built collection %o with page listing %o', collection, siteConfig.collections[collection]);
    }
  }
};
