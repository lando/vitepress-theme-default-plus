---
description: Home helpful guides for the VitePress Default Theme Plus.
layout: page
title: Guides
sidebar: false
---

<script setup>
import {VPLCollectionPage, VPLCollectionPageTags, VPLCollectionPageTitle, VPLCollectionItems} from '@lando/vitepress-theme-default-plus';
import {useCollection} from '@lando/vitepress-theme-default-plus';

const {pages, selectedTags} = useCollection('guide');

</script>
<VPLCollectionPage>
  <VPLCollectionPageTitle>
    <template #title>
      Guides
    </template>
    <template #lead>
      Helpful tutorial-like content!
    </template>
  </VPLCollectionPageTitle>
  <VPLCollectionPageTags v-model="selectedTags" />
  <VPLCollectionItems :items="pages" :tags="selectedTags"/>
</VPLCollectionPage>
