import {chalk, path, warn} from '@vuepress/utils';

export const docSearchPlusPlugin = options => {
  const name = '@lando/plugin-docsearch-plus';
  if (!options.apiKey) {
    warn(`plugin ${chalk.magenta(name)} has no apiKey set, falling back to default search`);
  }
  if (!options.indexName) {
    warn(`plugin ${chalk.magenta(name)} has no indexName set, falling back to default search`);
  }

  return app => {
    return {
      name,
      clientConfigFile: path.resolve(__dirname, 'docsearch-plus.js'),
      define: {
        __DOCSEARCH_OPTIONS__: options,
      },
    };
  };
};
