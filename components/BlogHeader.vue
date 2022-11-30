<template>
  <div class="blog-header">
    <div class="byline">
      {{ props.byline }}
    </div>
    <div
      v-if="props.author.name"
      class="attribution"
    >
      <span
        v-if="props.author.pic"
        class="pic"
      >
        <a
          :href="props.author.link"
          target="_blank"
        ><img
          :src="props.author.pic"
          :alt="props.author.name"
          class="custom"
        ></a>
      </span>

      <span
        class="author"
      >
        <a
          :href="props.author.link"
          target="_blank"
        >{{ props.author.name }}</a>
      </span>

      <span class="separator">|</span>

      <span
        v-if="hasLastUpdated"
        class="last-updated"
      >
        <span
          v-if="props.author.location"
          class="prep"
        >
          From
        </span>{{ author.location }}
        <span class="prep"> On </span>{{ lastUpdated }}
      </span>
    </div>
  </div>
</template>

<script setup>
// Deps
import {computed} from 'vue';
import {usePageData, usePageFrontmatter} from '@vuepress/client';
import {useThemeLocaleData} from '@vuepress/theme-default/client';

const props = defineProps({
  author: {
    type: Object,
    default: () => ({}),
    required: true,
  },
  byline: {
    type: String,
    default: '',
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

const hasLastUpdated = computed(() => props.updated && props.updated.timestamp !== null && props.updated.timestamp !== false);
const lastUpdated = computed(() => {
  if (!hasLastUpdated.value) return null;
  const updatedDate = new Date(props.updated.timestamp);
  const abbrevDays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${abbrevDays[updatedDate.getDay()]}, ${months[updatedDate.getMonth()]} ${updatedDate.getDate()}, ${updatedDate.getFullYear()}`;
});

</script>

<style lang="scss" scoped>
@import '../styles/main.scss';
.blog-header {
  padding-bottom: 1em;
  .byline {
    padding-top: 1em;
    padding-bottom: 1em;
    line-height: 1.9;
    width: 90%;
    font-size: 1.1em;
    font-weight: 600;
    color: var(--c-text-lighter);
  }
  .attribution {
    color: var(--c-text-quote);
    font-size: 0.9em;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    a {
      font-weight: 400;
      color: var(--c-text-quote);
      &:hover {
        color: var(--c-brand);
      }
    }
    .separator {
      color: var(--c-text);
      margin-left: 5px;
      margin-right: 5px;
    }
    .prep {
      text-transform: uppercase;
      color: var(--c-text);
      font-size: .6em;
      font-weight: 700;
      margin-left: 2px;
      margin-right: 2px;
    }
    .pic {
      margin-right: 8px;
      img {
        border-radius: 50% !important;
        width: 24px;
        max-width: initial;
      }
    }
  }
}
</style>
