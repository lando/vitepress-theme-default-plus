---
title: "Making A Blog Post: It's sort of like a guide but it's sort of not like a guide"
byline: Blog posts are free form articles that may or may not be techincal in nature. They differ slightly from guides primarily in their presentation and authorship.
blog: true
author:
  name: Mike Pirog
  link: mailto:mike@lando.dev
  pic: https://gravatar.com/avatar/dc1322b3ddd0ef682862d7f281c821bb
  location: Washington, DC
image: https://external-preview.redd.it/mj-2SFKKXAMK3tXrlo1smwLCSIantySqxSgfgMoJH2U.jpg?width=640&crop=smart&auto=webp&s=4f983b744fba16877e80218131a917b92904af26

mailchimp:
  action: https://dev.us12.list-manage.com/subscribe/post?u=59874b4d6910fa65e724a4648&amp;id=613837077f
  title: Want more Pirog themed content?
  byline: Signup and we will send you a weekly blog digest of similar content to keep you satiated.
  button: Sign me up!
tags:
  - this is a test tag
---

Blog posts are free form articles that may or may not be techincal in nature. They differ slightly from guides primarily in their presentation and authorship.

Specifically, they make use of a `byline` and can only have a single, manually entered, author. They can be thought of more like "traditional" news media articles. Like guides you can create them in two ways:

:::tip Mixed signals?
Yes, we know that this actually should be a `Guide` instead of a blog post! However, in this weird case we think its better to use `BlogPost` so we can best illustrate the capabilities.
:::

## Basics

```md
---
title: "Making A Blog Post: It's sort of like a guide but it's sort of not like a guide"
byline: Blog posts are free form articles that may or may not be techincal in nature. They differ slightly from guides primarily in their presentation and authorship.
blog: true
---
```

::: warning You must set the title!
Note that because of how the underlying components are layered and called you must set the title in the frontmatter. This will populate the `h1` on the page. You can and should then omit the `h1` in the markdown content itself.
:::

You can check out the full markdown file that generated this page [here](https://github.com/lando/vuepress-theme-default-plus/blob/main/docs/making-a-guide.html). If you are interested in manually setting the `authors`, `date` and edit link then check out [Making a Guide 2](./making-a-guide-2.html)

## Authorship

You must at least specify a name!

```md
---
author:
  name: Mike Pirog
  link: mailto:mike@lando.dev
  pic: https://gravatar.com/avatar/dc1322b3ddd0ef682862d7f281c821bb
  location: Washington, DC
---
```

## Signup

```md
---
mailchimp:
  action: https://dev.us12.list-manage.com/subscribe/post?u=59874b4d6910fa65e724a4648&amp;id=613837077f
  title: Want more Pirog themed content?
  byline: Signup and we will send you a weekly blog digest of similar content to keep you satiated.
  button: Sign me up!
---
```
