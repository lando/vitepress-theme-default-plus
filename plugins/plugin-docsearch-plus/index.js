const {chalk, path, warn} = require('@vuepress/utils');

const name = '@lando/plugin-docsearch-plus';

const docSearchPlusPlugin = options => {
  if (!options.apiKey) {
    warn(`plugin ${chalk.magenta(name)} has no apiKey set, falling back to default search`);
  }
  if (!options.indexName) {
    warn(`plugin ${chalk.magenta(name)} has no indexName set, falling back to default search`);
  }

  return app => {
    return {
      name,
      clientAppEnhanceFiles: path.resolve(__dirname, 'docsearch-plus.js'),
      define: {
        __DOCSEARCH_OPTIONS__: options,
      },
    };
  };
};

module.exports = {docSearchPlusPlugin};
