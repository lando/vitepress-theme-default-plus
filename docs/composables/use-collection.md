---
description: Learn about the VitePress Default Theme + useCollection composable.
---

# useCollection

You can `import` the `useCollection()` composable from `@lando/vitepress-theme-default-plus` and use it to create things like index `pages`, `prev` and `next` links and more.

```js
const {
  hasItems,
  pages,
  page,
  nextPage,
  prevnext,
  prevPage,
  path,
  tagCounts,
  tags,
  selectedTags,
  selectedTagsList
} = useCollection();
```

Or target a specific collection:

```js
const data = useCollection('post');
```

Here is how we generate our `/all` index page which contains a good mix of the most useful things above:

```html
<!--@include: ./../all.md-->
```

For more detail on `Collections` components you can check [this](/pages/collections).
