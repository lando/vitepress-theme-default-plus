const fs = require('fs');
const {path} = require('@vuepress/utils');
const yaml = require('js-yaml');

module.exports = {
  lang: 'en-US',
  title: 'Lando',
  description: 'A VuePress 2 Theme for Lando Doc Based Sites',
  head: [
    ['link', {rel: 'icon', href: '/favicon.ico'}],
    ['link', {rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Poppins:700|Source+Sans+Pro&display=swap'}],
  ],
  theme: path.resolve(__dirname, '../..'),
  themeConfig: {
    baseUrl: 'https://docs.lando.dev',
    docsDir: 'docs',
    docsBranch: 'main',
    navbar: [
      {text: 'Example External', link: 'https://docs.lando.dev/basics/'},
    ],
    repo: 'lando/vuepress-docs-theme',
    showSearch: true,
    showSponsors: true,
    sponsors: yaml.load(fs.readFileSync(path.resolve(__dirname, '..', '..', 'sponsors.yml'), 'utf8')),
    sidebar: [
      {text: 'Overview', link: '/index.md'},
      '/installation.md',
      '/getting-started.md',
      {
        text: 'Foo',
        children: [
          // SidebarItem
          {
            text: 'github',
            link: 'https://github.com',
            children: [],
          },
          // string - page file path
          '/foo/bar.md',
        ],
      },
    ],
  },
};
