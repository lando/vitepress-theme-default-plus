'use strict';

// Plugins
const {palettePlugin} = require('@vuepress/plugin-palette');
const {containerPlugin} = require('@vuepress/plugin-container');
const {registerComponentsPlugin} = require('@vuepress/plugin-register-components');
const {themeDataPlugin} = require('@vuepress/plugin-theme-data');

const {path} = require('@vuepress/utils');

exports.getPlugins = (options = {}) => ([
  // Use sass palette stuff
  palettePlugin({
    preset: 'sass',
    userPaletteFile: path.resolve(__dirname, '..', 'styles', 'palette.scss'),
    userStyleFile: path.resolve(__dirname, '..', 'styles', 'index.scss'),
  }),
  // Load in gloal components
  registerComponentsPlugin({
    componentsDir: path.resolve(__dirname, '..', 'global'),
    componentsPatterns: ['*.vue', '**/*.vue'],
  }),
  // Just pass in ALL THE THEME DATA for now
  themeDataPlugin({
    themeData: options,
  }),
  // Add some containers
  containerPlugin({
    type: 'half',
    defaultTitle: '',
  }),
  containerPlugin({
    type: 'third',
    defaultTitle: '',
  }),
  containerPlugin({
    type: 'center',
    defaultTitle: '',
  }),
  containerPlugin({
    type: 'left',
    defaultTitle: '',
  }),
  containerPlugin({
    type: 'right',
    defaultTitle: '',
  }),
  containerPlugin({
    type: 'card',
    defaultTitle: '',
  }),
  containerPlugin({
    type: 'highlight',
    defaultTitle: '',
  }),
  containerPlugin({
    type: 'caption',
    defaultTitle: '',
  }),
  containerPlugin({
    type: 'thumbnail',
    defaultTitle: '',
  }),
]);
