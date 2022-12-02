---
title: Adding page metadata
description: Learn how to add social metatags to your content
guide: true
---

VuePress 2 Default Theme + will automatically add commonly used metatags to your page based on the pages frontmatter, site information and theme configuration.

If you care about this then we recommend  you _at the very least_ set the `canonicalUrl` in the [theme config](./config.html) and set a `description` in the pages frontmatter.

For this page we have the following canoncial theme config and front matter:

`config.js`
```js
const powerTheme = require('@lando/vuepress-theme-default-plus');

module.exports = {
  ...
  theme: powerTheme({
    ...
    canonicalUrl: 'https://vuepress-theme-default-plus.lando.dev',
    ...
  }),
  ...
};
```

`adding-page-metadata.md`
```md
---
title: Adding page metadata
description: Learn how to add social metatags to your content
guide: true
---
```

And it results in the below markup:

```html
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="Adding page metadata">
<meta name="twitter:description" content="Learn how to add social metatags to your content">
<meta name="twitter:site" content="@devwithlando">
<meta property="og:type" content="article">
<meta property="og:title" content="Adding page metadata">
<meta property="og:description" content="Learn how to add social metatags to your content">
<meta property="og:site_name" content="VuePress 2 Default Theme +">
<meta property="article:published_time" content="2022-02-15T18:37:45.000Z">
<meta itemprop="name" content="Adding page metadata">
<meta itemprop="description" content="Learn how to add social metatags to your content">
<meta name="twitter:url" content="https://vuepress-theme-default-plus.lando.dev/adding-page-metadata.html">
<meta property="og:url" content="https://vuepress-theme-default-plus.lando.dev/adding-page-metadata.html">
<link rel="canonical" href="https://vuepress-theme-default-plus.lando.dev/adding-page-metadata.html">
```

## Advanced

You can also override the `title` and `description` as well as add an optional `image` tags.

```md
---
title: Making A Guide 2
description: Learn how to manually populate guide content using the VuePress 2 Default Theme Plus.
image: https://external-preview.redd.it/mj-2SFKKXAMK3tXrlo1smwLCSIantySqxSgfgMoJH2U.jpg?width=640&crop=smart&auto=webp&s=4f983b744fba16877e80218131a917b92904af26
---
```

If you require MOAR POWAH you can add or edit _any_ additional metatags as you see fit using the `head` key inside of your frontmatter.

```md
---
head:
  - - meta
    - name: things:not-to-do
      content: give you up
  - - meta
    - name: things:not-to-do-2
      content: let you down
  - - meta
    - name: things:not-to-do-3
      content: run around
  - - meta
    - name: things:not-to-do-4
      content: desert you
  - - meta
    - name: things:not-to-do-5
      content: make you cry
  - - meta
    - name: things:not-to-do-6
      content: say goodbye
  - - meta
    - name: things:not-to-do-7
      content: tell a lie
  - - meta
    - name: things:not-to-do-8
      content: hurt you
  - - link
    - rel: canonical
      href: https://www.youtube.com/watch?v=dQw4w9WgXcQ
---
```
