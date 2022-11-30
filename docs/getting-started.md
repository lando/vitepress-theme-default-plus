---
description: Learn how to install and get started with VuePress 2 Default Theme Plus!
---

# Getting Started

## Installation

To start you should install the theme into your VuePress 2 site with either `yarn` or `npm`.

:::: code-group
::: code-group-item YARN
```bash:no-line-numbers
yarn add @lando/vuepress-theme-default-plus --dev
```
:::
::: code-group-item NPM
```bash:no-line-numbers
npm install @lando/vuepress-theme-default-plus --save-dev
```
::::

::: danger MUST USE VUEPRESS 2.0.0-beta.53
VuePress 2.0.0 is currently in `beta` and as such is currently still introducing [many breaking changes](https://github.com/vuepress/vuepress-next/blob/main/CHANGELOG.md). For that reason you *must* use version 2.0.0-beta.53 with the current version of this theme.

**THIS MEANS YOU LIKELY WILL NEED TO UPDATE YOUR SUBTHEME TO ACCOMMODATE THE BREAKING CHANGES!.**
:::

## Usage

Import the theme directly to your [theme key](https://v2.vuepress.vuejs.org/guide/theme.html#community-theme) in your VuePress 2 `config.js` and pass the config into the theme function.

```js
import {defineUserConfig} from '@vuepress/cli';
import {defaultThemePlus} from '@lando/vuepress-theme-default-plus';

export default defineUserConfig({
  ...
  theme: defaultThemePlus({
    ...
    docsDir: 'docs',
    docsBranch: 'main',
    navbar: [
      {text: 'GitHub', link: 'https://github.com/lando/vuepress-theme-default-plus/'},
    ],
    ...
  }),
  ...
});
```

Check out the [configuration page](./config.html) for the complete set of config options.
