<template>
  <Badge
    class="tag"
    :text="text"
    :type="type"
  />
</template>

<script setup>
const {text, type} = defineProps({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'info',
  },
});
</script>

<style scoped>
.tag {
  cursor: pointer;
}
.VPBadge.selected {
  border-color: var(--vpl-badge-selected-border);
  color: var(--vpl-badge-selected-text);
  background-color: var(--vpl-badge-selected-bg);
}
</style>
