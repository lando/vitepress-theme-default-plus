<template>
  <div class="read-mode">
    <a @click="toggleReadMode">
      <svg
        v-if="!isReadMode"
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-maximize-2"
      ><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line
        x1="21"
        y1="3"
        x2="14"
        y2="10"
      /><line
        x1="3"
        y1="21"
        x2="10"
        y2="14"
      /></svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-minimize-2"
      ><polyline points="4 14 10 14 10 20" /><polyline points="20 10 14 10 14 4" /><line
        x1="14"
        y1="10"
        x2="21"
        y2="3"
      /><line
        x1="3"
        y1="21"
        x2="10"
        y2="14"
      /></svg>
      <span class="header">{{ toggleText }}</span>
    </a>
  </div>
</template>

<script setup>
import {computed} from 'vue';
import {useReadMode} from './read-mode.js';

// Props
const props = defineProps({
  distractName: {
    required: true,
    type: String,
    default: 'Distraction Mode',
  },
  focusName: {
    required: true,
    type: String,
    default: 'Focus Mode',
  },
});

// Persistance read mode
const isReadMode = useReadMode();
const toggleReadMode = () => {
  isReadMode.value = !!!isReadMode.value;
};

// Text things
const toggleText = computed(() => {
  return isReadMode.value ? props.distractName: props.focusName;
});
</script>

<style lang="scss" scoped>
@import '../../styles/main.scss';
.read-mode {
  margin-top: 1em;
  padding-top: 1em;
  padding-bottom: 1em;
  border-top: 1px solid var(--c-border);
  border-bottom: 1px solid var(--c-border);
  a {
    display: flex;
    align-content: stretch;
    align-items: center;
  }
  svg {
    margin-right: 10px;
  }
  .header {
    margin: 0;
    cursor: pointer;
    &:hover {
      color: var(--c-brand);
    }
  }
}
</style>
