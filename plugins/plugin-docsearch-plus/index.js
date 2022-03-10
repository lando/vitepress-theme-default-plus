const {chalk, path, warn} = require('@vuepress/utils');

const name = '@lando/plugin-docsearch-plus';

module.exports = (options, app) => {
  if (!options.apiKey) {
    warn(`plugin ${chalk.magenta(name)} has no apiKey set, falling back to default search`);
  }
  if (!options.indexName) {
    warn(`plugin ${chalk.magenta(name)} has no indexName set, falling back to default search`);
  }

  if (app.env.isDev && app.options.bundler.endsWith('vite')) {
    app.options.bundlerConfig.viteOptions = require('vite').mergeConfig(
      app.options.bundlerConfig.viteOptions,
      {
        optimizeDeps: {
          exclude: ['@docsearch/js', 'preact'],
        },
      },
    );
  }

  return {
    name,
    clientAppEnhanceFiles: path.resolve(__dirname, 'docsearch-plus.js'),
    define: {
      __DOCSEARCH_OPTIONS__: options,
    },
  };
};
