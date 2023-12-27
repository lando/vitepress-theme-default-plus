export default {
  base: '/',
  lang: 'en-US',
  markdown: {},
  themeConfig: {
    alert: false,
    autometa: false,
    containers: {
      'brand': {defaultTitle: 'BRAND'},
      'box': {},
      'box-blue': {},
      'box-brand': {},
      'box-green': {},
      'box-red': {},
      'box-yellow': {},
      'caption': {},
      'card': {},
      'center': {},
      'half': {},
      'highlight': {},
      'left': {},
      'right': {},
      'success': {defaultTitle: 'SUCCESS'},
      'third': {},
      'thumbnail': {},
    },
    contributors: {
      merge: 'name',
      debotify: true,
      exclude: [],
      include: [],
    },
    internalDomain: [],
    internalDomains: [],
    ga: false,
    hubspot: false,
    jobs: false,
    lastUpdated: {
      text: 'Updated',
      formatOptions: {
        dateStyle: 'timeago',
      },
    },
    layouts: {},
    nav: [],
    robots: {
      allowAll: true,
    },
    sidebar: {},
    sponsors: false,
  },
  sitemap: {
    lastmodDateOnly: false,
    transformItems: items => {
      for (const item of items) {
        item.priority = 0.5;
        item.changefreq = 'daily';
      }
      return items;
    },
  },
  vite: {
    resolve: {alias: []},
    plugins: [],
  },
};
