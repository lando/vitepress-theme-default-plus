<template>
  <Badge
    :class="`tag ${props.tagClass}`"
    :style="props.type !== 'selected' ? styles : {}"
    :type="props.type"
  >
    <span
      v-if="icon"
      class="icon"
      v-html="icon"
    />
    {{ props.text }}
  </Badge>
</template>

<script setup>
import {computed} from 'vue';
import {useData} from 'vitepress';

const {theme} = useData();
const {tags} = theme.value;

const props = defineProps({
  color: {
    type: String,
    default: 'none',
  },
  icon: {
    type: String,
    default: undefined,
  },
  styles: {
    type: Object,
    default: () => ({}),
  },
  tagClass: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'info',
  },
});

const details = Object.assign({color: props.color, styles: props.styles}, tags[props.text] ?? {});

const styles = computed(() => Object.assign({
  'background-color': details.color,
  'border-color': details.color,
}, details.styles));

const icon = computed(() => props.icon ?? details.icon ?? false);

</script>

<style scoped>
.tag {
  cursor: pointer;
  display: inline-flex;
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
