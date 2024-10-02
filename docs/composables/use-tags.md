---
description: Learn about the VitePress Default Theme + useTags composable.
---

# useTags

You can `import` the `useTags()` composable from `@lando/vitepress-theme-default-plus` and use it to create a docs version index page or to show other taggy things.

```js
const {
  // alias:ref pairs
  aliases,
  // alias:link pairs
  aliasLinks,
  // extended version information
  extended,
  // versions prepared for injection into `VPLVersionLink`
  links,
  // a list of all matched and satisfied versions
  versions,
} = useTeam();
```

Here is how we generate our version [index page](/v/) at `/v/`.

```md
<!--@include: ./../v/index.md-->
```
