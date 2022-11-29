'use strict';
const {path} = require('@vuepress/utils');

const name = '@lando/plugin-read-mode';

const readModePlugin = () => {
  return () => {
    return {
      name,
      clientConfigFile: path.resolve(__dirname, 'read-mode.js'),
      alias: {
        '@theme/ReadMode.vue': path.resolve(__dirname, 'ReadMode.vue'),
      },
    };
  };
};

module.exports = {readModePlugin};
