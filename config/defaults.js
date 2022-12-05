export default {
  // @vuepress/theme-default default config overrides
  colorMode: 'auto',
  colorModeSwitch: true,
  contributors: true,
  editLink: true,
  editLinkText: 'Suggest an edit to this page',
  lastUpdated: true,
  lastUpdatedText: 'Updated',
  logo: '/images/hero.png',
  navbar: [],
  sidebar: [],
  sidebarDepth: 0,

  // @lando/vuepress-theme-default-plus config
  // Attempt to automatically assign meta
  autometa: false,

  // Allow for a top alert to be shown
  alert: false,

  // Allow user to replace aliases
  alias: {},

  // Allows absolute links to this domain to behave like internal links
  // This is useful for multiple sites that are served under one domain a la netlify
  baseUrl: null,

  // Shows the CarbonAds in the top sidebar
  carbonAds: false,

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
  ga: false,

  // Use Google Analytics
  hubspot: false,

  // Jobs
  jobs: false,

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
  sharedNavbar: [],

  // Sidebar header
  sidebarHeader: false,

  // Search
  search: false,

  // Social links
  social: false,

  // Shows the special sponsors on the right, see sponsors below
  // Can be true|false|or a list of sponsor ids to show
  sponsors: false,

  // Toggle tag mode
  tags: true,

  // Table of contents
  toc: true,

  // Versions pages
  versionsPage: {
    auto: true,
    trimLatest: true,
    showEdge: true,
  },
};
