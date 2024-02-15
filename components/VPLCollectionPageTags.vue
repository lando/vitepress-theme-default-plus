<template>
  <div class="collection-page-tags">
    <Tag
      v-for="(tag, name) in tags"
      :key="name"
      :type="tag.selected ? 'selected' : 'info'"
      :text="name"
      v-bind="tag"
      @click="toggle(name)"
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
  tags.value[tag].selected = !tags.value[tag].selected;
};

onMounted(() => {
  const route = useRoute();
  const params = route.tags ?? [];
  for (const [tag] of Object.entries(tags.value)) {
    tags.value[tag].selected = params.includes(tag) || params.includes(encodeTag(tag));
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

@media (max-width: 960px) {
  .collection-page-tags {
    padding: 12px 24px;
  }
}
</style>
