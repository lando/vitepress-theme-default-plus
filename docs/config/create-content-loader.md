---
description: Learn about the VitePress Default Theme + createContentLoader util.
---

# createContentLoader

If you are doing any [build-time data loading](https://vitepress.dev/guide/data-loading) we have a wrapper for `createContentLoader` which you can use instead of the [default one](https://vitepress.dev/guide/data-loading#createcontentloader).

It works *more-or-less* the same way but you *should* pass in the `siteConfig` as part of the options as below:

```js
import createContentLoader from '@lando/vitepress-theme-default-plus/ccl';

const siteConfig = globalThis.VITEPRESS_CONFIG;

export default createContentLoader('posts/*.md', {siteConfig});
```
