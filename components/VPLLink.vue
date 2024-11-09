<template>
  <component
    :is="tag"
    class="VPLink"
    :class="{
      link: props.href,
      'lando': true,
      'vp-external-link-icon': isExternal,
      'no-icon': noIcon
    }"
    :href="getLink(props.href)"
    :target="target ?? (isExternal ? '_blank' : isFauxInternal ? '_self' : undefined)"
    :rel="relation ?? (isExternal ? 'noreferrer' : undefined)"
  >
    <slot />
  </component>
</template>

<script setup>
import {useData} from 'vitepress';
import {computed} from 'vue';
import {normalizeLink} from 'vitepress/dist/client/theme-default/support/utils.js';

import {default as checkIsFauxInternal} from '../utils/is-faux-internal';
import {default as normalizeMvb} from '../client/normalize-mvblink';
import {default as normalizeRoot} from '../client/normalize-rootlink';

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

const relation = computed(() => {
  if (props.rel === 'mvb') return 'alternate';
  else if (props.rel === 'root' || props.rel === 'none') return undefined;
  return props.rel;
});
const tag = computed(() => props.tag ?? (props.href ? 'a' : 'span'));
const target = computed(() => props.target ?? (props.rel === 'mvb' || props.rel === 'root' ? '_self' : undefined));

const isFauxInternal = computed(() => props.href && checkIsFauxInternal(props.href, internalDomains));
const isExternal = computed(() => !isFauxInternal.value && props.href && EXTERNAL_URL_RE.test(props.href));

const getLink = href => {
  if (props.rel === 'mvb' && href) return normalizeMvb(href);
  else if (props.rel === 'root' && href) return normalizeRoot(href);
  return href ? normalizeLink(href) : undefined;
};

</script>
