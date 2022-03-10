'use strict';

const {chalk, path, warn} = require('@vuepress/utils');

const name = '@lando/plugin-hubspot-tracking';

module.exports = (options = {}) => {
  if (!options.id) {
    warn(`plugin ${chalk.magenta(name)} has no id set, plugin not loaded!`);
    return {};
  }

  return {
    name,
    clientAppEnhanceFiles: path.resolve(__dirname, 'hubspot.js'),
    define: {
      __HUBSPOT_OPTIONS__: options,
    },
  };
};
