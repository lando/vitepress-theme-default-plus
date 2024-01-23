---
description: Learn about the VitePress Default Theme + useCollection composable.
---

# useCollection

You can `import` the `useCollection()` composable from `@lando/vitepress-theme-default-plus` and use it to create things like index pages, prev|next links, and more.

```js
const {pages, page, nextPage, prevnext, prevPage, path} = useCollection();
```

Or target a specific collection:

```js
const data = useCollection('post');
```
Here is how we generate our `/blog` index page:

```html
<VPLCollectionPage>
  <VPLCollectionPageTitle>
    <template #title>
      DAT BLOG
    </template>
    <template #lead>
      Refined and sophisticated content for the modern developer.
    </template>
  </VPLCollectionPageTitle>
  <VPLCollectionItems :items="pages" more="date"/>
</VPLCollectionPage>

<script setup>
import {VPLCollectionPage, VPLCollectionPageTitle, VPLCollectionItems} from '@lando/vitepress-theme-default-plus'
import {useCollection} from '@lando/vitepress-theme-default-plus';

const {pages} = useCollection('post');
</script>
```
