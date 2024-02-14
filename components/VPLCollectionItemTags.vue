<template>
  <div
    v-if="tags.length > 0"
    class="aside-tags-wrapper"
  >
    <span class="ad-header">Tags</span>
    <div class="aside-tags">
      <Link
        v-for="tag in tags"
        :key="tag.key"
        :no-icon="true"
        :href="tag.href"
        target="_self"
      >
        <Tag :text="tag.name" />
      </Link>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue';
import {useData} from 'vitepress';
import encodeTag from '../client/encode-tag.js';

import Link from './VPLLink.vue';
import Tag from './VPLCollectionTag.vue';

const {frontmatter, theme} = useData();
const ptags = frontmatter?.value?.tags ?? [];
const tagLinkPattern = theme?.value?.tagLink;

const tags = computed(() => ptags.map(tag => {
  // get tag details
  const details = theme?.value?.tags?.[tag];
  // set the link data
  const data = {key: tag, name: tag, href: details?.link};
  // if href is unset and we have a tagLinkPattern then use that
  if (!data.href && tagLinkPattern && tagLinkPattern.includes(':tag-id')) data.href = tagLinkPattern.replace(':tag-id', encodeTag(tag));
  // if href is unset and we have a tagLinkPattern then use that
  if (!data.href && tagLinkPattern && tagLinkPattern.includes(':tag')) data.href = tagLinkPattern.replace(':tag', tag);
  // just use the tagLink pattern
  if (!data.href && tagLinkPattern) data.href = tagLinkPattern;
  // return
  return data;
}).filter(tag => tag.href !== undefined));

</script>

<style scoped>
.aside-tags-wrapper .ad-header {
  margin: 0;
}
.aside-tags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 12px 0;
  gap: 5px;

  .tag {
    font-size: 10px;
  }
}

</style>
