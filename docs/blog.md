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
  <VPLCollectionItems :items="pages" more="date"/>
</VPLCollectionPage>

<script setup>
import {VPLCollectionPage, VPLCollectionPageTitle, VPLCollectionItems} from '@lando/vitepress-theme-default-plus'
import {useCollection} from '@lando/vitepress-theme-default-plus';

const {pages} = useCollection('post');
</script>
