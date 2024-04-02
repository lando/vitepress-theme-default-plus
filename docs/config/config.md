---
summary: Learn the configuration options for VitePress Default Theme Plus.
---

# Configuration

This theme _extends_ the [VitePress Default Theme](https://vitepress.dev/) but sets [slightly different defaults](https://github.com/lando/vitepress-theme-default-plus/blob/main/config/defaults.js). _Theoretically_ all the options supported in the default theme should also be available in this one.

Before you get started its _**HEAVILY RECOMMENDED**_ that you use our parent [config wrapper](../usage.html#vitepress-config-mjs).

Once you have you should be able to use all the things below.

## Alert

* Type: `Object || Boolean`

* Default: `false`

* Example:

  ```js
  alert: {
    content: 'Are you looking for the 3.x docs? You can go to them <a href="/3.x">here</a>.',
    type: 'tip',
    closeable: true,
  },
  ```

* Details:

  This will print an alert at the top of the page. You can pass in `<HTML>` content but _dangerous things_ will be stripped.

  Setting `closeable` to false will persist the alert and not let the user dismiss it.

  You can set a `type` for the alert which will append the `alert-TYPE` class to the alert container eg `alert-success`. We have provided the following types by default: `brand|danger|tip|info|success|warning`.

  If you specify a different type you will want to make sure to provide the `alert-TYPE` class.

  You can also configure the `alert` height with the `--vpl-alert-height` css variable.

  You can also configure this on a page to page basis with [frontmatter](./frontmatter.md#alert).

## Autometa

* Type: `Object || Boolean`

* Default: `false`

* Example:

  ```js
  autometa: {
    canonicalUrl: 'https://vuepress-theme-default-plus.lando.dev/',
    image: 'https://docs.lando.dev/images/logo.svg',
    twitter: '@devwithlando',
    x: '@devwithlando',
  },
  ```

* Details:

  Set this if you care about the theme automatically generating common metatags.

  You can use `twitter` instead of `x` if you prefer although `x` will be preferred if you set both.`

  `image` will set a global image for all meta and you can set `frontmatter.image` to customize on a per page basis.

## Containers

* Type: `Object || Boolean`

* Default:

  ```js
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
  ```

* Example:

  ```js
  containers: {
    brand: {defaultTitle: 'ACME BRAND'},
    special: {},
  },
  ```

* Details:

  If you want to override one of the default containers or add additional ones, you can.

  Note that it is up to you to define any relevant `css` needed for new containers but you should be able to use your
  new containers in markdown. Here is how you would use the `special` container added above:

  **MARKDOWN**
  ```md
  ::: special EVERYTHING MUST GO!
  99% OFF!
  :::
  ```

  **HTML**
  ::: special EVERYTHING MUST GO!
  99% OFF!
  :::

## Collections

* Type: `Object || Boolean`

* Default:

  ```js
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
  ```

* Details:

  Collections allow you to groups different docs together. The main piece of this is being able to set default `frontmatter` for all docs that fit the given `patterns`.

  You can optionally set an `icon` and its `iconLink`.

## Contributors

* Type: `Object || Boolean`

* Default: `true`

* Example:

  ```js
  contributors: {
    merge: 'name',
    debotify: true,
    exclude: [
      'Mike Pirog <mike@kalamuna.com>',
      {
        name: 'Mike Pirog',
        email: 'mike@kalamuna.com',
      }
    ],

    //
    include: [
      // include alec with 1 commit
      'Alec Reynolds <alec@lando.dev>'
      // include alec with 17 commits
      '17 Alec Reynolds <alec@lando.dev>',
      // include alec with ALL AVAILABLE metadata
      {
        avatar: 'https://avatars.githubusercontent.com/u/1153738',
        name: 'Alec Reynolds',
        commits: 9999,
        email: 'alec@lando.dev',
        title: 'Maintainer',
        mergeOnly: true,
        mergeWith: 'alec+git@lando.dev',
        org: 'Lando',
        orgLink: 'https://lando.dev',
        desc: 'A chill dude',
        links: [
          {icon: 'github', link: 'https://github.com/reynoldsalec'},
          {icon: 'twitter', link: 'https://twitter.com/reynoldsalec'},
        ],
        sponsor: 'https://lando.dev/sponsor',
      },
    ]
  },
  ```

* Details:

  This will add `git log` author information to each page and will also serve as the default `members` property in `<VPLTeamMembers>`.

  You can set to `false` to disable or `true` to use the defaults. You can expand into an object to customize the behavior as in example above.

  You can attempt to dedupe/merge/combine with either `merge: name` or `merge: email` or disable with `merge: false`.

  If you `debotify` it will remove any author that contains `[bot]` in their name or email.

  You can `exclude` with contributors by matching _both_ their `name` and `email` using either a `string` or `object`.

  You can use `include` to either _add_ new contributors or _augment_ existing ones. If you want to add additional data to a contributor pulled from the `git log` you will need to specify an `email` for it to match against.

  Finally, `mergeOnly` can be set if you only want to provide augmented data for a contributor that already exists in the `git log`, if you want to be explicit about the `git log` contributor you want to augment you can use `mergeWith` and specify their `git.email`.

  You can also configure this on a page to page basis with [frontmatter](./frontmatter.md#contributors).

## Feeds

* Type: `Object || Boolean`

* Default: `false`

* Example:

  ```js
  feed: {
    patterns: '*/**/*.md',
  },
  ```

* Full Example:

  ```js
  feeds: {
    feed: {
      patterns: ['/docs/*.md'],
    },
    blog: {
      baseUrl: 'https://vitepress-theme-default-plus.lando.dev/',
      copyright: '© 2024 Lando'
      description: 'Do you have a need to feed?',
      file: 'bloggy.rss',
      image: 'https://sm.ign.com/ign_za/photo/3/31-best-lo/31-best-lord-of-the-rings-quotes_z4n9.jpg',
      language: 'en',
      favicon: 'https://vitepress-theme-default-plus.lando.dev/favicon.ico',
      patterns: ['/blog/**/*.md', '/posts/**/*.md'],
      title: 'FEED ME BLOG!',
    }
  },
  ```

* Details:

  You can specify a single `feed` or many `feeds` and their `patterns` or `pattern`. If you use both the plural will be used over the singular.

  If you do not specify a `file` then the key of the `feed` will be used eg `feed.rss` in the Full Example above.

  We will attempt to compute the `baseUrl` using other configuration but it's probably best if you just explicitly set it for each feed.

## Internal Domains

* Type: `String || Array[String]`

* Default: `[]`

* Example:

  ```js
  internalDomains:
    - 'http://docs.lando.dev'
    - 'https://docs.lando.dev'
  ```

* Details:

  This allows external links _starting with_ the specified `internalDomains` to be experentially treated like internal links.

  This is useful if you have multiple VitePress sites that are all tied together into a single domain experience a la Netlify's rewrite functionality.

  If you don't understand what that is or you only have a single docs site then its best to just ignore this one.

## Jobs

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
* Details:

  * You can also configure this on a page to page basis with [frontmatter](./frontmatter.md#jobs).

## Navbar

* Type: `Array[Object]`

* Example:

  ```js
  navbar: [
    ...
    {
      text: 'Recipes',
      items: [
        {
          text: 'Hosting Integrations',
          columns: 2,
          items: [
            {
              text: 'Acquia',
              link: 'https://docs.lando.dev/acquia',
            },
            {
              text: 'Lagoon (beta)',
              link: 'https://docs.lando.dev/lagoon',
              alert: 'UPDATED!'
            },
            {
              text: 'Pantheon',
              link: 'https://docs.lando.dev/pantheon',
            },
            {
              text: 'Platform.sh (beta)',
              link: 'https://docs.lando.dev/platformsh',
              alert: {
                text: 'DEPRECATED!',
                type: 'danger',
                expires: 4125485593000,
              },
            },
          ],
        },
        {
          text: 'PHP Frameworks',
          items: [
            {
              text: 'Backdrop',
              link: 'https://docs.lando.dev/backdrop',
            },
          ],
        },
        ...
      },
    ]
  ```

* Details:

  Note that `columns` currently only works with "items" eg children that are expressed in "sections" as in the example above.

  You can add the optional `alert` to any child item. This will add a stylized and expiring badge before the link with text of your choosing. If you make `alert` a `string` it will use that as the badge text. If you make `alert` an `object` you can also customize the style and the expiration date of the alert.

  `alert` can be styled with setting `alert.type` to `new`, `updated`, `deprecated` or `eol`. You can also use any of the [admonition](../markdown/admonitions.md) or [box](../markdown/admonitions.md) stylings

  You can automatically remove the alert at given time by setting `alert.expires` which must be expressed as a timestamp in milliseconds.

  If a top level menu item contains any children with `alerts` of type `new` then an alert circle will appear in front of that menu item as a circle colored with the theme's primary color.

## Layouts

* Type: `Object`

* Default:

  ```js
  layouts: {}
  ```

* Example:

  ```js
  layouts: {
    cats: './components/VPLCats.vue',
  },
  ```

* Details:

  `layouts` allows you to easily add additional [Custom Layouts](https://vitepress.dev/reference/default-theme-layout#custom-layout). You can then use those layouts in frontmatter like this one using the example from above.

  Note that if you specify a relative path it is relative from the theme root.

  ```md
  ---
  layout: cats
  ---
  ```

  Here is [an example](/cats) of a page using our `cats` layout.

## Robots.txt

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
    host: 'https://vite-theme-default-plus.lando.dev/',
    sitemap: 'https://vite-theme-default-plus.lando.dev/sitemap.xml',
    disallowAll: false,
    allowAll: false,
    policies: [
      {
        userAgent: '*',
        disallow: [
          '/user/',
          '/login',
        ],
        allow: [
          '*.js',
          '*.png',
        ],
      },
    ],
  },
  ```

* Details:

If `disallowAll` is set to `true`, it will ignore all other options and exclude everything on the site from indexing. `allowAll` is set to `true` by default and this ignores the `policies` option.

To use the `policies` option, make sure both `disallowAll` and `allowAll` are set to `false`.

You can specify `host` and `sitemap` directly. If you omit them the theme will attempt to set them if it can and it makes sense.

## Sidebar Ender

* Type: `Object || Boolean`

* Default:

  ```js
  sidebarEnder: false
  ```

* Example:

  ```js
  sidebarEnder: {
    text: 'v1.0.0',
    collapsed: true,
    items: [
      {text: 'Release Notes', link: 'https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0'},
      {text: 'Older Versions', link: 'https://github.com/lando/vitepress-theme-default-plus/releases'},
    ],
  },
  ```

* Details

  This takes a *single* sidebar menu item and renders it at the bottom of the sidebar.

## Sponsors

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

* Details

  You can also configure this on a page to page basis with [frontmatter](./frontmatter.md#sponsors).

  You can also set `data` to a `url` and the theme will fetch its contents. By default it will expect `json` however you can also load `yaml` if the url ends in `.yaml` or `.yml` as it does in `https://raw.githubusercontent.com/lando/lando/main/sponsors.yaml`.

  This is useful if you have a single source of truth for your sponsorships that are external to your theme and you want updates to that truth to be reflected in real time. If this is not the case we recommend setting `data` directly with the information you need.

## Tags

* Type: `Object`

* Default: `{}`

* Example:

  ```js
  tags: {
    'obscure': {
      color: 'var(--vp-c-purple-1)',
      styles: {
        color: 'var(--vp-c-white)',
      },
      icon: '',
    },
    'secret tag': {
      color: '#C0FFEE',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-6 3.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM7.293 5.293a1 1 0 1 1 .99 1.667c-.459.134-1.033.566-1.033 1.29v.25a.75.75 0 1 0 1.5 0v-.115a2.5 2.5 0 1 0-2.518-4.153.75.75 0 1 0 1.061 1.06Z" clip-rule="evenodd" /></svg>',
      link: '/secret',
      styles: {
        color: '#BA11AD',
      },
    },
    'tag 2': {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M11.5 8a3.5 3.5 0 0 0 3.362-4.476c-.094-.325-.497-.39-.736-.15L12.099 5.4a.48.48 0 0 1-.653.033 8.554 8.554 0 0 1-.879-.879.48.48 0 0 1 .033-.653l2.027-2.028c.24-.239.175-.642-.15-.736a3.502 3.502 0 0 0-4.476 3.427c.018.99-.133 2.093-.914 2.7l-5.31 4.13a2.015 2.015 0 1 0 2.828 2.827l4.13-5.309c.607-.78 1.71-.932 2.7-.914L11.5 8ZM3 13.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" /></svg>',
    },
  },
  ```

* Details:

  If you would like to customize the appearance of collection item `tags` you [set in frontmatter](./frontmatter#tags) you can do so. Note that you can free tag by default. You _do not_ need to set this to use tags. It is _only_ to customize the appearance of the tags.

  `color` will set the `background-color` of the `tag`.

  `styles` will take any `css` style and will be applied on top of whatever you set for `color`.

  `icon` is an `svg` string.

  `link` will override the default `tagLink`.

## Tag Link

* Type: `String`

* Default: `undefined`

* Example:

  ```js
  tagLink: `/tags/:tag`
  ```

* Details:

  This sets a default URL pattern for each tag. Here are some tokens you can use in your pattern.

  ```md
  # for a tag called "My Special Tag"
  :tag -> My Special Tag
  :tag-id -> my-special-tag
  ```

  You can override the `tagLink` on a per-tag basis using the [tags](#tags) `.link` property. Note that if you use `-` in your tag names and also use `:tag-id` you may get some unexpected behavior.

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
