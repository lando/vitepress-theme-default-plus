<template>
  <div class="byline">
    <div class="authors">
      <span
        v-if="hasAuthors"
        class="author-label"
      >
        Written by:
      </span>
      <span
        v-for="author in authors"
        :key="author.name"
        class="author"
      >
        <a
          :href="author.link"
          target="_blank"
        >{{ author.name }}</a>{{ author.separator }}
      </span>
      <div
        v-if="hasLastUpdated"
        class="last-updated"
      >
        {{ themeLocale.lastUpdatedText }} {{ lastUpdated }}
      </div>
    </div>
    <div class="pics">
      <span
        v-for="author in authors"
        :key="author.name"
        class="pic"
      >
        <a
          :href="author.link"
          target="_blank"
        ><img
          :src="author.pic"
          :alt="author.name"
          class="custom"
        ></a>
      </span>
    </div>
  </div>
</template>

<script setup>
// Deps
import blueimpMd5 from 'blueimp-md5';
import * as timeago from 'timeago.js';
import {computed} from 'vue';
import {usePageData, usePageFrontmatter} from '@vuepress/client';
import {useThemeLocaleData} from '@vuepress/theme-default/client';

const props = defineProps({
  authors: {
    type: Array,
    default: () => {
      const frontmatter = usePageFrontmatter();
      const themeLocale = useThemeLocaleData();
      const page = usePageData();
      const showContributors = frontmatter.value.hasOwnProperty('contributors')
        ? frontmatter.value.contributors : themeLocale.value.contributors || false;

      if (!showContributors || !page.value.git) return [];

      // Filter contributors as defined in config.
      const contributorsExclude = themeLocale.value.contributorsExclude || [];
      const contributors = page.value.git.contributors !== undefined
        ? page.value.git.contributors.filter(contributor => !contributorsExclude.includes(contributor.name))
        : [];

      // add in gravatar things
      contributors.forEach(contributor => {
        const gravatarUrl = new URL('https://gravatar.com/avatar/');
        gravatarUrl.pathname += blueimpMd5(contributor.email);
        gravatarUrl.search = new URLSearchParams({size: 60});
        contributor.pic = gravatarUrl.toString();
        contributor.link = `mailto:${contributor.email}`;
      });
      return contributors;
    },
  },
  updated: {
    type: Object,
    default: () => {
      const themeLocale = useThemeLocaleData();
      const page = usePageData();
      const frontmatter = usePageFrontmatter();

      const showLastUpdated = frontmatter.value.hasOwnProperty('lastUpdated')
        ? frontmatter.value.lastUpdated : themeLocale.value.lastUpdated || false;

      if (!showLastUpdated) return false;
      if (!page.value.git || !page.value.git.updatedTime) return null;
      const timestamp = page.value.git.updatedTime;
      return {timestamp};
    },
  },
});

// Get things
const themeLocale = useThemeLocaleData();
// computed
const hasAuthors = computed(() => !!props.authors.length);
// Set authors using frontmatter or fallback to github contrib information if available
const authors = computed(() => {
  const authors = props.authors.map(author => Object.assign(author, {separator: ', '}));
  // Bail if we have no authors
  if (!hasAuthors.value) return [];
  // Otherwise process things
  const lastAuthor = authors[authors.length - 1];
  lastAuthor.separator = '';
  return authors;
});

const hasLastUpdated = computed(() => props.updated && props.updated.timestamp !== null && props.updated.timestamp !== false);
const lastUpdated = computed(() => {
  if (!hasLastUpdated.value) return null;
  const updatedDate = new Date(props.updated.timestamp);
  return timeago.format(updatedDate.toLocaleString());
});

</script>

<style lang="scss">
@import '../styles/main.scss';
.byline {
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
  .authors {
    color: var(--c-text-quote);
    font-size: 0.85em;
    width: 60%;
  }
  .last-updated {
    margin-top: 5px;
  }
  .pics {
    .pic {
      img {
        margin-left: -14px;
        border-radius: 50% !important;
        width: 30px;
        max-width: initial;
      }
    }
  }
}
</style>
