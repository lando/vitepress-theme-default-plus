---
description: Home helpful guides for the VitePress Default Theme Plus.
layout: page
title: Blog
sidebar: false
---
<VPLCollectionPage>
  <VPLCollectionPageTitle>
    <template #title>
      DAT BLOG
    </template>
    <template #lead>
      Refined and sophisticated content for the modern developer.
    </template>
  </VPLCollectionPageTitle>
  <VPLCollectionPageTags v-model="selectedTags" />
  <VPLCollectionItems :items="pages" :tags="selectedTags"/>
</VPLCollectionPage>

<script setup>
import {useCollection} from '@lando/vitepress-theme-default-plus';
import {VPLCollectionPage, VPLCollectionPageTags, VPLCollectionPageTitle, VPLCollectionItems} from '@lando/vitepress-theme-default-plus'

const {pages, selectedTags} = useCollection('post');
</script>
