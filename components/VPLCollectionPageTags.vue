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
import encodeTag from '../client/encode-tag.js';

import Tag from './VPLCollectionTag.vue';


const getParams = () => {
  const params = new URLSearchParams(window.location.search);
  return [params.get('tag'), params.get('tags')]
    .filter(param => param !== null && typeof param === 'string')
    .map(param => param.split(','))
    .flat(Infinity);
};

function hasTagInQuery(q, params = getParams()) {
  return params.includes(q) || params.includes(encodeTag(q));
}

const tags = defineModel();

const toggle = tag => {
  tags.value[tag] = !tags.value[tag];
};

onMounted(() => {
  for (const [tag] of Object.entries(tags.value)) {
    tags.value[tag] = hasTagInQuery(tag);
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
