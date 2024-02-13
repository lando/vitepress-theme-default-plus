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
import Tag from './VPLCollectionTag.vue';

const {tags} = defineProps({
  tags: {
    type: Object,
    default: () => ({}),
  },
});

const toggle = tag => {
  tags[tag] = !tags[tag]; // eslint-disable-line vue/no-mutating-props
};

</script>

<style scoped>
.collection-page-tags {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 0;
}


</style>
