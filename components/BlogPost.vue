<template>
  <div class="junk-wrapper">
    <div class="blog-header-outer">
      <h1>{{ frontmatter.title }}</h1>
      <BlogHeader
        :author="frontmatter.author"
        :byline="frontmatter.byline"
        :updated="frontmatter.updated"
      />
    </div>
    <main class="page blog">
      <slot name="top" />

      <div class="theme-default-content">
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
  </div>
</template>

<script setup>
import {computed} from 'vue';
import {usePageFrontmatter} from '@vuepress/client';
// Get parent page nav
import PageNav from '@vuepress/theme-default/components/PageNav.vue';
// Use our custom page meta component
import CustomPageMeta from '@theme/CustomPageMeta.vue';
import BlogHeader from '@theme/BlogHeader.vue';

// Get frontmatter data
const frontmatter = usePageFrontmatter();
const hasSignupForm = computed(() => frontmatter.value.mailchimp && frontmatter.value.mailchimp.action);
</script>

<style lang="scss" scoped>
@import '../styles/main.scss';
.junk-wrapper {
  display: contents;
}
.blog-header-outer {
  h1 {
    width: 95%;
  }
  .blog-header {
    border-bottom: 1px solid var(--c-border);
  }
  padding: 2rem 0 2em 2.5rem;
  padding-top: 0;
  width: var(--total-width);
}
.newsletter {
  padding: 1.8rem 2.3rem;
  margin: 0 auto;
  padding-top: 1rem;
  padding-bottom: 1rem;
  overflow: auto;
  width: auto;
}
.read-mode {
  .blog-header-outer {
    padding: 2rem 2.5em 2em 2.5rem;
  }
}
@media (max-width: 1500px) {
  .blog-header-outer {
    padding: 0;
    max-width: var(--content-width);
    h1 {
      padding: 0 2.5rem;
    }
    .blog-header {
      border-bottom: 0;
      padding: 0 2.5rem;
      padding-bottom: 1em;
    }
  }
}
@media (max-width: $MQNarrow) {
  .page-wrapper-inner {
    max-width: auto;
    width: 100%;
  }
  .blog-header-outer {
    max-width: auto;
    width: 100%;
  }
  .blog-header-outer {
    h1 {
      padding: 0 2rem;
    }
    .blog-header {
      padding: 0 2rem;
    }
  }
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
  .blog-header-outer {
    h1 {
      padding: 0 1.5rem;
    }
    .blog-header {
      padding: 0 1.5rem;
    }
  }

}
</style>
