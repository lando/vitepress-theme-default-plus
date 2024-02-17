<template>
  <div class="post-header">
    <Icon
      v-if="collection !== false"
      :icon="icon"
      :link="iconLink"
      :title="collection"
    />
    <span v-if="authors.length > 0">by</span>
    <div
      v-if="authors.length > 0"
      class="post-avatars"
    >
      <Author
        v-for="author in authors"
        :key="author.name"
        size="icon"
        :member="author"
      />
    </div>
    <Link
      v-for="(author, index) in authors"
      :key="author.name"
      :href="author.link"
      no-icon
    >
      <span class="underline">{{ author.name }}</span><span class="separator">{{ getSeparator(index, authors.length) }}</span>
    </Link>
    <span v-if="hlocation">from</span>
    <span
      v-if="hlocation"
      class="location"
    >
      {{ hlocation }}
    </span>
    on
    <time
      class="date"
      :datetime="datetime"
    >
      {{ hdate }}
    </time>
  </div>
</template>

<script setup>
import {computed} from 'vue';
import {useData} from 'vitepress';

import Author from './VPLTeamMembersItem.vue';
import Icon from './VPLCollectionIcon.vue';
import Link from './VPLLink.vue';

const {frontmatter, page} = useData();

const authors = computed(() => frontmatter.value?.authors ?? false);
const collection = computed(() => frontmatter.value?.collection ?? false);
const datetime = computed(() => page.value?.datetime ?? false);
const icon = computed(() => page.value?.collection?.icon ?? false);
const iconLink = computed(() => page.value?.collection?.iconLink ?? false);

const getSeparator = (index, end = 0) => {
  return index + 1 === end ? '' : ', ';
};

const hdate = computed(() => {
  return new Date(frontmatter.value?.date ?? page.value?.lastUpdated ?? page.value?.timestamp).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});

const hlocation = computed(() => {
  return frontmatter.value?.location ?? authors?.[0]?.location ?? false;
});

</script>

<style lang="scss" scoped>
.post-header {
  align-items: flex-start;
  z-index: 1;
  display: flex;
  gap: 4px;
  font-size: .75em;
  margin-bottom: 24px;

  a {
    font-weight: 500;
    color: color-mix(in srgb, var(--vp-c-brand-1) 90%, white);
    .underline {
      text-underline-offset: 2px;
      text-decoration: underline;
    }
    .separator {
      color: var(--vp-c-text-3);
      text-decoration: none;
    }
  }

  .location, .date {
    font-weight: 700;
    color: var(--vp-c-text-2);
  }

  .post-avatars {
    display: flex;
    justify-content: flex-end;

    .VPTeamMembersItem.icon {
      overflow: visible;
      &:not(:first-child) {
        margin-left: -14px;
      }
    }
  }
}
</style>
