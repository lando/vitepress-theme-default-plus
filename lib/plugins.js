'use strict';
const {path} = require('@vuepress/utils');

exports.getPlugins = (options = {}) => ([
  // Use sass palette stuff
  ['@vuepress/plugin-palette',
    {
      preset: 'sass',
    },
  ],
  // Load in gloal components
  ['@vuepress/register-components',
    {
      componentsDir: path.resolve(__dirname, '..', 'global'),
      componentsPatterns: ['*.vue', '**/*.vue'],
    },
  ],
  // Just pass in ALL THE THEME DATA for now
  ['@vuepress/plugin-theme-data',
    {
      themeData: options,
    },
  ],
  // Add some containers
  ['@vuepress/container',
    {
      type: 'half',
      defaultTitle: '',
    },
  ],
  ['@vuepress/container',
    {
      type: 'third',
      defaultTitle: '',
    },
  ],
  ['@vuepress/container',
    {
      type: 'center',
      defaultTitle: '',
    },
  ],
  ['@vuepress/container',
    {
      type: 'left',
      defaultTitle: '',
    },
  ],
  ['@vuepress/container',
    {
      type: 'right',
      defaultTitle: '',
    },
  ],
  ['@vuepress/container',
    {
      type: 'card',
      defaultTitle: '',
    },
  ],
]);
