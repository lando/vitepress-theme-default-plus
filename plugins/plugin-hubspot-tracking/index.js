'use strict';

const {chalk, path, warn} = require('@vuepress/utils');

const name = '@lando/plugin-hubspot-tracking';

const hubspotPlugin = ({id}) => {
  return () => {
    if (!id) {
      warn(`plugin ${chalk.magenta(name)} has no id set, plugin not loaded!`);
      return {};
    }

    return {
      name,
      clientAppEnhanceFiles: path.resolve(__dirname, 'hubspot.js'),
      define: {
        __HUBSPOT_OPTIONS__: {id},
      },
    };
  };
};

module.exports = {hubspotPlugin};
