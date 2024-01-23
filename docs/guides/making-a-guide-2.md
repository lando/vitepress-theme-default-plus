---
description: Learn how to manually populate guide content using the VitePress Default Theme Plus.
image: https://external-preview.redd.it/mj-2SFKKXAMK3tXrlo1smwLCSIantySqxSgfgMoJH2U.jpg?width=640&crop=smart&auto=webp&s=4f983b744fba16877e80218131a917b92904af26
authors:
  - Mike Pirog
  - name: John Ouellet
    link: mailto:john@lando.dev
    pic: https://avatars.githubusercontent.com/u/5560907?v=4
editLink:
  url: https://www.youtube.com/watch?v=dQw4w9WgXcQ
  text: Never gonna edit you up
updated:
  timestamp: 1613073690000
tags:
  - this is a test tag
---

# Making a guide 2

Guides are _how tos_ or _tutorials_ that fit somewhere in between technical documentation and blog posts. They generally
seek to answer a single question such as "How do I create a guide using this theme?" and are heavy on code snippets. In this case there are actually two ways to create a guide:

* Manually entering data
* Autopopulating data from the `git log`

## Manually entering data

To manually enter authorship, date and edit link information manually just add some combination of the below frontmatter to the top of your guide's markdown file.

::: tip Timestamp in ms
If you use Unix time it must be in ms!
:::

```md
---
authors:
  - Mike Pirog
  - name: John Ouellet
    link: mailto:john@lando.dev
    pic: https://avatars.githubusercontent.com/u/5560907?v=4
editLink:
  url: https://www.youtube.com/watch?v=dQw4w9WgXcQ
  text: Never gonna edit you up
date: 1613073690000
---
```

Note that `Mike Pirog` will be matched against existing contributors and its other data eg `pic|link|etc` will be merged in if its available.

If you are interested in automatically setting the `authors`, `date` and edit link then check out [Making a Guide](./making-a-guide.html)
