---
description: Learn how to add social metatags to your content
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

# Adding page metadata

Theme+ will automatically add commonly used metatags to your page based on the pages frontmatter, site information and theme configuration.

If you care about this then we recommend  you _at the very least_ set the `canonicalUrl` in the [theme config](../config/config.md#autometa) and set a `description` in the pages frontmatter.

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
