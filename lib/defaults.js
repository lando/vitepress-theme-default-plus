'use strict';
const {fs, path} = require('@vuepress/utils');

module.exports = {
  // @vuepress/theme-default default config overrides
  contributors: true,
  darkMode: true,
  editLink: true,
  editLinkText: 'Suggest an edit to this page',
  lastUpdated: true,
  lastUpdatedText: 'Updated',
  logo: '/images/hero.png',
  navbar: [],
  sidebar: [],

  // @lando/vuepress-theme-default-plus config
  // Attempt to autopopulate empty data from github
  autoPopulate: true,

  // Allows absolute links to this domain to behave like internal links
  // This is useful for multiple sites that are served under one domain a la netlify
  baseUrl: null,

  // Canonical URL for metadata consideration
  canonicalUrl: null,

  // Shows the CarbonAds in the top sidebar
  carbonAds: {
    enabled: true,
    placement: null,
    serve: null,
  },

  // Use Google Analytics
  ga: {
    enabled: true,
    // Needs to be a Measurement ID, format G-XXXXXXXXXX
    id: null,
  },

  // Custom pages
  pages: {
    contributors: {
      enabled: true,
      content: fs.readFileSync(path.resolve(__dirname, '..', 'pages', 'contributors.md')),
      data: [],
      link: '/contributors.html',
      title: 'Contributorz',
    },
    versions: {
      enabled: true,
      content: fs.readFileSync(path.resolve(__dirname, '..', 'pages', 'versions.md')),
      data: [],
      link: '/versions.html',
      title: 'Previous Versions',
      trimLatest: true,
      showEdge: true,
    },
  },

  // Shared navbar
  // If baseURL is set then these will be "external" links prefixed with it
  sharedNavbar: [],

  // Sidebar header
  sidebarHeader: {
    enabled: false,
    icon: null,
    title: null,
    version: null,
    versionLink: null,
  },
  search: {
    enabled: false,
    apiKey: null,
    indexName: null,
  },
  social: {
    enabled: false,
    icons: [],
    owner: null,
  },
  // Shows the special sponsors on the right, see sponsors below
  // Can be true|false|or a list of sponsor ids to show
  sponsors: {
    enabled: false,
    data: [],
  },
};
