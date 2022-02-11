---
title: Making A Guide 1
guide: true
---

Guides are _how tos_ or _tutorials_ that fit somewhere in between technical documentation and blog posts. They generally
seek to answer a single question such as "How do I create a guide using this theme?" and are heavy on code snippets. In this case there are actually two ways to create a guide:

* Autopopulating data from GitHub
* [Manually entering data](./making-a-guide-2.md)

## Autopopulating data from GitHub

To automatically grab relevant authorship and data information make sure you set `repo` to a publically accessible GitHub repo and also set `autoPopulate` to `true` in the [theme config](./config.md).

Once you have done that then you can make a guide by adding the following frontmatter to your markdown file.

```md
---
title: Making A Guide 1
guide: true
---
```

You can check out the full markdown file that generated this page [here](https://github.com/lando/vuepress-theme-default-plus/blob/main/docs/making-a-guide.md). If you are interested in manually setting the `authors`, `date` and edit link then check out [Making a Guide 2](./making-a-guide-2.md)
