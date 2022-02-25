---
description: Learn the configuration options for VuePress2 Default Theme Plus.
---

# Configuration

This theme _extends_ the [VuePress2 Default Theme](https://v2.vuepress.vuejs.org/reference/default-theme/config.html#basic-config) but sets [slightly different defaults](https://github.com/lando/vuepress-theme-default-plus/blob/main/lib/defaults.js). _Theoretically_ all the options supported in the default theme should also be available in this one.

Here are the additional configuration options that we've added.

## Generic Config

#### autoPopulate

* Type: `Boolean`

* Default: `false`

* Details:

  This will attempt to grab information about your project using `repo`. **Currently only GitHub repos are supported.**

* Requirements:

  This requires you also set `repo`.


#### alias

* Type: `Object`

* Default: `{}`

* Details:

  This allows the user to override any downstream components with their own. See [https://v2.vuepress.vuejs.org/advanced/cookbook/making-a-theme-extendable.html#component-aliases].

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

  This allows external links to the specified `baseUrl` to be experentially treated like internal links. This is useful if you have multiple  VuePress sites that are all tied together into a single domain experient a la Netlify's rewrite functionality.

  If you don't understand what that is or you only have a single docs site then its best to just ignore this one.

#### canonicalUrl

* Type: `String`

* Default: `null`

* Example: `canonicalUrl: "https://vuepress-theme-default-plus.lando.dev"`

* Details:

  Set this if you care about the theme automatically generating common metatags with URL data.


#### ga

* Type: `Object`

* Default:

  ```yaml
  enabled: true
  id: null
  ```

* Details:

  Set if you want to hookup Google Tag stuff

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

  This prepends a bunch of entries to the usual `navbar` and follows the same format. It is usually used in combination with `baseUrl` to bring its "treat like internal link" functionality to the `navbar`.


## Sidebar Header

#### sidebarHeader

* Type: `Object`

* Default:

  ```js
  sidebarHeader: {
    enabled: false,
    icon: null,
    title: null,
    version: null,
    versionLink: null,
  }
  ```

* Example:

  ```js
  sidebarHeader: {
    enabled: true,
    title: 'Current Version',
  },
  ```

* Details:

  `sidebarHeader` allows you to give greater context and organization around the secondary sidebar menu. This is particularly useful if you have a single site that combines the docs of many projects together.

  It is best used when `autopopulate` is set to `true` because this will automatically set both `sidebarHeader.version` and `sidebarHeader.versionLink` unless they are set directly in the config.

  `sidebarHeader.icon` is optional and puts the specificed icon to the left of the title.


## Contributors Page

#### page.contributors

* Type: `Object`

* Default:

  ```js
  pages: {
    contributors: {
      enabled: true,
      content: fs.readFileSync(path.resolve(__dirname, '..', 'pages', 'contributors.md')),
      data: [],
      link: '/contributors.html',
      title: 'Contributorz',
    },
  },
  ```

* Details:

This will automatically generate a page of contributors based on the `data`. It is best used when `autopopulate` is set to `true` as this will automatically fill `data`.

The `content`, `link` and `title` are all editable.

## Versions Page

#### page.versions

* Type: `Object`

* Default:

  ```js
  pages: {
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
  ```

* Details:

This will automatically generate a page of previous versions of the docs based on the `data`. It is best used when `autopopulate` is set to `true` as this will automatically fill `data`.

The `content`, `link` and `title` are all editable. You can also choose to _not_ trim the latest version of the docs or _not_ show the link to the latest version of the docs.

## Search

#### search

* Type: `Object`

* Default:

  ```js
  search: {
    enabled: false,
  },
  ```

* Example:

  ```js
  search: {
    enabled: true,
    apiKey: '15e332feefe9ec96929f44c62f6c88',
    indexName: 'lando',
  },
  ```

* Details:

Set `enable: true` to turn on the default search functionality. If you wish to leverage [Docsearch](https://docsearch.algolia.com/) then you also need to pass in an `apiKey` and `indexName`.

Note that if you want to search across many sites that operate under a single domain then you will also need to set the `baseUrl`.

## Social

#### social

* Type: `Object`

* Default:

  ```js
  social: {
    enabled: false,
    icons: [],
    owner: null,
  },
  ```

* Example:

  ```js
  social: {
    enabled: true,
    owner: '@devwithlando',
    icons: [{
      title: 'Twitter',
      svg: {
        path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z',
      },
      link: 'https://twitter.com/devwithlando',
    },
  ```

## Sponsors

#### sponsors

* Type: `Object`

* Default:

  ```js
  sponsors: {
    enabled: false,
    data: [],
  },
  ```

* Example:

  ```js
  sponsors: {
    enabled: true,
    data: yaml.load(fs.readFileSync(path.resolve(__dirname, '..', '..', 'sponsors.yml'), 'utf8')),
  },
  ```

* Metadata format

  ```yaml
  - name: Lando
    id: 1
    url: https://lando.dev
    logo: https://docs.lando.dev/images/logo-pink-small.png
  ```

## Carbon Ads

#### carbonAds

* Type: `Object`

* Default:

  ```js
  carbonAds: {
    enabled: true,
    placement: 'landodev',
    serve: 'CE7DCKJU',
  },
  ```
