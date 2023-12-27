---
summary: Learn the configuration options for VuePress2 Default Theme Plus.
---

# Configuration

This theme _extends_ the [VuePress2 Default Theme](https://v2.vuepress.vuejs.org/reference/default-theme/config.html#basic-config) but sets [slightly different defaults](https://github.com/lando/vuepress-theme-default-plus/blob/main/config). _Theoretically_ all the options supported in the default theme should also be available in this one.

Before you get started its _**HEAVILY RECOMMENDED**_ that you set the following parent config before proceeding. Here is what we set for the repo that generates these docs:

```js
import {defineUserConfig} from '@vuepress/cli';
import {defaultThemePlus} from '@lando/vuepress-theme-default-plus';

export default defineUserConfig({
  ...
  theme: defaultThemePlus({
    docsDir: 'docs',
    docsBranch: 'main',
    repo: 'lando/vuepress-theme-default-plus',
  }),
  ...
});
```

And here is our special config:

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

## Contributors Page

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
    cats: VPLLayoutWCats,
  },
  ```

* Details:

  `layouts` allows you to easily add additional [Custom Layouts](https://vitepress.dev/reference/default-theme-layout#custom-layout). You can then use those layouts in frontmatter like this one using the example from above.

  ```md
  ---
  layout: cats
  ---
  ```

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
    satisfies: null,
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
    satisfies: '>0.9',
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

  You can also specify `satisfies` which is a [semver](https://github.com/npm/node-semver) comparision string. This will only show the satisfied subset of `data.name` versions.


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
