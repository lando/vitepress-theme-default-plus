---
title: Setting Up Multiversion Build
description: Learn how to easily configure your site for multi version build
guide: true
tag:
  - build
  - secret tag
---

# Setting up multiversion build

Here are some steps to:

* Build multiple versions of your docs
* Get a nice index page listing them
* Get some versioning docs in the sidebar
* Speed up builds with caching

There are what we do to set up the multiversion build for this site eg this is an example and **YMMV**.

## 1. Configuration

Start by setting up `mvb` in your `themeConfig`.

```js
export default defineConfig({
  themeConfig:  {
    multiVersionBuild: {
      build: 'stable',
      match: 'v[0-9].*',
      base: '/v/',
      satisfies: '>=1.0.0-beta.42',
    },
  }
});
```

This will build the `stable` version of your docs into `siteConfig.base`. It will also build a version for each `git` tag that matches `v[0-9].*` and is above or equal to `1.0.0-beta.42` into the `/v/` directory relative to your `siteConfig.base` eg `/v/v1.0.0-beta.42`.

You can get more info on the above options [over here](../config/config.md#multiversion-build).

## 2. Build

You will want to update your build process from something like `npx vitepress build docs` to `npx mvb docs`. For example we modified our `netlify.toml`

```toml
[build]
  base = "./"
  publish = "docs/.vitepress/dist/"
  command = "vitepress build docs" // [!code --]
  command = "npx mvb docs"  // [!code ++]
```

You can get more detail on the `mvp` command [over here](../build/multiversion-vitepress-build.md).

## 3. Index

We've found it's good to put a version `index.md` at the root of `themeConfig.multiVersionBuild.base`. This is what ours looks like:

**./v/index.md**

```md
---
description: All Other documentation versions
title: Docuverse
contributors: false
lastUpdated: false
editLink: false
next: false
---

<!--@include: ./../v/index.md-->
```

Note that `useTags()` has additional exportables you can read more about [here](../composables/use-tags.md).

Also note that `VPLVersionLink` does not normalize `:href` to the site base which is by design to aid in navigating between versions.

## 4. Sidebar

We use the [Sidebar Ender](../config/config.md#sidebar-ender) to put our version information and version index page in the sidebar.

Consider the following example:

```js
import {createRequire} from 'module';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {default as isDevRelease} from '@lando/vitepress-theme-default-plus/is-dev-release';

import {defineConfig} from '../../config';

const require = createRequire(import.meta.url);
const __dirname = dirname(resolve(fileURLToPath(import.meta.url)));

// get version info
const {version} = require('../../package.json');

const sidebarEnder = {
  text: `v${version}`,
  collapsed: true,
  items: [
    {
      text: 'Other Doc Versions',
      items: [
        {rel: 'mvb', text: 'stable', target: '_blank', link: '/v/stable/'},
        {rel: 'mvb', text: 'edge', target: '_blank', link: '/v/edge/'},
        {text: '<strong>see all versions</strong>', link: '/v/'},
      ],
    },
    {text: 'Other Releases', link: 'https://github.com/lando/vitepress-theme-default-plus/releases'},
  ],
};

// if version is a stable or edge release then add in the release notes
if (!isDevRelease(version)) {
  sidebarEnder.items.splice(1, 0, {
    text: 'Release Notes',
    link: `https://github.com/lando/vitepress-theme-default-plus/releases/tag/v${version}`,
  });
}

export default defineConfig({
  themeConfig:  {
    sidebarEnder,
  },
});
```

There are a few things above to note:

* `isDevRelease` can be imported from `@lando/vitepress-theme-default-plus/is-dev-release` and is helpful to generate different things based on the type of release. For example, we use it to add an extra "Release Notes" link for all non-developement releases.
* `{rel: 'mvb'}` is a special thing exclusive to this theme that will tell the theme to treat the links as `absolute` instead of as normalized to `siteConfig.base`. This is the same behavior as `VPLVersionLink` in `#3` above and similarly is to help with navigating between the versions.
* You will want to use `themeConfig.multiVersionBuild.base` and wherever you put the `index` from `#3` :arrow_up: for your links.

## 5. Caching

By default successful builds will cache in `${siteConfig.cacheDir}/@lando/mvb`.

However, if you are using an ephemeral build or testing environment a la GitHub Actions you may need to configure the cache to persist across rebuilds.

:::tip NETLIFY
If you are using Netlify to deploy your docs then caching will be configured and working by default!
:::

For example we use `@actions/cache` to speed up our `mvb` test builds by caching `docs/.vitepress/cache/@lando/mvb` as in the below example:

```yaml
uses: actions/cache@v4
with:
  key: lando-mvb
  path: docs/.vitepress/cache/@lando/mvb
  save-always: true
```

