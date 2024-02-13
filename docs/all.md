---
description: Home helpful guides for the VitePress Default Theme Plus.
layout: page
title: Guides
sidebar: false
---

<script setup>
import {computed} from 'vue';
import {
  VPLCollectionItems,
  VPLCollectionPage,
  VPLCollectionPageSection,
  VPLCollectionPageTags,
  VPLCollectionPageTitle,
} from '@lando/vitepress-theme-default-plus';
import {useCollection} from '@lando/vitepress-theme-default-plus';

const guides = useCollection('guide');
const posts = useCollection('post');
const {hasItems, selectedTags} = useCollection();

console.log(guides.pages);

const showGuides = computed(() => hasItems(guides.pages, selectedTags));
const showPosts = computed(() => hasItems(posts.pages, selectedTags));
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

  <VPLCollectionPageTags :tags="selectedTags" />

  <VPLCollectionPageSection v-if="showGuides">
    <template #title>
      Guides
    </template>
    <template #lead>
      Guides are sort of like tutorial adjacent things but with a tighter vibe.
    </template>
    <template #items>
      <VPLCollectionItems
        :items="guides.pages"
        :tags="selectedTags"
      />
    </template>
  </VPLCollectionPageSection>

  <VPLCollectionPageSection v-if="showPosts">
    <template #title>
      Posts
    </template>
    <template #lead>
      Posts are sort of like a <em>hot-mess</em> of free-for-all anything-goes word-vomit pretending to be prose.
    </template>
    <template #items>
      <VPLCollectionItems
        more="date"
        :items="posts.pages"
        :tags="selectedTags"
      />
    </template>
  </VPLCollectionPageSection>
</VPLCollectionPage>
