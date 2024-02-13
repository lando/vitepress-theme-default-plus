<template>
  <div class="collection-icon">
    <Link
      :href="link"
      rel="noopener"
    >
      <span
        class="icon"
        v-html="icon"
      />{{ title }}
    </Link>
  </div>
</template>

<script setup>
import Link from './VPLLink.vue';

const {title, icon, link} = defineProps({
  icon: {
    type: String,
    default: () => {
      return '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>';
    },
  },
  link: {
    type: String,
    default: undefined,
  },
  title: {
    type: String,
    default: 'doc',
  },
});

</script>

<style lang="scss" scoped>
.collection-icon {
  gap: 2px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
  font-weight: 500;
  text-transform: capitalize;
  color: var(--vp-c-text-3);
  a.VPLink.link {
    display: flex;
    align-items: center;
    gap: 2px;
  }
  &:hover {
    color: var(--vp-c-brand-1);
  }
  .icon {
    width: 16px;
  }
}
</style>
