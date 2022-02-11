<template>
  <main class="page guide">
    <slot name="top" />

    <div class="theme-default-content">
      <h1>{{ frontmatter.title }}</h1>
      <GuideHeader
        :authors="frontmatter.authors"
        :updated="frontmatter.updated"
      />
      <Content />
    </div>

    <CustomPageMeta
      :contributors="frontmatter.authors"
      :edit-nav-link="frontmatter.editlink"
      :last-updated="frontmatter.updated"
    />

    <PageNav />

    <slot name="bottom" />
  </main>
</template>

<script setup>
import {usePageFrontmatter} from '@vuepress/client';
// Get parent page nav
import PageNav from '@vuepress/theme-default/lib/client/components/PageNav.vue';
// Use our custom page meta component
import GuideHeader from './GuideHeader.vue';
import CustomPageMeta from './CustomPageMeta.vue';

// Get frontmatter data
const frontmatter = usePageFrontmatter();
</script>

<style lang="scss">
</style>
