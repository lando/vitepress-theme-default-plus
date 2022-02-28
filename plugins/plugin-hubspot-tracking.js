const {path} = require('@vuepress/utils');

module.exports = (options = {}) => {
  return {
    name: '@lando/plugin-hubspot-tracking',
    clientAppEnhanceFiles: path.resolve(__dirname, '../client/hubspot.js'),
    define: {
      __HUBSPOT_OPTIONS__: options,
    },
  };
};
