<template>
  <a
    class="VPLink"
    :class="{
      link: props.href,
      'vp-external-link-icon': props.target === '_blank',
      'no-icon': props.noIcon
    }"
    :href="props.href"
    :target="props.target"
    :rel="props.rel"
  >
    {{ props.text }}
  </a>
</template>

<script setup>
import {computed} from 'vue';
import {normalizeLink} from 'vitepress/dist/client/theme-default/support/utils.js';

const props = defineProps({
  text: {
    type: String,
    default: undefined,
  },
  href: {
    type: String,
    default: undefined,
  },
  noIcon: {
    type: Boolean,
    default: false,
  },
  target: {
    type: String,
    default: '_blank',
  },
  rel: {
    type: String,
    default: undefined,
  },
});

</script>


