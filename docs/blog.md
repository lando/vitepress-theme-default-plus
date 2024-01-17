---
description: Home helpful guides for the VitePress Default Theme Plus.
layout: page
title: Guides
---

<script setup>
import {VPLCollectionPage, VPLCollectionPageTitle, VPLCollectionItems} from '@lando/vitepress-theme-default-plus'
import {useCollection} from '@lando/vitepress-theme-default-plus';

const {pages} = useCollection('post');
</script>

<VPLCollectionPage>
  <VPLCollectionPageTitle>
    <template #title>
      DAT BLOG
    </template>
    <template #lead>
      stuyff adn thiangsoejp
      oj pgojseg
    </template>
  </VPLCollectionPageTitle>
  <VPLCollectionItems :items="pages" more="date"/>
</VPLCollectionPage>
