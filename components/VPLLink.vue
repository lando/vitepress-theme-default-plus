<template>
  <component
    :is="tag"
    class="VPLink"
    :class="{
      link: href,
      'vp-external-link-icon': isExternal,
      'no-icon': noIcon
    }"
    :href="href ? normalizeLink(href) : undefined"
    :target="target ?? (isExternal ? '_blank' : isFauxInternal ? '_self' : undefined)"
    :rel="rel ?? (isExternal ? 'noreferrer' : undefined)"
  >
    <slot />
  </component>
</template>

<script setup>
import {useData} from 'vitepress';
import {computed} from 'vue';
import {normalizeLink} from 'vitepress/dist/client/theme-default/support/utils.js';

const EXTERNAL_URL_RE = /^(?:[a-z]+:|\/\/)/i;

const {theme} = useData();
const {internalDomains} = theme.value;

const props = defineProps({
  tag: {
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
    default: undefined,
  },
  rel: {
    type: String,
    default: undefined,
  },
});

const tag = computed(() => props.tag ?? (props.href ? 'a' : 'span'));

const isFauxInternal = computed(() => {
  return props.href && internalDomains.find(domain => props.href.startsWith(domain)) !== undefined;
});

const isExternal = computed(() => !isFauxInternal.value && props.href && EXTERNAL_URL_RE.test(props.href));
</script>


