const {path} = require('@vuepress/utils');

module.exports = (options, app) => {
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
    name: '@lando/plugin-docsearch-plus',
    clientAppEnhanceFiles: path.resolve(__dirname, '../client/docsearch.js'),
    define: {
      __DOCSEARCH_OPTIONS__: options,
    },
  };
};
