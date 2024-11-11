---
title: Loading remote content
description: Learn how to add remote markdown file
editLink:
  url: https://github.com/lando/setup-lando/edit/main/docs/windows.md

tags:
  - url-loader
url-loader:
  source: https://raw.githubusercontent.com/lando/setup-lando/refs/heads/main/docs/windows.md
  content: append
  frontmatter: false
---

::: tip Below content is loaded via URL

The content in this page is loaded from `https://raw.githubusercontent.com/lando/setup-lando/refs/heads/main/docs/windows.md`. Below is the actual frontmatter for this page that makes this whole thing possible.

**Note that the content below is the Windows installer instructions for Lando and has nothing to do with this theme. We are just using it as an example of how `url-loader` works.**

```md
title: Loading remote content
description: Learn how to add remote markdown file
editLink:
  url: https://github.com/lando/setup-lando/edit/main/docs/windows.md

tags:
  - url-loader
url-loader:
  source: https://raw.githubusercontent.com/lando/setup-lando/refs/heads/main/docs/windows.md
  content: append
  frontmatter: false
```
:::
