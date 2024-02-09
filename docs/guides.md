---
description: Home helpful guides for the VitePress Default Theme Plus.
layout: page
title: Guides
sidebar: false
---

<script setup>
import {onMounted} from 'vue';
import {VPLCollectionPage, VPLCollectionPageTitle, VPLCollectionItems} from '@lando/vitepress-theme-default-plus';
import {useCollection} from '@lando/vitepress-theme-default-plus';

const {pages, pagesBySelectedTags, tags, tagCounts, selectedTags} = useCollection('guide');


onMounted(() => {
  // selectedTags['tag 1'] = true;
})

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
  <VPLCollectionItems :items="pages" :tags="selectedTags"/>
</VPLCollectionPage>
