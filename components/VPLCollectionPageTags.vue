<template>
  <div class="collection-page-tags">
    <Tag
      v-for="(selected, tag) in tags"
      :key="tag"
      :type="selected ? 'selected' : 'info'"
      :text="tag"
      @click="toggle(tag)"
    />
  </div>
</template>

<script setup>
import {onMounted} from 'vue';
import {useRoute} from 'vitepress';
import encodeTag from '../client/encode-tag.js';

import Tag from './VPLCollectionTag.vue';

const tags = defineModel();

const toggle = tag => {
  tags.value[tag] = !tags.value[tag];
};

onMounted(() => {
  const route = useRoute();
  const params = route.tags ?? [];
  for (const [tag] of Object.entries(tags.value)) {
    tags.value[tag] = params.includes(tag) || params.includes(encodeTag(tag));
  }
});

</script>

<style scoped>
.collection-page-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
  align-items: center;
  padding: 12px 0;
}


</style>
