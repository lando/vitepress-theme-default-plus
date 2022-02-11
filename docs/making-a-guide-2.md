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

Guides are _how tos_ or _tutorials_ that fit somewhere in between technical documentation and blog posts. They generally
seek to answer a single question such as "How do I create a guide using this theme?" and are heavy on code snippets. In this case there are actually two ways to create a guide:

* Manually entering data
* [Autopopulating data from GitHub](./making-a-guide.md)

## Manually entering data

To manually enter authorship, update time and edit link information manually just add some combination of the below frontmatter to the top of your guide's markdown file.

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

You can check out the full markdown file that generated this page [here](https://github.com/lando/vuepress-theme-default-plus/blob/main/docs/making-a-guide-2.md). If you are interested in automatically setting the `authors`, `date` and edit link then check out [Making a Guide](./making-a-guide.md)
