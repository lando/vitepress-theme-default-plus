import {fs, getDirname, path} from '@vuepress/utils';
import yaml from 'js-yaml';

const __dirname = getDirname(import.meta.url);

export default {
  // @vuepress/theme-default default config overrides
  colorMode: 'auto',
  colorModeSwitch: true,
  contributors: true,
  editLink: true,
  editLinkText: 'Suggest an edit to this page',
  lastUpdated: true,
  lastUpdatedText: 'Updated',
  logo: '/lando/icon.svg',
  navbar: [],
  sidebar: [],
  sidebarDepth: 0,

  // @lando/vuepress-theme-default-plus config
  alert: false,
  alias: {},

  autometa: {
    twitter: '@devwithlando',
    canonicalUrl: 'https://docs.lando.dev/',
  },

  // Allows absolute links to this domain to behave like internal links
  // This is useful for multiple sites that are served under one domain a la netlify
  baseUrl: 'https://docs.lando.dev',

  // Shows the CarbonAds in the top sidebar
  carbonAds: {
    placement: 'landodev',
    serve: 'CE7DCKJU',
  },

  // Contributors pages
  contributorsPage: {
    auto: true,
    exclude: [
      'dependabot[bot]',
      'github-actions[bot]',
    ],
  },

  // Exclude from git contributors
  contributorsExclude: [
    'dependabot[bot]',
    'github-actions[bot]',
  ],

  // Use Google Analytics
  ga: {
    id: 'G-ZSK3T9FTQ9',
  },
  // Use hubspot tracking
  hubspot: {
    id: '6478338',
  },

  // Jobs
  jobs: [
    {
      title: 'Lando Developer',
      logo: 'https://docs.lando.dev/images/icon.svg',
      link: 'https://docs.google.com/forms/d/e/1FAIpQLSc2vkesq59BblKo8ZX-R1hKTrHphh1kmsg4FgWV1WH5BKEjHQ/viewform',
      company: 'Lando System Inc',
      aux: 'DC, Remote',
    },
  ],

  // Page Types
  pageTypes: [{
    name: 'Guide',
    key: 'guide',
    path: '@theme/Guide.vue',
  }, {
    name: 'Blog',
    key: 'blog',
    path: '@theme/BlogPost.vue',
  }],

  // Use Readmode
  readMode: {
    focusName: 'MAKE READING EASIER',
    distractName: 'MAKE READING HARDER',
  },
  // Use rightbar
  rightbar: true,

  // Use Robots
  robots: {
    allowAll: true,
  },

  // Use Sitemap
  sitemap: true,

  // Shared navbar
  // If baseURL is set then these will be "external" links prefixed with it
  sharedNavbar: [
    {
      text: 'Core',
      children: [
        {
          text: 'Landofile',
          columns: 4,
          children: [
            {
              text: 'Services',
              link: 'https://docs.lando.dev/core/v4/landofile/services.html',
            },
          ],
        },
        {
          text: 'Configuration',
          columns: 3,
          children: [],
        },
        {
          text: 'Plugins',
          columns: 3,
          children: [],
        },
        {
          text: 'Services',
          columns: 2,
          children: [
            {text: 'Lando', link: 'https://docs.lando.dev/core/v4/services/lando.html'},
            {text: 'L-337', link: 'https://docs.lando.dev/core/v4/services/l337.html'},
          ],
        },
      ],
    },
  ],
  // Sidebar header
  sidebarHeader: {
    satisfies: '>4 || >4.0.0 || >4.0.0-*',
    type: 'success',
  },
  search: {
    appId: '9S3BH0SKWT',
    apiKey: 'd3db589efd595b115848fc6a654d3263',
    indexName: 'lando',
  },
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
    link: 'https://github.com/lando/',
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

  // Shows the special sponsors on the right, see sponsors below
  // Can be true|false|or a list of sponsor ids to show
  sponsors: {
    text: 'your logo?',
    link: 'https://lando.dev/sponsor',
    data: yaml.load(fs.readFileSync(path.resolve(__dirname, '..', 'sponsors.yml'), 'utf8')),
  },

  // Toggle tag mode
  tags: true,

  // Table of contents
  toc: true,

  // Versions page
  versionsPage: {
    auto: true,
    trimLatest: true,
    showEdge: true,
    satisfies: '>4 || >4.0.0 || >4.0.0-*',
  },
};
