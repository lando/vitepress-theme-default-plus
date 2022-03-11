---
title: Making A Guide 1
description: Learn how to automatically populate guide content using the VuePress 2 Default Theme Plus.
image: https://external-preview.redd.it/mj-2SFKKXAMK3tXrlo1smwLCSIantySqxSgfgMoJH2U.jpg?width=640&crop=smart&auto=webp&s=4f983b744fba16877e80218131a917b92904af26
guide: true
---

Guides are _how tos_ or _tutorials_ that fit somewhere in between technical documentation and blog posts. They generally
seek to answer a single question such as "How do I create a guide using this theme?" and are heavy on code snippets. In this case there are actually two ways to create a guide:

* Autopopulating data from GitHub
* [Manually entering data](./making-a-guide-2.html)

## Autopopulating data from GitHub

To automatically grab relevant authorship and data information make sure you set `repo` to a publically accessible GitHub repo and also set `autoPopulate` to `true` in the [theme config](./config.html).

Once you have done that then you can make a guide by adding the following frontmatter to your markdown file.

::: warning You must set the title!
Note that because of how the underlying components are layered and called you must set the title in the frontmatter. This will populate the `h1` on the page. You can and should then omit the `h1` in the markdown content itself.
:::

```md
---
title: Making A Guide 1
guide: true
---
```

You can check out the full markdown file that generated this page [here](https://github.com/lando/vuepress-theme-default-plus/blob/main/docs/making-a-guide.html). If you are interested in manually setting the `authors`, `date` and edit link then check out [Making a Guide 2](./making-a-guide-2.html)
