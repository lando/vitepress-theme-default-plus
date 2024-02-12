<template>
  <div class="maybe">
    <span
      v-if="treeHasNewAlerts"
      class="alert-circle"
    />
    <VPFlyout
      :class="styles"
      :button="item.text"
      :items="item.items"
    />
  </div>
</template>

<script setup>
import {computed, toRefs} from 'vue';
import {useData} from 'vitepress';
import isActive from '../client/is-active.js';

import VPFlyout from 'vitepress/dist/client/theme-default/components/VPFlyout.vue';

const {page} = useData();

const props = defineProps({
  item: {
    type: [Array, Object],
    default: () => ([]),
  },
});

const {item} = toRefs(props);

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

const getClasses = item => {
  const list = item.value.classes ?? item.value.class;

  // if list is nully then
  if (!list || list === null) return [];

  // return
  return Array.isArray(list) ? list : [list];
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

const styles = computed(() => {
  // get active status
  const active = isActive(page.relativePath, item.activeMatch, !!item.activeMatch) || isChildActive(props.item);
  // build class list
  const classes = {active, VPNavBarMenuGroup: true, test: treeHasNewAlerts};
  // handle custom classes
  for (const style of getClasses(item)) classes[style] = true;

  return classes;
});

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
