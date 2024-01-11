<template>
  <div class="collection-header">
    <div class="collection-type">
      <Icon
        v-if="collection !== false"
        v-bind="collection"
      />
    </div>
    <div class="collection-avatars">
      <div class="label">
        By
        <VPLink
          v-for="(author, index) in authors"
          :key="author.name"
          :href="getLink(author)"
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
import {computed} from 'vue';
import {useData} from 'vitepress';

import {default as Author} from './VPLTeamMembersItem.vue';
import {default as Icon} from '../components/VPLCollectionIcon.vue';
import VPLink from '@default-theme/components/VPLink.vue';

const {frontmatter, page, theme} = useData();
const {contributors} = page.value;

const getContributor = id => contributors.find(contributor => contributor.email === id)
  ?? contributors.find(contributor => contributor.name === id);

const getLink = member => {
  if (member.link) return member.link;
  else if (Array.isArray(member?.links) && member.links[0]) return member.links[0].link;
  else if (member.email) return `mailto:${member.email}`;
};

const getSeparator = (index, end = 0) => {
  return index + 1 === end ? '' : ', ';
};

const authors = computed(() => {
  // try to get artists from frontmatter and if nothing then grab first contributor
  let data = frontmatter.value.authors ?? frontmatter.value.author ?? contributors?.[0] ?? [];
  // if data is not an array then make it one
  if (!Array.isArray(data)) data = [data];

  return data
    .map(author => typeof author === 'string' ? getContributor(author) : author)
    .filter(author => author && author !== false && author !== null);
});

const collection = computed(() => {
  // if there is no collection info then return false or whatever
  if (frontmatter.value.collection === undefined) return false;
  // if frontmatter collection is a string then return the matching theme collection data if we have one
  if (typeof frontmatter.value.collection === 'string') {
    if (theme.value?.collections[frontmatter.value.collection]) {
      const {link, icon} = theme.value?.collections[frontmatter.value.collection];
      return {icon, link, title: frontmatter.value.collection};
    }
  }
  // otherwise assume collection is an object and just return that
  return frontmatter.value.collection;
});

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
    gap: 3px;
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
