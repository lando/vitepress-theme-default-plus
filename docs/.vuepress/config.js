const customTheme = require('../../index.js');
const {fs, path} = require('@vuepress/utils');
const yaml = require('js-yaml');

module.exports = {
  lang: 'en-US',
  title: 'VuePress 2 Default Theme +',
  description: 'The VuePress2 default Theme with some extra power!',
  head: [
    ['link', {rel: 'icon', href: '/images/favicon.png'}],
    ['link', {rel: 'preconnect', href: '//fonts.googleapis.com'}],
    ['link', {rel: 'preconnect', href: '//fonts.gstatic.com', crossorigin: true}],
    ['link', {rel: 'stylesheet', href: '//fonts.googleapis.com/css2?family=Lexend:wght@500&display=swap'}],
  ],
  theme: customTheme({
    // PARENT CONFIG
    docsDir: 'docs',
    docsBranch: 'main',
    repo: 'lando/vuepress-theme-default-plus',

    // THEME CONFIG
    // Use automatic metatag generation
    autometa: {
      twitter: '@devwithlando',
      canonicalUrl: 'https://vuepress-theme-default-plus.lando.dev/',
    },

    // Use carbon ads
    carbonAds: {
      placement: 'landodev',
      serve: 'CE7DCKJU',
    },

    // Use Google Analytics
    ga: {
      id: 'G-ZSK3T9FTQ9',
    },
    // Use hubspot tracking
    hubspot: {
      id: '6478338',
    },
    // use default search
    search: true,

    jobs: [
      {
        title: 'Lando Developer',
        logo: 'https://docs.lando.dev/images/icon.svg',
        link: 'https://docs.google.com/forms/d/e/1FAIpQLSc2vkesq59BblKo8ZX-R1hKTrHphh1kmsg4FgWV1WH5BKEjHQ/viewform',
        company: 'Lando System Inc',
        aux: 'DC, Remote',
      },
    ],

    // Sidebar header
    sidebarHeader: {
      auto: true,
      title: 'Current Version',
    },

    // Sponsors
    sponsors: {
      text: 'your logo?',
      link: 'https://lando.dev/sponsor',
      data: yaml.load(fs.readFileSync(path.resolve(__dirname, '..', '..', 'sponsors.yml'), 'utf8')),
    },

    // Use social media icons
    social: [{
      title: 'Twitter',
      svg: {
        attributes: {
          'viewBox': '0 0 24 24',
          'fill': 'none',
          'stroke-width': 2,
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        },
        path: {
          d: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z',
        },
      },
      link: 'https://twitter.com/devwithlando',
    },
    {
      title: 'GitHub',
      svg: {
        attributes: {
          'viewBox': '0 0 24 24',
          'fill': 'none',
          'stroke-width': 2,
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        },
        path: {
          d: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22',
        },
      },
      link: 'https://github.com/lando/vuepress-theme-default-plus',
    },
    {
      title: 'YouTube',
      svg: {
        attributes: {
          'viewBox': '0 0 24 24',
          'fill': 'none',
          'stroke-width': 2,
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        },
        path: {
          d: 'M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z',
        },
        polygon: {
          points: '9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02',
        },
      },
      link: 'https://www.youtube.com/channel/UCl_QBNuGJNoo7yH-n18K7Kg',
    },
    {
      title: 'Sponsors',
      svg: {
        attributes: {
          'viewBox': '0 0 24 24',
          'fill': 'none',
          'stroke-width': 2,
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        },
        path: {
          d: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
        },
      },
      link: 'https://lando.dev/sponsor',
    }],

    /*
    SIDEBAR CONFIG
    */
    sidebar: [
      '/index.html',
      '/getting-started.html',
      '/config.html',
      '/frontmatter.html',
      '/components.html',
      '/containers.html',
      {
        text: 'Guides',
        collapsible: true,
        children: [
          {
            text: 'Making a guide 1',
            link: '/making-a-guide.html',
          },
          {
            text: 'Making a guide 2',
            link: '/making-a-guide-2.html',
          },
          {
            text: 'Making a blog post',
            link: '/making-a-blog-post.html',
          },
          {
            text: 'Adding page metadata',
            link: '/adding-page-metadata.html',
          },
          {
            text: 'Adding a signup',
            link: '/guide-signup.html',
          },
          {
            text: 'Disabling rightbar',
            link: '/disabling-rightbar.html',
          },
          {
            text: 'Tagging things',
            link: '/tagging-things.html',
          },
          {
            text: 'Advanced markdown',
            link: '/advanced-markdown.html',
          },
        ],
      },
      '/development.html',
      '/support.html',
      {text: 'Examples', link: 'https://github.com/lando/vuepress-theme-default-plus'},
      {text: 'Release Notes', link: 'https://github.com/lando/vuepress-theme-default-plus/releases'},
    ],
  }),
};
