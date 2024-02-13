---
description: Learn about the VitePress Default Theme + collections components.
---

# Collections Pages

You can `import` some helpful `components` from `@lando/vitepress-theme-default-plus` and compose collections pages.

This is especially useful when used in tandem with [useCollection()](../composables/use-collection.md).

Here is what we do to create `/guide` for this site.

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

You can also check out [/all](/all) and its [code](https://github.com/lando/vitepress-theme-default-plus/blob/main/docs/all.md) for an example that combines all available collections components.

## \<VPLCollectionPage />

This is more or less just a wrapper to provide structure, styling and the downstream slots so the usage is fairly straightforward:

```html
<VPLCollectionPage>
  ...other stuff goes here
</VPLCollectionPage>
```

## \<VPLCollectionPageTags />

Provide a way to filter collection items based on their [tags](../config/frontmatter#tags).

```html
<VPLCollectionPageTags :tags="selectedTags" />
<VPLCollectionItems :items="pages" :tags="selectedTags"/>

<script setup>
const {pages, selectedTags} = useCollection();
</script>
```

Note that you can pass one or multiple `:tag` or `:tag-id`s as a query string to select tags. This is useful for creating URL for specific "tag pages". Here are some valid paths for this docs site:

```bash
/all.html?tags=we-are-really-tagging-a-lot-here,this-is-a-test-tag
/all.html?tag=we%20are%20really%20tagging%20a%20lot%20here
```

## \<VPLCollectionPageTitle />

Provide a title and lead-in for the page.

```html
<VPLCollectionPage>
  <VPLCollectionPageTitle>
    <template #title>
      ALL THE THINGS!
    </template>
    <template #lead>
      A mix of different collectons all on one page but organized in different sections!
    </template>
  </VPLCollectionPageTitle>
</VPLCollectionPage>
```

## \<VPLCollectionPageSection />

If you'd like to provide distinct sections on a collection page. You can do something like:

```html
<VPLCollectionPage>
  <VPLCollectionPageSection>
    <template #title>
      Guides
    </template>
    <template #lead>
      Guides are sort of like tutorial adjacent things but with a tighter vibe.
    </template>
    <template #items>
      <VPLCollectionItems :items="items"/>
    </template>
  </VPLCollectionPageSection>
</VPLCollectionPage>
```

## \<VPLCollectionItems />

Show some collection items.

```html
<VPLCollectionItems
  :items="pages"
  more="readmore"
  :pager=10
  size="medium"
/>

<script setup>
import {VPLCollectionItems} from '@lando/vitepress-theme-default-plus'
import {useCollection} from '@lando/vitepress-theme-default-plus';

const {pages} = useCollection('post');
</script>
```

You can set the `pager` to determine the amount of items to show before the "load more" button.

You can change `more` to `date` if you want to see the date of the item instead of the "Read More" link.
