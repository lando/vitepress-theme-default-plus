'use strict';
const {path} = require('@vuepress/utils');

const name = '@lando/plugin-read-mode';

module.exports = (options = {}, app) => {
  return {
    name,
    clientAppSetupFiles: path.resolve(__dirname, 'read-mode.js'),
    alias: {
      '@theme/ReadMode.vue': path.resolve(__dirname, 'ReadMode.vue'),
    },
  };
};
