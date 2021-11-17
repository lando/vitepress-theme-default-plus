'use strict';
const {fs, path} = require('@vuepress/utils');

module.exports = {
  // Core config
  logo: 'https://vuepress-theme-lando-docs.lando.dev/images/logo-pink-small.png',
  navbar: [],
  sidebar: [],

  // Allows absolute links to this domain to behave like internal links
  // This is useful for multiple sites that are served under one domain a la netlify
  baseUrl: null,

  contributors: true,
  contributorsContent: fs.readFileSync(path.resolve(__dirname, '..', 'pages', 'contributors.md')),
  contributorsText: 'Contributorz',
  // Automatically creates a contributors page at the specified path
  contributorsPage: '/contributors.html',
  // Create a link in the sidebar at the specified path or external link
  contributorsSidebar: '/contributors.html',

  // Dark mode
  darkMode: true,

  // Edit link text
  editLink: true,
  editLinkText: 'Suggest an edit to this page',

  // Lando navbar
  // If baseURL is set then these will be "external" links prefixed with it
  showLandoNavbar: true,
  landoNavbar: [
    {text: 'Always Internal', link: '/basics/'},
  ],

  // Last updated
  lastUpdated: true,
  lastUpdatedText: 'Updated',

  // Shows the CarbonAds in the top sidebar
  showCarbonAds: true,

  // Shows the special sponsors on the right, see sponsors below
  // Can be true|false|or a list of sponsor ids to show
  showSponsors: false,
  sponsors: [],

  showSearch: false,
  searchSettings: {
    apiKey: '15e332850128e9ec96929f44c62f6c88',
    indexName: 'lando',
  },
};
