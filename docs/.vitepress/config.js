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
    host: 'https://vitepress-theme-default-plus.lando.dev/',
    sitemap: 'https://vitepress-theme-default-plus.lando.dev/sitemap.xml',
    disallowAll: false,
    allowAll: false,
    policies: [{
      userAgent: '*',
      disallow: ['/v/'],
      allow: '/',
    }],
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
            {icon: 'x', link: 'https://x.com/pirogcommamike'},
          ],
          sponsor: 'https://lando.dev/sponsor',
          maintainer: true,
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
            {icon: 'x', link: 'https://x.com/reynoldsalec'},
          ],
          sponsor: 'https://lando.dev/sponsor',
          maintainer: true,
          mergeOnly: true,
        },
        {
          avatar: 'https://avatars.githubusercontent.com/u/46671786',
          name: 'Manoah Tervoort',
          email: '149895ja@gmail.com',
          title: 'Contributor',
          links: [
            {icon: 'github', link: 'https://github.com/mtdvlpr'},
          ],
          mergeOnly: true,
          mergeWith: '46671786+mtdvlpr@users.noreply.github.com',
        },
        {
          name: 'John Ouelett',
          email: 'john@thinktandem.io',
          title: 'Robot From Future',
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
    layouts: {
      cats: './components/VPLCats.vue',
      dogs: './components/VPLDogs.vue',
    },
    logo: {src: '/images/vitepress-lando-logo-icon.png', width: 24, height: 24},
    multiVersionBuild: {
      build: 'dev',
      match: 'v[0-9].*',
      base: '/v/',
      satisfies: '>=1.0.0-beta.42',
    },
    tags: {
      'obscure': {
        color: 'var(--vp-c-purple-1)',
        styles: {
          color: 'var(--vp-c-white)',
        },
        icon: '',
      },
      'secret tag': {
        color: '#C0FFEE',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-6 3.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM7.293 5.293a1 1 0 1 1 .99 1.667c-.459.134-1.033.566-1.033 1.29v.25a.75.75 0 1 0 1.5 0v-.115a2.5 2.5 0 1 0-2.518-4.153.75.75 0 1 0 1.061 1.06Z" clip-rule="evenodd" /></svg>',
        link: 'https://www.youtube.com/watch?v=HU2ftCitvyQ',
        styles: {
          color: '#BA11AD',
        },
      },
      'tag 2': {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M11.5 8a3.5 3.5 0 0 0 3.362-4.476c-.094-.325-.497-.39-.736-.15L12.099 5.4a.48.48 0 0 1-.653.033 8.554 8.554 0 0 1-.879-.879.48.48 0 0 1 .033-.653l2.027-2.028c.24-.239.175-.642-.15-.736a3.502 3.502 0 0 0-4.476 3.427c.018.99-.133 2.093-.914 2.7l-5.31 4.13a2.015 2.015 0 1 0 2.828 2.827l4.13-5.309c.607-.78 1.71-.932 2.7-.914L11.5 8ZM3 13.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" /></svg>',
      },
    },
    tagLink: '/all?tag=:tag-id',
    search: {
      provider: 'local',
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/lando/vitepress-theme-default-plus',
      },
      {
        icon: 'x',
        link: 'https://x.com/devwithlando',
      },
      {
        icon: 'youtube',
        link: 'https://www.youtube.com/channel/UCl_QBNuGJNoo7yH-n18K7Kg',
      },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M3.75 4.5a.75.75 0 0 1 .75-.75h.75c8.284 0 15 6.716 15 15v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75C18 11.708 12.292 6 5.25 6H4.5a.75.75 0 0 1-.75-.75V4.5Zm0 6.75a.75.75 0 0 1 .75-.75h.75a8.25 8.25 0 0 1 8.25 8.25v.75a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75v-.75a6 6 0 0 0-6-6H4.5a.75.75 0 0 1-.75-.75v-.75Zm0 7.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clip-rule="evenodd" /></svg>',
        },
        link: '/feed.rss',
      },
      {
        icon: {
          svg: '<svg class="shake" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="red" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
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
            {text: 'GitHub', link: 'https://github.com/lando/vitepress-theme-default-plus/issues/new/choose'},
            {text: 'Slack', link: 'https://www.launchpass.com/devwithlando'},
            {text: 'Contact Us', link: '/support'},
            {text: 'Guides', link: '/guides'},
          ],
        },
        {text: 'Configuration', link: '/config/config'},
        {text: 'Blog', link: '/blog'},
      ],
    },
    sidebarEnder: {
      text: `v${version}`,
      collapsed: true,
      items: [
        {
          text: 'Other Doc Versions',
          items: [
            {text: 'stable', target: '_blank', link: '/v/stable/'},
            {text: 'edge', target: '_blank', link: '/v/edge/'},
            {text: '<strong>see all versions</strong>', link: '/v/'},
          ],
        },
        {text: 'Release Notes', link: `https://github.com/lando/vitepress-theme-default-plus/releases/tag/v${version}`},
        {text: 'Other Releases', link: 'https://github.com/lando/vitepress-theme-default-plus/releases'},
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
        {text: 'createContentLoader()', link: '/config/create-content-loader'},
        {text: 'useCollection()', link: '/composables/use-collection'},
        {text: 'useTeam()', link: '/composables/use-team'},
      ],
    },
    {
      text: 'Pages',
      collapsed: false,
      items: [
        {text: 'Collections', link: '/pages/collections'},
        {text: 'Teams', link: '/pages/teams'},
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
        {text: 'Tabs', link: '/markdown/tabs'},
        {text: 'Thumbnails', link: '/markdown/thumbnails'},
        {text: 'Advanced', link: '/guides/advanced-markdown'},
      ],
    },
    {text: 'Blog', link: '/blog'},
    {text: 'Guides', link: '/guides'},
  ];
}
