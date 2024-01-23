---
description: Learn how to help develop and contribute to VitePress Default Theme Plus.
---

# Development

## Requirements

* [Node.js](https://nodejs.org/) version 18 or higher.
* Terminal for accessing VitePress via its command line interface (CLI).
* Text Editor with [Markdown](https://en.wikipedia.org/wiki/Markdown) syntax support.
  * [VSCode](https://code.visualstudio.com/) is recommended, along with the [official Vue extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar).

VitePress can be used on its own, or be installed into an existing project. In both cases, you can install it with:

## Up and Running

```sh
# clone repo and install deps
git clone https://github.com/lando/vitepress-theme-default-plus.git &&
  \ cd vitepress-theme-default-plus &&
  \ npm install

# start dev server
npm run dev
```

## Testing

```sh
npm run test
```

## Building

```sh
# build the static site
npm run build

# preview the static site
npm run preview
```

## Releasing

An actual release to `npm` can be done by [creating a release on GitHub](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository). Pre-releases will deploy to `@edge` tag.

This will also trigger our [prepare release](https://github.com/lando/prepare-release-action) and [auto-deploy](https://github.com/lando/auto-deploy-action) actions.
