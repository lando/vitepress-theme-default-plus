---
title: Making A Guide 2
description: Learn how to manually populate guide content using the VuePress 2 Default Theme Plus.
guide: true
image: https://external-preview.redd.it/mj-2SFKKXAMK3tXrlo1smwLCSIantySqxSgfgMoJH2U.jpg?width=640&crop=smart&auto=webp&s=4f983b744fba16877e80218131a917b92904af26
authors:
  - name: Mike Pirog
    link: mailto:mike@lando.dev
    pic: https://gravatar.com/avatar/dc1322b3ddd0ef682862d7f281c821bb
  - name: John Ouellet
    link: mailto:john@lando.dev
    pic: https://avatars.githubusercontent.com/u/5560907?v=4
editlink:
  link: https://www.youtube.com/watch?v=dQw4w9WgXcQ
  text: Never gonna edit you up
updated:
  timestamp: 1613073690000
tags:
  - this is a test tag
---

Guides are _how tos_ or _tutorials_ that fit somewhere in between technical documentation and blog posts. They generally
seek to answer a single question such as "How do I create a guide using this theme?" and are heavy on code snippets. In this case there are actually two ways to create a guide:

* Manually entering data
* [Autopopulating data from GitHub](./making-a-guide.html)

## Manually entering data

To manually enter authorship, update time and edit link information manually just add some combination of the below frontmatter to the top of your guide's markdown file.

::: warning You must set the title!
Note that because of how the underlying components are layered and called you must set the title in the frontmatter. This will populate the `h1` on the page. You can and should then omit the `h1` in the markdown content itself.
:::

::: tip Timestamp in ms
Note that the update timestamp is in milliseconds and not seconds!
:::

```md
---
title: Making A Guide 2
guide: true
authors:
  - name: Mike Pirog
    link: mailto:mike@lando.dev
    pic: https://gravatar.com/avatar/dc1322b3ddd0ef682862d7f281c821bb
  - name: John Ouellet
    link: mailto:john@lando.dev
    pic: https://avatars.githubusercontent.com/u/5560907?v=4
editlink:
  link: https://www.youtube.com/watch?v=dQw4w9WgXcQ
  text: Never gonna edit you up
updated:
  timestamp: 1613073690000
---
```

You can check out the full markdown file that generated this page [here](https://github.com/lando/vuepress-theme-default-plus/blob/main/docs/making-a-guide-2.html). If you are interested in automatically setting the `authors`, `date` and edit link then check out [Making a Guide](./making-a-guide.html)
