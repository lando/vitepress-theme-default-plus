<template>
  <div
    v-if="tag && content.length > 0"
    class="related-guides"
  >
    <h2>Related Guides and Tutorials</h2>
    <ul>
      <li
        v-for="page in content"
        :key="page.key"
      >
        <a :href="page.path">{{ page.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import {resolveSidebarItems} from '@vuepress/theme-default/lib/client/composables/useSidebarItems.js';
import {useThemeData} from '@vuepress/plugin-theme-data/lib/client';

export default {
  name: 'RelatedGuides',
  props: {
    tag: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      content: [],
    };
  },
  mounted() {
    const themeData = useThemeData();
    const guides = resolveSidebarItems(this.$frontmatter, themeData);
    console.log(guides);
    const section = guides.find(item => item.title.toLowerCase() === this.tag.toLowerCase());
    this.content = section.children;
  },
};
</script>

<style lang="scss">
@import '../styles/main.scss';

.related-guides {
  margin-top: 2rem;
  padding-top: 1rem;
  a {
    display: block;
    padding-bottom: 0.3em;
  }
}

</style>
