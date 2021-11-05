const {path} = require('@vuepress/utils');

module.exports = {
  lang: 'en-US',
  title: 'Lando',
  description: 'A VuePress 2 Theme for Lando Doc Based Sites"',
  head: [
    ['link', {rel: 'icon', href: '/favicon.ico'}],
    ['link', {rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Poppins:700|Source+Sans+Pro&display=swap'}],
  ],
  theme: path.resolve(__dirname, 'vuepress-docs-theme'),
  themeConfig: {
    logo: '/images/logo-pink-small.png',
    repo: 'lando/vuepress-docs-theme',
    docsDir: 'docs',
    docsBranch: 'main',
    navbar: [
      {text: 'Getting Started', link: 'https://docs.lando.dev/basics/'},
    ],
  },
};
