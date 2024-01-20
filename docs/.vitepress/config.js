import {createRequire} from 'module';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

import {defineConfig} from '../../config';

const require = createRequire(import.meta.url);

const __dirname = dirname(resolve(fileURLToPath(import.meta.url)));
const {version} = require('../../package.json');

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
    ['meta', {name: 'og:image', content: 'https://vitepress-theme-default-plus.lando.dev/images/hero.png'}],
    ['meta', {name: 'twitter:card', content: 'summary'}],
    ['meta', {name: 'twitter:title', content: 'VitePress Theme +'}],
    ['meta', {name: 'twitter:description', content: 'The VitePress default theme with some MOARPOWAH!'}],
  ],
  robots: {
    host: 'https://vite-theme-default-plus.lando.dev/',
    sitemap: 'https://vite-theme-default-plus.lando.dev/sitemap.xml',
  },
  sitemap: {
    hostname: 'https://vitepress-theme-default-plus.lando.dev',
  },
  vite: {
    resolve: {
      alias: [
        {find: '@lando/vitepress-theme-default-plus', replacement: resolve(__dirname, '../..')},
        {find: '@lando/vitepress-theme-default-plus/config', replacement: resolve(__dirname, '../../config')},
      ],
    },
  },
  themeConfig: {
    autometa: {
      canonicalUrl: 'https://vitepress-theme-default-plus.lando.dev/',
      image: 'https://vitepress-theme-default-plus.lando.dev/images/hero.png',
      x: '@devwithlando',
    },
    carbonAds: {
      code: 'CE7DCKJU',
      placement: 'landodev',
    },
    contributors: {
      merge: 'name',
      debotify: true,
      include: [
        {
          name: 'Mike Pirog',
          email: 'mike@lando.dev',
          title: 'Co-founder',
          org: 'lando.dev',
          orgLink: 'https://lando.dev',
          desc: 'SLAVE4U',
          links: [
            {icon: 'github', link: 'https://github.com/pirog'},
            {icon: 'twitter', link: 'https://twitter.com/pirogcommamike'},
          ],
          sponsor: 'https://lando.dev/sponsor',
          mergeOnly: true,
        },
        {
          name: 'John Ouelett',
          email: 'john@thinktandem.io',
          title: 'Robot From Future',
          mergeOnly: true,
        },
        {
          avatar: 'https://avatars.githubusercontent.com/u/1153738',
          name: 'Alec Reynolds',
          email: 'alec+git@lando.dev',
          title: 'Co-founder',
          org: 'lando.dev',
          orgLink: 'https://lando.dev',
          desc: 'A chill dude',
          links: [
            {icon: 'github', link: 'https://github.com/reynoldsalec'},
            {icon: 'twitter', link: 'https://twitter.com/reynoldsalec'},
          ],
          sponsor: 'https://lando.dev/sponsor',
          mergeOnly: true,
        },
      ],
    },
    editLink: {pattern: 'https://github.com/lando/vitepress-theme-default-plus/edit/main/docs/:path'},
    feed: {
      patterns: '*/**/*.md',
    },
    ga: {id: 'G-ZSK3T9FTQ9'},
    hubspot: {id: '6478338'},
    internalDomain: [
      'http://docs.lando.dev',
      'https://docs.lando.dev',
    ],
    layouts: {
      cats: './components/VPLCats.vue',
      dogs: './components/VPLDogs.vue',
    },
    logo: {src: '/images/vitepress-lando-logo-icon.png', width: 24, height: 24},
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
    nav: [
      {
        text: 'Getting Started',
        link: '/index',
        activeMatch: '^(?!.*(?:config|components|markdown|pages|guides|blog)).+',
      },
      {
        text: 'Configuration',
        link: '/config/config',
        activeMatch: '/config/|/components/|/markdown|/pages',
      },
      {
        text: 'Guides',
        link: '/guides',
        activeMatch: '/guides',
      },
      {
        text: 'Blog',
        link: '/blog',
        activeMatch: '/blog',
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
                  expires: 16972999930005,
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
                  expires: 16972999930005,
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
                  expires: 16972999930005,
                  type: 'new',
                  text: 'NEW!',
                },
              },
            ],
          },
        ],
      },
      {
        text: version,
        class: 'version',
        items: [
          {
            text: 'Changelog',
            link: 'https://github.com/jcamp-code/vitepress-blog-theme/blob/main/CHANGELOG.md',
          },
          {
            text: 'Contributing',
            link: 'https://github.com/jcamp-code/vitepress-blog-theme/blob/main/.github/contributing.md',
          },
        ],
      },
    ],
    sidebar: {
      '/config': configSideBar(),
      '/components': configSideBar(),
      '/markdown': configSideBar(),
      '/pages': configSideBar(),
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
        {
          text: 'Contribution',
          collapsed: false,
          items: [
            {text: 'Development', link: '/development'},
            {text: 'Team', link: '/team'},
          ],
        },
        {text: 'Configuration', link: '/config/config'},
        {text: 'Blog', link: '/blog'},
        {text: 'Guides', link: '/guides'},
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
