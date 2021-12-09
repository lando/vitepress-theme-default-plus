'use strict';
const {fs, path} = require('@vuepress/utils');

module.exports = {
  // Core config
  logo: '/images/hero.png',
  navbar: [],
  sidebar: [],

  // Autopopulate
  // Attempt to autopopulate empty data from github
  autoPopulate: true,

  // Allows absolute links to this domain to behave like internal links
  // This is useful for multiple sites that are served under one domain a la netlify
  baseUrl: null,

  // Shows the CarbonAds in the top sidebar
  carbonAds: {
    placement: 'landodev',
    serve: 'CE7DCKJU',
    show: true,
  },

  // Contributors stuff
  contributors: true,

  // Dark mode
  darkMode: true,

  // Edit link text
  editLink: true,
  editLinkText: 'Suggest an edit to this page',

  // Use Google Analytics
  gaTracking: true,
  gaSettings: {
    // Needs to be a Measurement ID, format G-XXXXXXXXXX
    id: 'G-ZSK3T9FTQ9',
  },

  // Last updated
  lastUpdated: true,
  lastUpdatedText: 'Updated',

  // Custom pages
  pages: {
    contributors: {
      content: fs.readFileSync(path.resolve(__dirname, '..', 'pages', 'contributors.md')),
      data: [],
      link: '/contributors.html',
      show: true,
      title: 'Contributorz',
    },
    versions: {
      content: fs.readFileSync(path.resolve(__dirname, '..', 'pages', 'versions.md')),
      data: [],
      link: '/versions.html',
      show: true,
      title: 'Previous Versions',
      trimLatest: true,
      showEdge: true,
    },
  },

  // Shared navbar
  // If baseURL is set then these will be "external" links prefixed with it
  sharedNavbar: [],

  // Show sidebar header
  // Set this to show a title for the sidebar
  sidebarTitle: false,
  sidebarTitleIcon: false,

  // Shows the special sponsors on the right, see sponsors below
  // Can be true|false|or a list of sponsor ids to show
  showSponsors: false,
  sponsors: [],

  // Show the latest version if we can
  showVersion: true,
  version: null,
  versionLink: null,

  // Search
  showSearch: false,
  searchSettings: {
    apiKey: '15e332850128e9ec96929f44c62f6c88',
    indexName: 'lando',
  },
};
