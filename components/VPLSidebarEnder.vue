<template>
  <component
    :is="sectionTag"
    class="VPSidebarItem"
    :class="classes"
  >
    <div
      v-if="item.text"
      class="item"
      :role="itemRole"
      :tabindex="item.items && 0"
      v-on="item.items ? { click: onItemInteraction, keydown: onItemInteraction } : {}"
    >
      <div class="indicator" />

      <Link
        v-if="item.link"
        :tag="linkTag"
        class="link"
        :href="item.link"
        :rel="item.rel"
        :target="item.target"
      >
        <component
          :is="textTag"
          class="text"
          v-html="item.text"
        />
      </Link>
      <component
        :is="textTag"
        v-else
        class="text"
        v-html="item.text"
      />

      <div
        tabindex="0"
        v-if="item.collapsed != null && item.items && item.items.length"
        class="caret"
        role="button"
        aria-label="toggle section"
        @click="onCaretClick"
        @keydown.enter="onCaretClick"
      >
        <span class="vpi-chevron-right caret-icon" />
      </div>
    </div>

    <div
      v-if="item.items && item.items.length"
      class="items"
    >
      <template v-if="depth < 5">
        <VPLSidebarEnder
          v-for="i in item.items"
          :key="i.text"
          :item="i"
          :depth="depth + 1"
        />
      </template>
    </div>
  </component>
</template>

<script setup>
import {computed, onMounted, ref, watch, watchEffect, watchPostEffect} from 'vue';
import {useData} from 'vitepress';

import {default as containsActiveLink} from '../client/has-active-link.js';
import {default as getItemNormalizedLink} from '../client/get-item-nl.js';
import {default as isActive} from '../client/is-active.js';

import Link from './VPLLink.vue';

const {page, hash} = useData();

const props = defineProps({
  item: {
    type: [Array, Object],
    default: () => ([]),
  },
  depth: {
    type: Number,
    default: 0,
  },
});

const item = computed(() => props.item);

const collapsed = ref(false);
const collapsible = computed(() => item.value.collapsed != null);
const isLink = computed(() => !!item.value.link);
const isActiveLink = ref(false);

const updateIsActiveLink = () => {
  isActiveLink.value = isActive(page.value.relativePath, getItemNormalizedLink(item.value));
};

const hasActiveLink = computed(() => {
  if (isActiveLink.value) return true;

  return item.value.items
    ? containsActiveLink(page.value.relativePath, item.value.items)
    : false;
});

const hasChildren = computed(() => !!(item.value.items && item.value.items.length));

const sectionTag = computed(() => (hasChildren.value ? 'section' : `div`));

const linkTag = computed(() => (isLink.value ? 'a' : 'div'));

const textTag = computed(() => {
  return !hasChildren.value
    ? 'p'
    : props.depth + 2 === 7
      ? 'p'
      : `h${props.depth + 2}`;
});

const itemRole = computed(() => (isLink.value ? undefined : 'button'));

const classes = computed(() => [
  [`level-${props.depth}`],
  {collapsible: collapsible.value},
  {collapsed: collapsed.value},
  {'is-link': isLink.value},
  {'is-active': isActiveLink.value},
  {'has-active': hasActiveLink.value},
]);

onMounted(updateIsActiveLink);

watch([page, item, hash], updateIsActiveLink);

watchEffect(() => {
  collapsed.value = !!(collapsible.value && item.value.collapsed);
});

watchPostEffect(() => {
  ;(isActiveLink.value || hasActiveLink.value) && (collapsed.value = false);
});

function onItemInteraction(e) {
  if ('key' in e && e.key !== 'Enter') {
    return;
  }
  !props.item.link && toggle();
}

function onCaretClick() {
  props.item.link && toggle();
}

function toggle() {
  if (collapsible.value) {
    collapsed.value = !collapsed.value;
  }
}

</script>

<style scoped>
.VPSidebarItem.level-0 {
  padding-bottom: 24px;
}

.VPSidebarItem.collapsed.level-0 {
  padding-bottom: 10px;
}

.item {
  position: relative;
  display: flex;
  width: 100%;
}

.VPSidebarItem.collapsible > .item {
  cursor: pointer;
}

.indicator {
  position: absolute;
  top: 6px;
  bottom: 6px;
  left: -17px;
  width: 2px;
  border-radius: 2px;
  transition: background-color 0.25s;
}

.VPSidebarItem.level-2.is-active > .item > .indicator,
.VPSidebarItem.level-3.is-active > .item > .indicator,
.VPSidebarItem.level-4.is-active > .item > .indicator,
.VPSidebarItem.level-5.is-active > .item > .indicator {
  background-color: var(--vp-c-brand-1);
}

.link {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.text {
  flex-grow: 1;
  padding: 4px 0;
  line-height: 24px;
  font-size: 14px;
  transition: color 0.25s;
}

.VPSidebarItem.level-0 .text {
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.VPSidebarItem.level-1 .text,
.VPSidebarItem.level-2 .text,
.VPSidebarItem.level-3 .text,
.VPSidebarItem.level-4 .text,
.VPSidebarItem.level-5 .text {
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.VPSidebarItem.level-0.is-link > .item > .link:hover .text,
.VPSidebarItem.level-1.is-link > .item > .link:hover .text,
.VPSidebarItem.level-2.is-link > .item > .link:hover .text,
.VPSidebarItem.level-3.is-link > .item > .link:hover .text,
.VPSidebarItem.level-4.is-link > .item > .link:hover .text,
.VPSidebarItem.level-5.is-link > .item > .link:hover .text {
  color: var(--vp-c-brand-1);
}

.VPSidebarItem.level-0.has-active > .item > .text,
.VPSidebarItem.level-1.has-active > .item > .text,
.VPSidebarItem.level-2.has-active > .item > .text,
.VPSidebarItem.level-3.has-active > .item > .text,
.VPSidebarItem.level-4.has-active > .item > .text,
.VPSidebarItem.level-5.has-active > .item > .text,
.VPSidebarItem.level-0.has-active > .item > .link > .text,
.VPSidebarItem.level-1.has-active > .item > .link > .text,
.VPSidebarItem.level-2.has-active > .item > .link > .text,
.VPSidebarItem.level-3.has-active > .item > .link > .text,
.VPSidebarItem.level-4.has-active > .item > .link > .text,
.VPSidebarItem.level-5.has-active > .item > .link > .text {
  color: var(--vp-c-text-1);
}

.VPSidebarItem.level-0.is-active > .item .link > .text,
.VPSidebarItem.level-1.is-active > .item .link > .text,
.VPSidebarItem.level-2.is-active > .item .link > .text,
.VPSidebarItem.level-3.is-active > .item .link > .text,
.VPSidebarItem.level-4.is-active > .item .link > .text,
.VPSidebarItem.level-5.is-active > .item .link > .text {
  color: var(--vp-c-brand-1);
}

.caret {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: -7px;
  width: 32px;
  height: 32px;
  color: var(--vp-c-text-3);
  cursor: pointer;
  transition: color 0.25s;
  flex-shrink: 0;
}

.item:hover .caret {
  color: var(--vp-c-text-2);
}

.item:hover .caret:hover {
  color: var(--vp-c-text-1);
}

.caret-icon {
  font-size: 18px;
  transform: rotate(90deg);
  transition: transform 0.25s;
}

.VPSidebarItem.collapsed .caret-icon {
  transform: rotate(0);
}

.VPSidebarItem.level-1 .items,
.VPSidebarItem.level-2 .items,
.VPSidebarItem.level-3 .items,
.VPSidebarItem.level-4 .items,
.VPSidebarItem.level-5 .items {
  border-left: 1px solid var(--vp-c-divider);
  padding-left: 16px;
}

.VPSidebarItem.collapsed .items {
  display: none;
}
</style>
