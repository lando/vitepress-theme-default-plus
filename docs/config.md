---
summary: Learn the configuration options for VuePress2 Default Theme Plus.
---

# Configuration

This theme _extends_ the [VuePress2 Default Theme](https://v2.vuepress.vuejs.org/reference/default-theme/config.html#basic-config) but sets [slightly different defaults](https://github.com/lando/vuepress-theme-default-plus/blob/main/lib/defaults.js). _Theoretically_ all the options supported in the default theme should also be available in this one.

Before you get started its _**HEAVILY RECOMMENDED**_ that you set the following parent config before proceeding. Here is what we set for the repo that generates these docs:

```js
const powerTheme = require('@lando/vuepress-theme-default-plus');

module.exports = {
  ...
  theme: powerTheme({
    docsDir: 'docs',
    docsBranch: 'main',
    repo: 'lando/vuepress-theme-default-plus',
  }),
  ...
};
```

And here is our special config:

## Generic Config

#### alias

* Type: `Object`

* Default: `{}`

* Details:

  This allows the user to override any downstream components with their own. [See this](https://v2.vuepress.vuejs.org/advanced/cookbook/making-a-theme-extendable.html#component-aliases).

* Example:

  ```js
  alias: {
    '@theme/Home.vue': './Home.vue'),
  },
  ```

#### baseUrl

* Type: `String`

* Default: `null`

* Example: `baseUrl: "https://docs.lando.dev"`

* Details:

  This allows external links to the specified `baseUrl` to be experentially treated like internal links. This is useful if you have multiple VuePress sites that are all tied together into a single domain experient a la Netlify's rewrite functionality.

  If you don't understand what that is or you only have a single docs site then its best to just ignore this one.

#### contributorsExclude

* Type: `Array`

* Default: `[]`

* Example:

  ```js
  contributorsExclude: [
    'Mike Pirog',
    'dependabot[bot]',
  ]
  ```

* Details:

  This allows you to filter out some contributors from where contributors show up eg `CustomPageMeta` and `GuideHeader`. Note that unlike `contributorsPage.exclude` this is **NOT NECCESARILY** a GitHub username so take care to get the contributor name right.

#### defaults

* Type: `Object`

* Default: [Here](https://github.com/lando/vuepress-theme-default-plus/blob/main/config/defaults.js)

* Example:

  ```js
  defaults: {
    ga: {
      id: 'SOME ID',
    },
  }
  ````

* Details:

  This allows you to easily extend this theme with defaults that make more sense for you. This lets you distribute common config to all the things that use it like Google Analytics IDs, shared navbar items, etc.

#### sharedNavbar

* Type: `Array`

* Default: `[]`

* Example:

  ```js
  sharedNavbar: [
    {text: 'GitHub2', link: 'https://github.com/lando/vuepress-theme-default-plus/'},
  ],
  ```

* Details:

  This prepends a bunch of entries to the usual `navbar` and follows the same format. It is usually used in combination with `baseUrl` to bring its "treat like internal link" functionality to the `navbar`. It also is useful if you want to extend this theme deploy a shared navbar

## Autometa

#### autometa

* Type: `Object || Boolean`

* Default: `false`

* Example:

  ```js
  autometa: {
    twitter: '@devwithlando',
    canonicalUrl: 'https://vuepress-theme-default-plus.lando.dev/',
  },
  ```

* Details:

  Set this if you care about the theme automatically generating common metatags.

## Carbon Ads

#### carbonAds

* Type: `Object || Boolean`

* Default:

  ```js
  carbonAds: false
  ```

* Example:

  ```js
  carbonAds: {
    placement: 'landodev',
    serve: 'CE7DCKJU',
  },
  ```

## Contributors Page

#### contributorsPage

* Type: `Object || Boolean`

* Default:

  ```js
  contributorsPage: {
    auto: true,
  },
  ```

* Full Example:

  ```js
  contributorsPage: {
    auto: true,
    repo: 'lando/vuepress-theme-default-plus',
    content: fs.readFileSync(path.resolve(__dirname, 'contributors.md')),
    exclude: [
      'dependabot[bot]',
    ],
    data: [{
      name: 'pirog',
      img: 'https://me.pic',
      link: 'pirog.dev',
      score: 100,
    }],
    docsBranch: 'main',
    docsDir: '',
    link: '/contributors.html',
    title: 'Contributorz',
  },
  ```

* Details:

  This will automatically generate a page of contributors based on the `data`.

  If you set `auto` to `true` and `repo` is a public GitHub repo then the theme will attempt to populate the data for you. However, if you manually set a value then the theme will prefer that. So in the above Full Example the theme will just use `data` instead of what is on GitHub.

  If you do not set `repo`, `docsBranch` and `docsDir` explicitly the theme will use `repo`, `docsBranch`, `docsDir` instead.

## Jobs

#### jons

* Type: `Object || Boolean`

* Default:

  ```js
  jobs: false
  ```

* Example:

  ```js
  jobs: [
    {
      title: 'Lando Developer',
      logo: 'https://docs.lando.dev/images/icon.svg',
      link: 'https://docs.google.com/forms/d/e/1FAIpQLSc2vkesq59BblKo8ZX-R1hKTrHphh1kmsg4FgWV1WH5BKEjHQ/viewform',
      company: 'Lando System Inc',
      aux: 'DC, Remote',
    },
  ],
  ```

## Page Types

#### pageTypes

* Type: `Array || Boolean`

* Default:

  ```js
  pageTypes: [{
    name: 'Guide',
    key: 'guide',
    path: path.resolve(__dirname, '..', 'components', 'Guide.vue'),
  }, {
    name: 'Blog',
    key: 'blog',
    path: path.resolve(__dirname, '..', 'components', 'BlogPost.vue'),
  }],
  ```

* Details:

  `pageType` allows you to easily add additional "custom page components". You can then use those page components by setting the `key` of any of the types to `true` in your frontmatter.

  More concretely and using the example above, which is the default, you can set `blog: true` or `guide: true` in your frontmatter to use either the `Guide` or `BlogPost` components instead of the default `Page` component.


## Reading Mode

#### readMode

* Type: `Object || Boolean`

* Default: `true`

* Example:

  ```js
  readMode: {
    focusName: 'MAKE READING EASIER',
    distractName: 'MAKE READING HARDER',
  },
  ```

* Details:

  Configure the way "Reading Mode" is set up or disable it completely with `false`.

## Robots.txt

#### Robots.txt

* Type: `Object`

* Default:

  ```js
  robots: {
    allowAll: true,
  },
  ```

* Example:

  ```js
  robots: {
    host: 'https://vuepress-theme-default-plus.lando.dev/',
    sitemap: 'https://vuepress-theme-default-plus.lando.dev/sitemap.xml,
    disallowAll: false,
    allowAll: false,
    policies: [
      {
        userAgent: '*',
        disallow: [
          '/user/',
          '/login'
        ],
        allow: [
          '*.js',
          '*.png'
        ]
      }
    ]
  },
  ```

* Details:

If `disallowAll` is set to `true`, it will ignore all other options and exclude everything on the site from indexing. `allowAll` is set to `true` by default and this ignores the `policies` option.

To use the `policies` option, make sure both `disallowAll` and `allowAll` are set to `false`.

You can specify `host` and `sitemap` directly. If you omit them the theme will attempt to set them if it can and it makes sense.

## Search

#### search

* Type: `Object || Boolean`

* Default:

  ```js
  search: false
  ```

* Example:

  `Docsearch`
  ```js
  search: {
    appId: 'BH4D9OD16A',
    apiKey: '15e332feefe9ec96929f44c62f6c88',
    indexName: 'lando',
    searchBase: 'https://docs.lando.dev',
  },
  ```

  `default search`
  ```js
  search: true
  ```

* Details:

Set to `true` to turn on the default search functionality. If you wish to leverage [Docsearch](https://docsearch.algolia.com/) then you also need to pass in an `appId, `apiKey` and `indexName`.

Note that if you want to search across many sites that operate under a single domain then you will also need to set the `searchBase`. If you have not set `searchBase` it will use `baseUrl` instead.

## Sidebar Header

#### sidebarHeader

* Type: `Object || Boolean`

* Default: `false`

* Full Example:

  ```js
  sidebarHeader: {
    auto: true,
    repo: 'lando/vuepress-theme-default-plus',
    icon: './icon.png',
    title: 'Current Version',
    version: null,
    link: null,
  }
  ```

* Details:

  `sidebarHeader` allows you to give greater context and organization around the secondary sidebar menu. This is particularly useful if you have a single site that combines the docs of many projects together.

  If you set `auto` to `true` and `repo` is a public GitHub repo then the theme will attempt to populate the other values for you. However, if you manually set a value then the theme will prefer that. So in the above Full Example the theme will set `version` and `link` automatically but will use `Current Version` for the title.

  If you do not set `repo` explicitly the theme will try to use `repo` instead.

  `icon` is optional and puts the specificed icon to the left of the title.

## Sitemap.xml

#### Sitemap.xml

* Type: `Object`

* Default:

  ```js
  sitemap: true
  ```

* Example:

  ```js
  sitemap: {
    baseUrl: 'https://stuffandthings.com',
    changefreq: 'daily',
    priority: 0.5,
    urls: [
      'stuff.html',
      'things.html,
    ],
    exclude: [
      'badstuff.html'
    ],
  },
  ```
* Details:

If the `baseUrl` above is not specified then the theme will try to use [autometa.canonicalurl](#canonicalurl) and then the [generic.baseUrl](#generic-config). You can also globally set the `changefreq` and `priority` for all pages that do not have them defined in their frontmatter.

You can also add additional urls that may not get picked up in the pages object via `urls`. You can also choose to exclude certain urls via the `exclude` option array as well.

* Frontmatter

You can override the global config for the following options via the frontmatter of any page:

```yaml
---
sitemap:
  exclude: false
  changefreq: hourly
  priority: 1.0
---
```

## Social

#### social

* Type: `Object || Boolean`

* Default:

  ```js
  social: false
  ```

* Example:

  ```js
  social: {
    enabled: true,
    owner: '@devwithlando',
    icons: [{
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
  },
  ```

## Sponsors

#### sponsors

* Type: `Object || Boolean`

* Default:

  ```js
  sponsors: false
  ```

* Example:

  ```js
  sponsors: {
    text: 'your logo?',
    link: 'https://lando.dev/sponsor',
    data: [
      {
        name: 'Pantheon',
        id: 'pantheon',
        url: 'https://pantheon.io/',
        logo: 'https://www.drupal.org/files/Pantheon_logo_black_0.png',
        type: 'full'
      },
    ],
  },
  ```

## Tagging

#### tags

* Type: `Boolean`

* Default: `true`

* Details:

  Tagging is currently not very configurable but you can disable it by setting `tags: false`.

## Tracking

#### ga

* Type: `Object || Boolean`

* Default: `false`

* Example:

  ```js
  ga: {
    id: null,
  }
  ```

* Details:

  Set if you want to hookup Google Tag stuff. `id` needs to be a Measurement ID eg format `G-XXXXXXXXXX`.

#### hubspot

* Type: `Object || Boolean`

* Default: `false`

* Example:

  ```js
  hubspot: {
    id: null,
  }
  ```

* Details:

  Set if you want to hookup Hubspot tracking codes. `id` needs to be the `id` in ` //js.hs-scripts.com/${ID}.js`.

## Versions Page

#### versionsPage

* Type: `Object || Boolean`

* Default:

  ```js
  versionsPage: {
    auto: true,
    trimLatest: true,
    showEdge: true,
  },
  ```

* Full Example:

  ```js
  versionsPage: {
    auto: true,
    repo: 'lando/vuepress-theme-default-plus',
    content: fs.readFileSync(path.resolve(__dirname, 'versions.md')),
    data: [{
      name: '3.1.4',
      href: `https://github.com/pi/pi/tree/3.1.4`,
      target: '_blank',
      rel: 'noopener noreferrer',
    }],
    docsBranch: 'main',
    docsDir: '',
    link: '/versions.html',
    showEdge: false,
    title: 'Previous Versions',
    trimLatest: true,
  },
  ```

* Details:

  This will automatically generate a page of previous versions based on the `data`.

  If you set `auto` to `true` and `repo` is a public GitHub repo then the theme will attempt to populate the data for you. However, if you manually set a value then the theme will prefer that. So in the above Full Example the theme will just use `data` instead of what is on GitHub.

  If you do not set `repo`, `docsBranch` and `docsDir` explicitly the theme will use `repo`, `docsBranch`, `docsDir` instead.

  `trimLatest` will pop off the most recent version. `showEdge` can be either a URL or `true`.
