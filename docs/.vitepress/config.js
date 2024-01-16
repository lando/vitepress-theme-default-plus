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
    ['meta', {name: 'og:image', content: 'https://vitepress-theme-default-plus.lando.dev/images/hero.png'}],
    ['meta', {name: 'twitter:card', content: 'summary'}],
    ['meta', {name: 'twitter:title', content: 'VitePress Theme +'}],
    ['meta', {name: 'twitter:description', content: 'The VitePress default theme with some MOARPOWAH!'}],
  ],
  robots: {
    host: 'https://vite-theme-default-plus.lando.dev/',
    sitemap: 'https://vite-theme-default-plus.lando.dev/sitemap.xml',
    // disallowAll: false,
    // allowAll: false,
    // policy: [
    //   {
    //     userAgent: '*',
    //     disallow: [
    //       '/user/',
    //       '/login',
    //     ],
    //     allow: [
    //       '*.js',
    //       '*.png',
    //     ],
    //   },
    // ],
  },

  // sitemap: {
  //   hostname: 'https://vitepress-theme-default-plus.lando.dev',
  // },
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

    layouts: {
      cats: './components/VPLCats.vue',
      dogs: './components/VPLDogs.vue',
    },
    // blog: {
    //   path: '/path',
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

    ga: {id: 'G-ZSK3T9FTQ9'},
    hubspot: {id: '6478338'},

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
