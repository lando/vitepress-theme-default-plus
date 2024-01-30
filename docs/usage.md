---
description: Learn how to install and get started with VitePress Default Theme Plus!
---

# Usage

Before starting make sure you are familiar with [the basics](https://vitepress.dev/guide/getting-started#file-structure) of VitePress theme installation.

To start using the theme you will want to create `.vitepress/theme/index.mjs` and `.vitepress/config.mjs` as below:

## .vitepress/theme/index.mjs

```js
import {VPLTheme} from '@lando/vitepress-theme-default-plus';
export default VPLTheme;
```

If you want to extend our theme you should consult the [official docs](https://vitepress.dev/guide/extending-default-theme) on how to best do that.

## .vitepress/config.mjs

Import our `defineConfig` wrapper and pass in hte [configuration](./config/config) you want.

```js
import {defineConfig} from '@lando/vitepress-theme-default-plus/config';

export default defineConfig({
  title: 'VitePress Theme +',
  description: 'The VitePress default theme with some MOARPOWAH!',
  base: '/',
  lang: 'en-US',
  themeConfig: {
    ...
  },
  ...
});
```
