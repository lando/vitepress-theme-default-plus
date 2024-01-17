<template>
  <div class="collection-header">
    <div class="collection-type">
      <Icon
        v-if="collection !== false"
        :icon="icon"
        :link="iconLink"
        :title="collection"
      />
    </div>
    <div
      v-if="authors.length > 0"
      class="collection-avatars"
    >
      <div class="label">
        By
        <VPLink
          v-for="(author, index) in authors"
          :key="author.name"
          :href="author.link"
          no-icon
        >
          <span class="underline">{{ author.name }}</span><span class="separator">{{ getSeparator(index, authors.length) }}</span>
        </VPLink>
      </div>
      <Author
        v-for="author in authors"
        :key="author.name"
        size="icon"
        :member="author"
      />
    </div>
  </div>
</template>

<script setup>
import {useData} from 'vitepress';

import {default as Author} from './VPLTeamMembersItem.vue';
import {default as Icon} from '../components/VPLCollectionIcon.vue';
import VPLink from '@default-theme/components/VPLink.vue';

const {frontmatter, page} = useData();

const {authors, collection} = frontmatter.value;
const {icon, iconLink} = page.value.collection;

const getSeparator = (index, end = 0) => {
  return index + 1 === end ? '' : ', ';
};

</script>

<style lang="scss" scoped>
.collection-header {
  margin-bottom: 24px;
  font-size: .75em;
  align-items: flex-start;
  z-index: 1;
  position: relative;
  display: flex;
  justify-content: space-between;
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
  .collection-type {
    display: flex;
    gap: 4px;
    align-items: center;
    color: var(--vp-c-text-2);
  }
  .collection-avatars {
    display: flex;
    justify-content: flex-end;
    .label {
      margin-right: 14px;
    }
    .VPTeamMembersItem.icon {
      overflow: visible;
      margin-left: -14px;
    }
  }
}
</style>
