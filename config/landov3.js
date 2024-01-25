import {readFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default function({landoPlugin}) {
  const baseUrl = landoPlugin ? `https://docs.lando.dev/${landoPlugin}` : 'https://docs.lando.dev';
  const repo = landoPlugin ? `https://github.com/lando/${landoPlugin}` : 'https://github.com/lando';
  const base = `/${landoPlugin}/` ?? '/';

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
      sidebarEnder: false,
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
          icon: 'twitter',
          link: 'https://twitter.com/@devwithlando',
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
      sponsors: {
        text: 'your logo?',
        link: 'https://lando.dev/sponsor',
        data: yaml.load(readFileSync(resolve(__dirname, '..', 'sponsors.yml'), 'utf8')),
      },
      team: [],
    },
    vite: {
      resolve: {alias: []},
      plugins: [],
    },
  };
};

function sharedNav() {
  return [
    {
      text: 'Getting Started',
      link: 'https://docs.lando.dev/getting-started/',
    },
    {
      text: 'CLI',
      link: 'https://docs.lando.dev/cli/',
    },
    {
      text: 'Core',
      items: [
        {
          text: 'Landofile',
          columns: 3,
          items: [
            {text: 'Basics', link: 'https://docs.lando.dev/core/v3/index.html'},
            {text: 'Services', link: 'https://docs.lando.dev/core/v3/services.html'},
            {text: 'Recipes', link: 'https://docs.lando.dev/core/v3/recipes.html'},
            {text: 'Tooling', link: 'https://docs.lando.dev/core/v3/tooling.html'},
            {text: 'Proxy', link: 'https://docs.lando.dev/core/v3/proxy.html'},
            {text: 'Events', link: 'https://docs.lando.dev/core/v3/events.html'},
          ],
        },
        {
          text: 'Configuration',
          columns: 2,
          items: [
            {text: 'Global', link: 'https://docs.lando.dev/core/v3/index.html'},
            {text: 'Environment', link: 'https://docs.lando.dev/core/v3/env.html'},
            {text: 'Experimental', link: 'https://docs.lando.dev/core/v3/experimental.html'},
            {
              text: 'Orchestrator',
              link: 'https://docs.lando.dev/core/v3/orchestrator.html',
              alert: {
                expires: 1697299993000,
                type: 'new',
                text: 'NEW!',
              },
            },
            {text: 'Performance', link: 'https://docs.lando.dev/core/v3/performance.html'},
            {text: 'Plugins', link: 'https://docs.lando.dev/core/v3/plugins.html'},
            {text: 'Releases', link: 'https://docs.lando.dev/core/v3/releases.html'},
            {text: 'Security', link: 'https://docs.lando.dev/core/v3/security.html'},
            {text: 'SSH', link: 'https://docs.lando.dev/core/v3/ssh.html'},
            {text: 'Shared Files', link: 'https://docs.lando.dev/core/v3/files.html'},
          ],
        },
        {
          text: 'Plugins',
          columns: 2,
          items: [
            {
              text: 'Healthcheck',
              link: 'https://docs.lando.dev/core/v3/healthcheck.html',
              alert: {
                expires: 1697299993000,
                type: 'new',
                text: 'NEW!',
              },
            },
            {text: 'Networking', link: 'https://docs.lando.dev/core/v3/networking.html'},
            {text: 'Scanner', link: 'https://docs.lando.dev/core/v3/scanner.html'},
          ],
        },
        {
          text: 'Services',
          columns: 2,
          items: [
            {
              text: 'Lando',
              link: 'https://docs.lando.dev/core/v3/lando-service.html',
              alert: {
                expires: 1697299993000,
                type: 'new',
                text: 'NEW!',
              },
            },
          ],
        },
      ],
    },
    {
      text: 'Recipes',
      items: [
        {
          text: 'Hosting Integrations',
          columns: 2,
          items: [
            {text: 'Acquia', link: 'https://docs.lando.dev/acquia'},
            {text: 'Lagoon (beta)', link: 'https://docs.lando.dev/lagoon'},
            {text: 'Pantheon', link: 'https://docs.lando.dev/pantheon'},
            {text: 'Platform.sh (beta)', link: 'https://docs.lando.dev/platformsh'},
          ],
        },
        {
          text: 'PHP Frameworks',
          columns: 2,
          items: [
            {text: 'Backdrop', link: 'https://docs.lando.dev/backdrop'},
            {text: 'Drupal', link: 'https://docs.lando.dev/drupal'},
            {text: 'Joomla', link: 'https://docs.lando.dev/joomla'},
            {text: 'Laravel', link: 'https://docs.lando.dev/laravel'},
            {text: 'Symfony', link: 'https://docs.lando.dev/symfony'},
            {text: 'WordPress', link: 'https://docs.lando.dev/wordpress'},
          ],
        },
        {
          text: 'Stacks',
          columns: 2,
          items: [
            {text: 'LAMP', link: 'https://docs.lando.dev/lamp'},
            {text: 'LEMP', link: 'https://docs.lando.dev/lemp'},
            {text: 'MEAN', link: 'https://docs.lando.dev/mean'},
          ],
        },
      ],
    },
    {
      text: 'Runtimes',
      items: [
        {
          text: 'Application Languages',
          columns: 2,
          items: [
            {text: 'dotnet', link: 'https://docs.lando.dev/dotnet'},
            {text: 'Go', link: 'https://docs.lando.dev/go'},
            {text: 'node', link: 'https://docs.lando.dev/node'},
            {text: 'PHP', link: 'https://docs.lando.dev/php'},
            {text: 'Python', link: 'https://docs.lando.dev/python'},
            {text: 'Ruby', link: 'https://docs.lando.dev/ruby'},
          ],
        },
        {
          text: 'General Purpose / DIY',
          columns: 2,
          items: [
            {text: 'Lando', link: 'https://docs.lando.dev/core/v3/lando-service.html'},
          ],
        },
      ],
    },
    {
      text: 'Services',
      items: [
        {
          text: 'Databases',
          columns: 4,
          items: [
            {text: 'MariaDB', link: 'https://docs.lando.dev/mariadb'},
            {text: 'MongoDB', link: 'https://docs.lando.dev/mongo'},
            {text: 'MSSQL', link: 'https://docs.lando.dev/mssql'},
            {text: 'MySQL', link: 'https://docs.lando.dev/mysql'},
            {text: 'PostgreSQL', link: 'https://docs.lando.dev/postgres'},
          ],
        },
        {
          text: 'Caches',
          columns: 4,
          items: [
            {text: 'Memcached', link: 'https://docs.lando.dev/memcached'},
            {text: 'redis', link: 'https://docs.lando.dev/redis'},
            {text: 'Varnish', link: 'https://docs.lando.dev/varnish'},
          ],
        },
        {
          text: 'Indexes',
          columns: 4,
          items: [
            {text: 'Elasticsearch', link: 'https://docs.lando.dev/elasticsearch'},
            {text: 'Solr', link: 'https://docs.lando.dev/solr'},
          ],
        },
        {
          text: 'Web Servers',
          columns: 4,
          items: [
            {text: 'Apache', link: 'https://docs.lando.dev/apache'},
            {text: 'nginx', link: 'https://docs.lando.dev/nginx'},
            {text: 'tomcat', link: 'https://docs.lando.dev/tomcat'},
          ],
        },
        {
          text: 'Dev Tools',
          columns: 4,
          items: [
            {text: 'MailHog', link: 'https://docs.lando.dev/mailhog'},
            {text: 'PhpMyAdmin', link: 'https://docs.lando.dev/phpmyadmin'},
          ],
        },
        {
          text: 'General Purpose / DIY',
          columns: 2,
          items: [
            {
              text: 'Lando',
              link: 'https://docs.lando.dev/core/v3/lando-service.html',
              alert: {
                expires: 1697299993000,
                type: 'new',
                text: 'NEW!',
              },
            },
            {
              text: 'Compose',
              link: 'https://docs.lando.dev/compose',
              alert: {
                expires: 1697299993000,
                type: 'deprecated',
                text: 'DEPRECATED!',
              },
            },
          ],
        },
      ],
    },
  ];
};
