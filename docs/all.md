---
description: Home helpful guides for the VitePress Default Theme Plus.
layout: page
title: Guides
sidebar: false
---

<script setup>
import {VPLCollectionPage, VPLCollectionPageSection, VPLCollectionPageTitle, VPLCollectionItems} from '@lando/vitepress-theme-default-plus';
import {useCollection} from '@lando/vitepress-theme-default-plus';

const guides = useCollection('guide');
const posts = useCollection('post');
</script>

<VPLCollectionPage>
  <VPLCollectionPageTitle>
    <template #title>
      ALL THE THINGS!
    </template>
    <template #lead>
      A mix of different collectons all on one page but organized in different sections!
    </template>
  </VPLCollectionPageTitle>

  <VPLCollectionPageSection>
    <template #title>
      Guides
    </template>
    <template #lead>
      Guides are sort of like tutorial adjacent things but with a tighter vibe.
    </template>
    <template #items>
      <VPLCollectionItems :items="guides.pages"/>
    </template>
  </VPLCollectionPageSection>

  <VPLCollectionPageSection>
    <template #title>
      Posts
    </template>
    <template #lead>
      Posts are sort of like a <em>hot-mess</em> of free-for-all anything-goes word-vomit pretending to be prose.
    </template>
    <template #items>
      <VPLCollectionItems more="date" :items="posts.pages"/>
    </template>
  </VPLCollectionPageSection>
</VPLCollectionPage>
