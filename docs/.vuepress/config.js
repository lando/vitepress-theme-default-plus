const fs = require('fs');
const {path} = require('@vuepress/utils');
const yaml = require('js-yaml');

module.exports = {
  lang: 'en-US',
  title: 'VuePress 2 Default Theme +',
  description: 'The VuePress2 default Theme with some extra power!',
  head: [
    ['link', {rel: 'icon', href: '/images/favicon.png'}],
    ['link', {rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Poppins:700|Source+Sans+Pro&display=swap'}],
  ],
  theme: path.resolve(__dirname, '../..'),
  themeConfig: {
    // @vuepress/theme-default
    docsDir: 'docs',
    docsBranch: 'main',
    navbar: [
      {text: 'GitHub', link: 'https://github.com/lando/vuepress-theme-default-plus/'},
    ],
    repo: 'lando/vuepress-theme-default-plus',
    sidebar: [
      '/index.md',
      '/getting-started.md',
      '/config.md',
      '/components.md',
      {
        text: 'Guides',
        collapsible: true,
        children: [
          {
            text: 'Making a guide',
            link: '/making-a-guide.md',
          },
        ],
      },
      '/development.md',
      '/support.md',
      {text: 'Examples', link: 'https://github.com/lando/vuepress-theme-default-plus'},
      {text: 'Release Notes', link: 'https://github.com/lando/vuepress-theme-default-plus/releases'},
    ],

    // @lando/vuepress-theme-default-plus config
    sidebarHeader: {
      enabled: true,
      title: 'Current Version',
    },
    sponsors: {
      enabled: true,
      data: yaml.load(fs.readFileSync(path.resolve(__dirname, '..', '..', 'sponsors.yml'), 'utf8')),
    },
  },
};
