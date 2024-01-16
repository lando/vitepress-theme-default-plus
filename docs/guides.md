---
description: Home helpful guides for the VitePress Default Theme Plus.
layout: page
title: Guides
---

<script setup>
import {VPLCollectionPage, VPLCollectionPageTitle, VPLCollectionItems} from '@lando/vitepress-theme-default-plus'
import {useCollection} from '../utils/use-collection';

const {pages} = useCollection('guide');

</script>

<VPLCollectionPage>
  <VPLCollectionPageTitle>
    <template #title>
      Guides
    </template>
    <template #lead>
      stuyff adn thiangsoejp
      oj pgojseg
    </template>
  </VPLCollectionPageTitle>
  <VPLCollectionItems :items="pages"/>
</VPLCollectionPage>
