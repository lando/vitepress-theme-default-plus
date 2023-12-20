import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
// import {readFileSync} from 'node:fs';
// import {load} from 'js-yaml';

import {defineConfig} from '../../config';

const __dirname = dirname(resolve(fileURLToPath(import.meta.url)));

export default defineConfig({
  title: 'VitePress Theme +',
  description: 'The VitePress default theme with some MOARPOWAH!',
  base: '/',
  lang: 'en-US',
  head: [
    ['link', {rel: 'icon', type: 'image/png', href: '/images/vitepress-lando-logo-mini.png'}],
    ['meta', {name: 'og:type', content: 'website'}],
    ['meta', {name: 'og:locale', content: 'en'}],
    ['meta', {name: 'og:site_name', content: 'VitePress Default Theme Plus!'}],
    ['meta', {name: 'og:image', content: 'https://vitepress-default-theme-plus.lando.dev/images/hero.png'}],
  ],
  vite: {
    resolve: {
      alias: [
        {find: '@lando/vitepress-theme-default-plus', replacement: resolve(__dirname, '../../index.js')},
        {find: '@lando/vitepress-theme-default-plus/config', replacement: resolve(__dirname, '../../config.js')},
      ],
    },
  },
  themeConfig: {
    // blog: {
    //   title: 'My AI Written Blog',
    //   description: 'All these articles were written by AI!',
    //   defaultAuthor: 'AI Writer',
    //   categoryIcons: {
    //     article: 'i-[heroicons-outline/book-open]',
    //     tutorial: 'i-[heroicons-outline/academic-cap]',
    //     document: 'i-[heroicons-outline/annotation]',
    //   },
    //   tagIcons: {
    //     github: 'i-[carbon/logo-github]',
    //     vue: 'i-[carbon/logo-vue]',
    //   },
    // },

    internalDomain: [
      'http://docs.lando.dev',
      'https://docs.lando.dev',
    ],

    // core
    logo: {src: '/images/vitepress-lando-logo-icon.png', width: 24, height: 24},
    editLink: {pattern: 'https://github.com/lando/vitepress-theme-default-plus/edit/main/docs/:path'},

    // extended
    // alert: {
    //   content: 'Are you looking for the 3.x docs? You can go to them <a href="https://google.com/3.x">here</a>.',
    //   type: 'warning',
    //   closeable: true,
    // },
    carbonAds: {
      code: 'CE7DCKJU',
      placement: 'landodev',
    },
    // jobs: [
    //   {
    //     title: 'Lando Developer',
    //     logo: 'https://docs.lando.dev/images/icon.svg',
    //     link: 'https://docs.google.com/forms/d/e/1FAIpQLSc2vkesq59BblKo8ZX-R1hKTrHphh1kmsg4FgWV1WH5BKEjHQ/viewform',
    //     company: 'Lando System Inc',
    //     aux: 'DC, Remote',
    //   },
    // ],
    search: {
      provider: 'local',
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/lando/vitepress-theme-default-plus',
      },
      {
        icon: 'twitter',
        link: 'https://twitter.com/@devwithlando',
      },
      {
        icon: 'youtube',
        link: 'https://www.youtube.com/channel/UCl_QBNuGJNoo7yH-n18K7Kg',
      },
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Dribbble</title><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
        },
        link: 'https://lando.dev/sponsor',
      },
    ],
    // sponsors: {
    //   text: 'your logo?',
    //   link: 'https://lando.dev/sponsor',
    //   data: load(readFileSync(resolve(__dirname, '..', '..', 'sponsors.yml'), 'utf8')),
    // },

    // NAV
    nav: [
      {
        text: 'Getting Started',
        link: '/index',
        activeMatch: '^(?!.*(?:config|components|markdown)).+',
      },
      {
        text: 'Configuration',
        link: '/config/config',
        activeMatch: '/config/|/components/|/markdown',
      },
      {
        text: 'Getting Started',
        link: 'https://docs.lando.dev/getting-started/',
      },
      {
        text: 'CLI',
        link: 'https://docs.lando.dev/cli/',
      },
      {
        text: 'Core',
        items: [
          {
            text: 'Landofile',
            columns: 3,
            items: [
              {text: 'Basics', link: 'https://docs.lando.dev/core/v3/index.html'},
              {text: 'Services', link: 'https://docs.lando.dev/core/v3/services.html'},
              {text: 'Recipes', link: 'https://docs.lando.dev/core/v3/recipes.html'},
              {text: 'Tooling', link: 'https://docs.lando.dev/core/v3/tooling.html'},
              {text: 'Proxy', link: 'https://docs.lando.dev/core/v3/proxy.html'},
              {text: 'Events', link: 'https://docs.lando.dev/core/v3/events.html'},
            ],
          },
          {
            text: 'Configuration',
            columns: 2,
            items: [
              {text: 'Global', link: 'https://docs.lando.dev/core/v3/index.html'},
              {text: 'Environment', link: 'https://docs.lando.dev/core/v3/env.html'},
              {text: 'Experimental', link: 'https://docs.lando.dev/core/v3/experimental.html'},
              {
                text: 'Orchestrator',
                link: 'https://docs.lando.dev/core/v3/orchestrator.html',
                alert: {
                  expires: 1697299993000,
                  type: 'new',
                  text: 'NEW!',
                },
              },
              {text: 'Performance', link: 'https://docs.lando.dev/core/v3/performance.html'},
              {text: 'Plugins', link: 'https://docs.lando.dev/core/v3/plugins.html'},
              {text: 'Releases', link: 'https://docs.lando.dev/core/v3/releases.html'},
              {text: 'Security', link: 'https://docs.lando.dev/core/v3/security.html'},
              {text: 'SSH', link: 'https://docs.lando.dev/core/v3/ssh.html'},
              {text: 'Shared Files', link: 'https://docs.lando.dev/core/v3/files.html'},
            ],
          },
          {
            text: 'Plugins',
            columns: 2,
            items: [
              {
                text: 'Healthcheck',
                link: 'https://docs.lando.dev/core/v3/healthcheck.html',
                alert: {
                  expires: 1697299993000,
                  type: 'new',
                  text: 'NEW!',
                },
              },
              {text: 'Networking', link: 'https://docs.lando.dev/core/v3/networking.html'},
              {text: 'Scanner', link: 'https://docs.lando.dev/core/v3/scanner.html'},
            ],
          },
          {
            text: 'Services',
            columns: 2,
            items: [
              {
                text: 'Lando',
                link: 'https://docs.lando.dev/core/v3/lando-service.html',
                alert: {
                  expires: 1697299993000,
                  type: 'new',
                  text: 'NEW!',
                },
              },
            ],
          },
        ],
      },
      {
        text: 'Recipes',
        items: [
          {
            text: 'Hosting Integrations',
            columns: 2,
            items: [
              {text: 'Acquia', link: 'https://docs.lando.dev/acquia'},
              {text: 'Lagoon (beta)', link: 'https://docs.lando.dev/lagoon'},
              {text: 'Pantheon', link: 'https://docs.lando.dev/pantheon'},
              {text: 'Platform.sh (beta)', link: 'https://docs.lando.dev/platformsh'},
            ],
          },
          {
            text: 'PHP Frameworks',
            columns: 3,
            items: [
              {text: 'Backdrop', link: 'https://docs.lando.dev/backdrop'},
              {text: 'Drupal', link: 'https://docs.lando.dev/drupal'},
              {text: 'Joomla', link: 'https://docs.lando.dev/joomla'},
              {text: 'Laravel', link: 'https://docs.lando.dev/laravel'},
              {text: 'Symfony', link: 'https://docs.lando.dev/symfony'},
              {text: 'WordPress', link: 'https://docs.lando.dev/wordpress'},
            ],
          },
          {
            text: 'Stacks',
            columns: 3,
            items: [
              {text: 'LAMP', link: 'https://docs.lando.dev/lamp'},
              {text: 'LEMP', link: 'https://docs.lando.dev/lemp'},
              {text: 'MEAN', link: 'https://docs.lando.dev/mean'},
            ],
          },
        ],
      },
      {
        text: 'Runtimes',
        items: [
          {
            text: 'Application Languages',
            columns: 2,
            items: [
              {text: 'dotnet', link: 'https://docs.lando.dev/dotnet'},
              {text: 'Go', link: 'https://docs.lando.dev/go'},
              {text: 'node', link: 'https://docs.lando.dev/node'},
              {text: 'PHP', link: 'https://docs.lando.dev/php'},
              {text: 'Python', link: 'https://docs.lando.dev/python'},
              {text: 'Ruby', link: 'https://docs.lando.dev/ruby'},
            ],
          },
          {
            text: 'General Purpose / DIY',
            columns: 2,
            items: [
              {text: 'Lando', link: 'https://docs.lando.dev/core/v3/lando-service.html'},
            ],
          },
        ],
      },
      {
        text: 'Services',
        items: [
          {
            text: 'Databases',
            columns: 3,
            items: [
              {text: 'MariaDB', link: 'https://docs.lando.dev/mariadb'},
              {text: 'MongoDB', link: 'https://docs.lando.dev/mongo'},
              {text: 'MSSQL', link: 'https://docs.lando.dev/mssql'},
              {text: 'MySQL', link: 'https://docs.lando.dev/mysql'},
              {text: 'PostgreSQL', link: 'https://docs.lando.dev/postgres'},
            ],
          },
          {
            text: 'Caches',
            columns: 3,
            items: [
              {text: 'Memcached', link: 'https://docs.lando.dev/memcached'},
              {text: 'redis', link: 'https://docs.lando.dev/redis'},
              {text: 'Varnish', link: 'https://docs.lando.dev/varnish'},
            ],
          },
          {
            text: 'Indexes',
            columns: 3,
            items: [
              {text: 'Elasticsearch', link: 'https://docs.lando.dev/elasticsearch'},
              {text: 'Solr', link: 'https://docs.lando.dev/solr'},
            ],
          },
          {
            text: 'Web Servers',
            columns: 3,
            items: [
              {text: 'Apache', link: 'https://docs.lando.dev/apache', target: '_self'},
              {text: 'nginx', link: 'https://docs.lando.dev/nginx'},
              {text: 'tomcat', link: 'https://docs.lando.dev/tomcat'},
            ],
          },
          {
            text: 'Dev Tools',
            columns: 3,
            items: [
              {text: 'MailHog', link: 'https://docs.lando.dev/mailhog'},
              {text: 'PhpMyAdmin', link: 'https://docs.lando.dev/phpmyadmin'},
            ],
          },
          {
            text: 'General Purpose / DIY',
            columns: 3,
            items: [
              {
                text: 'Lando',
                link: 'https://docs.lando.dev/core/v3/lando-service.html',
                alert: {
                  expires: 1697299993000,
                  type: 'new',
                  text: 'NEW!',
                },
              },
              {
                text: 'Compose',
                link: 'https://docs.lando.dev/compose',
                alert: {
                  expires: 1697299993000,
                  type: 'deprecated',
                  text: 'DEPRECATED!',
                },
              },
            ],
          },
        ],
      },


      // {
      //   text: 'Examples',
      //   items: [
      //     {
      //       text: 'Markdown',
      //       link: '/markdown-examples',
      //     },
      //     {
      //       text: 'Theme Test',
      //       link: '/theme-test',
      //     },
      //   ],
      // },
      // {
      //   text: 'Blog',
      //   activeMatch: '/blog/',
      //   items: [
      //     {
      //       text: 'Blog Home',
      //       link: '/blog/',
      //       activeMatch: '/blog/$',
      //     },
      //     {
      //       text: 'Tags',
      //       link: '/blog/tags',
      //       activeMatch: '/blog/tags',
      //     },
      //     {
      //       text: 'Archives',
      //       link: '/blog/archives',
      //       activeMatch: '/blog/archives',
      //     },
      //     // {
      //     //   text: 'RSS Feed',
      //     //   link: '/blog/feed.rss',
      //     // },
      //   ],
      // },
      // {
      //   text: '1.0.0',
      //   items: [
      //     {
      //       text: 'Changelog',
      //       link: 'https://github.com/jcamp-code/vitepress-blog-theme/blob/main/CHANGELOG.md',
      //     },
      //     {
      //       text: 'Contributing',
      //       link: 'https://github.com/jcamp-code/vitepress-blog-theme/blob/main/.github/contributing.md',
      //     },
      //   ],
      // },
    ],
    sidebar: {
      '/config': configSideBar(),
      '/components': configSideBar(),
      '/markdown': configSideBar(),
      '/': [
        {
          text: 'Introduction',
          collapsed: false,
          items: [
            {text: 'Overview', link: '/'},
            {text: 'Installation', link: '/install'},
            {text: 'Usage', link: '/usage'},
          ],
        },
        {text: 'Devlopment', link: '/development'},
        {text: 'Examples', link: 'https://github.com/lando/vuepress-theme-default-plus'},
        {text: 'Release Notes', link: 'https://github.com/lando/vuepress-theme-default-plus/releases'},
      ],
    },
  },
});

function configSideBar() {
  return [
    {
      text: 'Theme Configuration',
      collapsed: false,
      items: [
        {text: 'Configuration', link: '/config/config'},
        {text: 'Frontmatter', link: '/config/frontmatter'},
      ],
    },
    {
      text: 'Global Components',
      collapsed: false,
      items: [
        {text: 'Jobs', link: '/components/jobs'},
        {text: 'MailChimp', link: '/components/mailchimp'},
        {text: 'Sponsor', link: '/components/sponsors'},
        {text: 'YouTube', link: '/components/youtube'},
      ],
    },
    {
      text: 'Markdown',
      collapsed: false,
      items: [
        {text: 'Admonitions', link: '/markdown/admonitions'},
        {text: 'Alignments', link: '/markdown/alignments'},
        {text: 'Boxes', link: '/markdown/boxes'},
        {text: 'Cards', link: '/markdown/cards'},
        {text: 'Columns', link: '/markdown/columns'},
        {text: 'Highlights', link: '/markdown/highlights'},
        {text: 'Tabs', link: '/markdown/Tabs'},
        {text: 'Thumbnails', link: '/markdown/thumbnails'},
        {text: 'Advanced', link: '/guides/advanced-markdown'},
      ],
    },


    {text: 'Devlopment', link: '/development'},
    {text: 'Examples', link: 'https://github.com/lando/vuepress-theme-default-plus'},
    {text: 'Release Notes', link: 'https://github.com/lando/vuepress-theme-default-plus/releases'},
  ];
}
