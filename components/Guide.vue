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

    <MailChimp
      v-if="hasSignupForm"
      :action="frontmatter.mailchimp.action"
      :title="frontmatter.mailchimp.title"
      :byline="frontmatter.mailchimp.byline"
      :button="frontmatter.mailchimp.button"
    />
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
import {computed} from 'vue';
import {usePageFrontmatter} from '@vuepress/client';
// Get parent page nav
import PageNav from '@vuepress/theme-default/components/PageNav.vue';
// Use our custom page meta component
import CustomPageMeta from '@theme/CustomPageMeta.vue';
import GuideHeader from '@theme/GuideHeader.vue';

// Get frontmatter data
const frontmatter = usePageFrontmatter();
const hasSignupForm = computed(() => frontmatter.value.mailchimp && frontmatter.value.mailchimp.action);
</script>

<style lang="scss" scoped>
@import '../styles/main.scss';
.newsletter {
  padding: 1.8rem 2.3rem;
  margin: 0 auto;
  padding-top: 1rem;
  padding-bottom: 1rem;
  overflow: auto;
  width: auto;
}
@media (max-width: $MQMobileNarrow) {
  .newsletter {
    padding-left: 0;
    padding-right: 0;
    border-radius: 0;
    width: 100%;
  }
  .newsletter__wrap {
    margin: 0.85rem -1.5rem;
    border-radius: 0;
  }
}
</style>
