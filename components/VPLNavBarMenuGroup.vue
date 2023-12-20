<template>
  <div class="maybe">
    <span
      v-if="treeHasNewAlerts"
      class="alert-circle"
    />
    <VPFlyout
      :class="{
        VPNavBarMenuGroup: true,
        test: treeHasNewAlerts,
        active: isActive(
          page.relativePath,
          item.activeMatch,
          !!item.activeMatch
        ) || childrenActive
      }"
      :button="item.text"
      :items="item.items"
    />
  </div>
</template>

<script setup>
import {computed, toRefs} from 'vue';
import {useData} from 'vitepress';
import VPFlyout from '@default-theme/components/VPFlyout.vue';

const EXT_RE = /(index)?\.(md|html)$/;
const HASH_RE = /#.*$/;
const inBrowser = typeof document !== 'undefined';
const {page} = useData();

const props = defineProps({
  item: {
    type: [Array, Object],
    default: () => ([]),
  },
});

const {item} = toRefs(props);

const normalize = path => decodeURI(path).replace(HASH_RE, '').replace(EXT_RE, '');

const isActive = (currentPath, matchPath, asRegex) => {
  if (matchPath === undefined) return false;

  currentPath = normalize(`/${currentPath}`);

  if (asRegex) return new RegExp(matchPath).test(currentPath);
  if (normalize(matchPath) !== currentPath) return false;

  const hashMatch = matchPath.match(HASH_RE);

  if (hashMatch) return (inBrowser ? location.hash : '') === hashMatch[0];

  return true;
};

const flattenTree = (data, collect = []) => {
  // break up children and items
  const {items, ...item} = data;
  // collec the item
  collect.push(item);
  // if we have children we need to recurse and add
  if (items && items.length > 0) {
    items.map(child => {
      collect.push(flattenTree(child));
    });
  };

  // faltten and return
  return collect.flat(Infinity);
};

const hasAlert = item => {
  const {alert} = item;
  return (
    alert
    && alert !== null
    && alert !== undefined
    && (typeof alert === 'string' || typeof alert == 'object')
  );
};

const treeHasNewAlerts = computed(() => {
  const items = flattenTree(item.value);
  const activeAlerts = items
    .filter(item => hasAlert(item))
    .map(item => getAlert(item.alert))
    .filter(alert => alert.type === 'new')
    .filter(alert => alert && alert.expires > new Date().getTime());

  return activeAlerts.length > 0;
});

const getAlert = alert => {
  if (typeof alert === 'string') alert = {text: alert};
  return {type: 'success', expires: 2000000000000, ...alert};
};

const isChildActive = navItem => {
  if ('link' in navItem) {
    return isActive(
      page.value.relativePath,
      navItem.link,
      !!props.item.activeMatch,
    );
  } else {
    return navItem.items.some(isChildActive);
  }
};

const childrenActive = computed(() => isChildActive(props.item));
</script>

<style scoped>
  .maybe {
    display: flex;
    align-items: center;
  }
  .alert-circle {
    height: 8px;
    width: 8px;
    background-color: var(--vp-c-brand-1);
    border-radius: 50%;
    margin-right: -7px;
    margin-left: 8px;
  }


</style>
