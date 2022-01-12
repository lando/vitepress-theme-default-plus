<template>
  <main class="page guide">
    <slot name="top" />

    <div class="theme-default-content">
      <h1>Making a guide</h1>
      <GuideHeader />
      <Content />
      <GuideFooter />
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
import GuideHeader from './GuideHeader.vue';
import GuideFooter from './GuideFooter.vue';
import CustomPageMeta from './CustomPageMeta.vue';
</script>

<style lang="scss">
</style>
