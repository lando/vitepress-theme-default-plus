export default function({landoPlugin, version}) {
  const baseUrl = landoPlugin ? `https://docs.lando.dev/${landoPlugin}` : 'https://docs.lando.dev';
  const repo = landoPlugin ? `https://github.com/lando/${landoPlugin}` : 'https://github.com/lando';
  const base = landoPlugin ? `/plugins/${landoPlugin}/` : '/';
  const sidebarEnder = landoPlugin && version ? {
    text: `${landoPlugin}@v${version}`,
    collapsed: true,
    items: [
      {text: 'Release Notes', link: `${repo}/releases/tag/v${version}`},
      {text: 'Older Versions', link: `${repo}/releases`},
    ],
  } : false;

  return {
    base,
    collections: {},
    feed: {
      patterns: ['*.md', '*/**/*.md'],
    },
    lang: 'en-US',
    markdown: {},
    robots: {
      host: baseUrl,
      sitemap: `${baseUrl}/sitemap.xml`,
      allowAll: true,
    },
    sitemap: {
      hostname: 'https://docs.lando.dev/',
      lastmodDateOnly: false,
      transformItems: items => {
        for (const item of items) {
          item.url = `${base}${item.url}`;
          item.priority = 0.5;
          item.changefreq = 'daily';
        }
        return items;
      },
    },
    themeConfig: {
      alert: false,
      autometa: {
        canonicalUrl: 'https://docs.lando.dev',
        image: `${baseUrl}/images/hero.png`,
        x: '@devwithlando',
      },
      carbonAds: {
        code: 'CE7DCKJU',
        placement: 'landodev',
      },
      collections: {
        post: {
          frontmatter: {
            collection: 'post',
            contributors: false,
            backLink: {
              text: '<- Back to blog',
              link: '/blog',
            },
            aside: false,
            sidebar: false,
            prev: false,
            next: false,
            editLink: false,
          },
          icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/></svg>',
          iconLink: '/blog',
          patterns: ['blog/**/*.md'],
        },
        guide: {
          frontmatter: {
            collection: 'guide',
          },
          icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" /></svg>',
          iconLink: '/guides',
          patterns: ['guides/**/*.md'],
        },
      },
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
        include: [
          {
            name: 'Mike Pirog',
            email: 'mike@lando.dev',
            title: 'Co-founder',
            org: 'lando.dev',
            orgLink: 'https://lando.dev',
            links: [
              {icon: 'github', link: 'https://github.com/pirog'},
              {icon: 'twitter', link: 'https://twitter.com/pirogcommamike'},
            ],
            sponsor: 'https://lando.dev/sponsor',
            maintainer: true,
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
            maintainer: true,
            mergeOnly: true,
          },
        ],
      },
      editLink: {
        pattern: `${repo}/edit/main/docs/:path`,
      },
      internalDomain: [],
      internalDomains: [
        'http://docs.lando.dev',
        'https://docs.lando.dev',
      ],
      ga: {id: 'G-ZSK3T9FTQ9'},
      hubspot: {id: '6478338'},
      jobs: [
        {
          title: 'Lando Developer',
          logo: 'https://docs.lando.dev/images/icon.svg',
          link: 'https://docs.google.com/forms/d/e/1FAIpQLSc2vkesq59BblKo8ZX-R1hKTrHphh1kmsg4FgWV1WH5BKEjHQ/viewform',
          company: 'Lando System Inc',
          aux: 'DC, Remote',
        },
      ],
      lastUpdated: {
        text: 'Updated',
        formatOptions: {
          dateStyle: 'timeago',
        },
      },
      layouts: {},
      logo: {src: '/images/icon.svg', width: 24, height: 24},
      nav: [],
      sidebar: {},
      sidebarEnder,
      search: {
        provider: 'algolia',
        options: {
          appId: '9S3BH0SKWT',
          apiKey: 'd3db589efd595b115848fc6a654d3263',
          indexName: 'lando',
        },
      },
      sharedNav: sharedNav(),
      socialLinks: [
        {
          icon: 'github',
          link: repo,
        },
        {
          icon: 'x',
          link: 'https://x.com/@devwithlando',
        },
        {
          icon: 'youtube',
          link: 'https://www.youtube.com/channel/UCl_QBNuGJNoo7yH-n18K7Kg',
        },
        {
          icon: {
            svg: '<svg class="shake" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="red" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
          },
          link: 'https://lando.dev/sponsor',
        },
      ],
      sponsors: {
        text: 'your logo?',
        link: 'https://lando.dev/sponsor',
        data: 'https://raw.githubusercontent.com/lando/lando/main/patriots.yaml',
        all: 'https://raw.githubusercontent.com/lando/lando/main/sponsors.yaml',
      },
      tags: {},
      tagLink: undefined,
      team: [],
    },
    vite: {
      optimizeDeps: {exclude: []},
      plugins: [],
      resolve: {alias: []},
      ssr: {noExternal: []},
    },
  };
};

function sharedNav() {
  return [
    {
      text: 'Core',
      items: [
        {
          text: 'Landofile',
          columns: 4,
          items: [
            {
              text: 'Services',
              link: 'https://docs.lando.dev/core/v4/landofile/services.html',
            },
          ],
        },
        {
          text: 'Configuration',
          columns: 3,
          items: [],
        },
        {
          text: 'Plugins',
          columns: 3,
          items: [],
        },
        {
          text: 'Services',
          columns: 2,
          items: [
            {text: 'L-337', link: 'https://docs.lando.dev/core/v4/services/l337.html'},
          ],
        },
      ],
    },
  ];
};
