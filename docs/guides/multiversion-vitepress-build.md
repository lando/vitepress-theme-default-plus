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
* Get some versioning docs in the sidebar.

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


## 4. Sidebar

We use the [Sidebar Ender](../config/config.md#sidebar-ender) to put our version information.

Note that you will want to use `themeConfig.multiVersionBuild.base` and wherever you put the `index` from `#3` :arrow_up: for your links.

```js
// get version info from package.json
const require = createRequire(import.meta.url);
const __dirname = dirname(resolve(fileURLToPath(import.meta.url)));
const {version} = require('../../package.json');

export default defineConfig({
  themeConfig:  {
    sidebarEnder: {
      text: `v${version}`,
      collapsed: true,
      items: [
        {
          text: 'Other Doc Versions',
          items: [
            {text: 'stable', target: '_blank', link: '/v/stable/'},
            {text: 'edge', target: '_blank', link: '/v/edge/'},
            {text: '<strong>see all versions</strong>', link: '/v/'},
          ],
        },
        {
          text: 'Release Notes',
          link: `https://github.com/lando/vitepress-theme-default-plus/releases/tag/v${version}`,
        },
        {
          text: 'Other Releases',
          link: 'https://github.com/lando/vitepress-theme-default-plus/releases',
        },
      ],
    },
  }
});



