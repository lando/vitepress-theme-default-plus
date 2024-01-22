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
    containers: {
      special: {},
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
        link: '/overview',
        activeMatch: '/install|/overview|/usage|/development|/team|/support',
      },
      {
        text: 'Configuration',
        link: '/config/config',
        activeMatch: '/config/|/components/|/composables|/markdown|/pages',
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
        text: version,
        class: 'version',
        items: [
          {
            items: [{
              text: 'Release Notes',
              link: `https://github.com/lando/vitepress-theme-default-plus/releases/tag/v${version}`,
            }],
          },
          {
            text: 'Older Versions',
            link: 'https://github.com/lando/vitepress-theme-default-plus/releases',
          },
          {
            text: 'Examples',
            link: 'https://github.com/lando/vitepress-theme-default-plus/docs',
          },
        ],
      },
    ],
    sidebar: {
      '/config': configSideBar(),
      '/components': configSideBar(),
      '/composables': configSideBar(),
      '/guides': configSideBar(),
      '/markdown': configSideBar(),
      '/pages': configSideBar(),
      '/': [
        {
          text: 'Introduction',
          collapsed: false,
          items: [
            {text: 'Overview', link: '/overview'},
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
        {
          text: 'Help & Support',
          collapsed: false,
          items: [
            {text: 'GitHub', link: 'https://github.com/lando/vitepress-theme-default-plus.lando.dev/issues/new/choose'},
            {text: 'Slack', link: 'https://launchpass.com/devwithlando'},
            {text: 'Contact Us', link: '/support'},
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
        {text: 'useCollection()', link: '/composables/use-collection'},
        {text: 'useTeam()', link: '/composables/use-team'},
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
      text: 'Markdown Containers',
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
    {text: 'Blog', link: '/blog'},
    {text: 'Guides', link: '/guides'},
  ];
}
