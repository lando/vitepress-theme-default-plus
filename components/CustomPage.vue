<template>
  <main class="page">
    <slot name="top" />

    <div class="theme-default-content">
      <Content />
    </div>

    <CustomPageMeta />

    <PageNav />

    <slot name="bottom" />
  </main>
</template>

<script setup>
// Get parent page nav
import PageNav from '@vuepress/theme-default/lib/client/components/PageNav.vue';
// Use our custom page meta component
import CustomPageMeta from './CustomPageMeta.vue';
</script>

<style lang="scss">
</style>
