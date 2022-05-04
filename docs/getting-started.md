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

::: danger MUST USE VUEPRESS 2.0.0-beta.40+
Due to breaking changes introduced in [vuepress@2.0.0-beta.40](https://github.com/vuepress/vuepress-next/blob/main/CHANGELOG.md#200-beta40-2022-04-25) you *must* update to at least that version to use this theme. If you cannot update VuePress for whatever reason then use version 1.0.0-beta.30 or lower of this thene,
:::

## Usage

Import the theme directly to your [theme key](https://v2.vuepress.vuejs.org/guide/theme.html#community-theme) in your VuePress 2 `config.js` and pass the config into the theme function.

```js
const powerTheme = require('@lando/vuepress-theme-default-plus');

module.exports = {
  ...
  theme: powerTheme({
    ...
    docsDir: 'docs',
    docsBranch: 'main',
    navbar: [
      {text: 'GitHub', link: 'https://github.com/lando/vuepress-theme-default-plus/'},
    ],
    ...
  }),
  ...
};
```

Check out the [configuration page](./config.html) for the complete set of config options.
