<template>
  <div class="guide-header">
    <div class="guide-attribution">
      <div class="label">
        Written by:
        <VPLink
          v-for="(author, index) in authors"
          :key="author.name"
          :href="getLink(author)"
          no-icon
        >
          <span class="underline">{{ author.name }}</span><span class="separator">{{ getSeparator(index, authors.length) }}</span>
        </VPLink>
      </div>
    </div>
    <div class="guide-avatars">
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
import VPLink from '@default-theme/components/VPLink.vue';

// get authors
const {authors} = defineProps({
  authors: {
    type: [String, Array, Object],
    default: () => {
      const {frontmatter, page} = useData();
      const {authors, author} = frontmatter.value;
      const {contributors} = page.value;

      // helper to get author from contrib
      const getContributor = id => contributors.find(contributor => contributor.email === id)
        ?? contributors.find(contributor => contributor.name === id);

      // try to get artists from frontmatter and if nothing then grab first contributor
      let data = authors ?? author ?? contributors?.[0] ?? [];
      // if data is not an array then make it one
      if (!Array.isArray(data)) data = [data];

      return data
        .map(author => typeof author === 'string' ? getContributor(author) : author)
        .filter(author => author && author !== false && author !== null);
    },
  },
});

const getLink = member => {
  if (member.link) return member.link;
  else if (Array.isArray(member?.links) && member.links[0]) return member.links[0].link;
  else if (member.email) return `mailto:${member.email}`;
};

const getSeparator = (index, end = 0) => {
  return index + 1 === end ? '' : ', ';
};

</script>

<style lang="scss" scoped>

.guide-header {
  z-index: 1;
  position: relative;
  top: 50px;
  height: 50px;
  display: flex;
  justify-content: space-between;

  .guide-attribution {
    font-size: .85em;
    color: var(--vp-c-text-1);
    a {
      font-weight: 500;
      color: var(--vp-c-brand-1);
      .underline {
        text-decoration: underline;
        text-underline-offset: 2px;
      }
      .separator {
        color: var(--vp-c-text-3);
        text-decoration: none;
      }
    }
  }

  .guide-avatars {
    display: flex;
    justify-content: flex-end;
    .VPTeamMembersItem.icon {
      overflow: visible;
      margin-left: -14px;
    }
  }
}
</style>
