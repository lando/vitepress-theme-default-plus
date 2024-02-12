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
        :href="tag.href"
      >
        <Tag :text="tag.name" />
      </Link>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue';
import {useData} from 'vitepress';
import Tag from './VPLCollectionTag.vue';
import Link from './VPLLink.vue';

const {frontmatter, theme} = useData();
const ptags = frontmatter?.value?.tags ?? [];
const tagLinkPattern = theme?.value?.tagLink;

const tags = computed(() => ptags.map(tag => {
  // get tag details
  const details = theme?.value?.tags?.[tag];
  // set the link data
  const data = {key: tag, name: tag, href: details?.link};
  // if href is unset and we have a tagLinkPattern then use that
  if (!data.href && tagLinkPattern) data.href = tagLinkPattern.replace(':tag', tag);
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
