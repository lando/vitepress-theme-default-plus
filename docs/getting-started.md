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

## Usage

Add the theme name to your [theme key](https://v2.vuepress.vuejs.org/guide/theme.html#community-theme) in your VuePress 2 config.js:

```js
module.exports = {
  ...
  theme: '@lando/vuepress-theme-default-plus',
  ...
};
```

And configure as usual with `themeConfig`.

```js
module.exports = {
  ...
  theme: '@lando/vuepress-theme-default-plus',
  themeConfig: {
    ...
    docsDir: 'docs',
    docsBranch: 'main',
    navbar: [
      {text: 'GitHub', link: 'https://github.com/lando/vuepress-theme-default-plus/'},
    ],
    ...
  }
  ...
};
```

Check out the [configuration page](./config.md) for the complete set of config options.
