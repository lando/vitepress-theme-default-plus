<template>
  <div class="VPMenuLink">
    <Link
      :class="{ active: isActive(page.relativePath, item.activeMatch || item.link, !!item.activeMatch) }"
      :href="item.link"
      :target="item.target"
      :rel="item.rel"
    >
      {{ item.text }}
      <Badge
        v-if="hasAlert(item.alert) && isActiveAlert(item.alert)"
        v-bind="getAlert(item.alert)"
      />
    </Link>
  </div>
</template>

<script setup>
  import {toRefs} from 'vue';
  import {useData} from 'vitepress';
  import isActive from '../client/is-active.js';

  import Link from './VPLLink.vue';

  const props = defineProps({
    item: {
      type: [Array, Object],
      default: () => ([]),
    },
  });

  const {item} = toRefs(props);
  const {page} = useData();

  const getAlert = alert => {
    if (typeof alert === 'string') alert = {text: alert};
    return {type: 'info', expires: 2000000000000, ...alert};
  };

  const hasAlert = alert => {
    return (
      alert
      && alert !== null
      && alert !== undefined
      && (typeof alert === 'string' || typeof alert == 'object')
    );
  };

  const isActiveAlert = alert => {
    const {expires} = getAlert(alert);
    return new Date().getTime() < expires;
  };

</script>

<style scoped>
.VPMenuGroup + .VPMenuLink {
  margin: 12px -12px 0;
  border-top: 1px solid var(--vp-c-divider);
  padding: 12px 12px 0;
}

.VPMenuLink .VPBadge {
  margin-top: 8px;
}

.link {
  display: block;
  border-radius: 6px;
  padding: 0 12px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  transition: background-color 0.25s, color 0.25s;
}

.link:hover {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-default-soft);
}

.link.active {
  color: var(--vp-c-brand-1);
}
</style>
