<template>
  <Badge
    class="tag"
    :style="type !== 'selected' ? styles : {}"
    :type="type"
  >
    <span
      v-if="icon"
      class="icon"
      v-html="icon"
    />
    {{ text }}
  </Badge>
</template>

<script setup>
import {computed} from 'vue';
import {useData} from 'vitepress';

const {theme} = useData();
const {tags} = theme.value;

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

const details = Object.assign({color: 'none', styles: {}}, tags[text] ?? {});

const styles = computed(() => Object.assign({
  'background-color': details.color,
  'border-color': details.color,
}, details.styles));

const icon = computed(() => details.icon ?? false);

</script>

<style scoped>
.tag {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  font-size: 14px;
  .icon {
    width: 16px;
  }
}
.VPBadge.selected {
  border-color: var(--vpl-badge-selected-border);
  color: var(--vpl-badge-selected-text);
  background-color: var(--vpl-badge-selected-bg);
}
</style>
