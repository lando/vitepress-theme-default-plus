<template>
  <div
    v-if="props.tags.length > 0"
    class="tag-list"
  >
    <span class="header">Tags</span>
    <RouterLink
      v-for="tag in props.tags"
      :key="tag.key"
      :to="tag.path"
      class="tag-link"
    >
      {{ tag.tag }}
    </RouterLink>
  </div>
</template>

<script setup>
import {RouterLink} from 'vue-router';
// Props
const props = defineProps({
  tags: {
    type: Array,
    default: () => ([]),
  },
});
</script>

<style lang="scss" scoped>
@import '../styles/main.scss';
.tag-list {
  border-top: 1px solid var(--c-border);
  padding-top: 1em;
  .tag-link {
    display: inline-flex;
    background-color: var(--c-bg-lighter);
    margin-right: 5px;
    margin-left: -2px;
    margin-bottom: 5px;
    border-radius: 3px;
    padding: 7px;
    color: var(--c-text-light);
    border: 1px solid var(--c-border);
    font-weight: 700;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    &:hover {
      background-color: var(--c-brand-light);
      color: #ffffff;
      transition: all 0.2s;
    }
  }
}
</style>
