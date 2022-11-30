<template>
  <footer
    v-if="show"
    class="page-meta"
  >
    <div class="page-meta-inner">
      <div class="page-meta-inner-right">
        <div
          v-if="lastUpdated"
          class="meta-item last-updated"
        >
          <ClientOnly>
            <span class="meta-item-info">{{ themeLocale.lastUpdatedText }} {{ lastUpdated }}</span>
          </ClientOnly>
        </div>
        <div
          v-if="props.editNavLink"
          class="meta-item edit-link"
        >
          <AutoLink
            class="meta-item"
            :item="props.editNavLink"
          />
        </div>
      </div>

      <div
        v-if="props.contributors && props.contributors.length"
        class="meta-item contributors"
      >
        <span class="meta-item-label">
          {{ themeLocale.contributorsText }}
        </span>
        <span class="meta-item-info">
          <span
            v-for="(contributor, index) in props.contributors"
            :key="index"
            class="contributor"
            :title="contributor.title"
          >
            <img
              class="meta-item-avatar"
              :src="contributor.pic"
              :alt="contributor.alt"
              :title="contributor.title"
              width="30"
              height="30"
            >
          </span>
        </span>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Deps
import {computed} from 'vue';
import blueimpMd5 from 'blueimp-md5';
import * as timeago from 'timeago.js';

// Stuff from parent theme
import {usePageData, usePageFrontmatter} from '@vuepress/client';
import {useThemeLocaleData} from '@vuepress/theme-default/client';
import {resolveEditLink} from '@vuepress/theme-default/client';
import AutoLink from '@vuepress/theme-default/components/AutoLink.vue';

const props = defineProps({
  contributors: {
    type: Array,
    default: () => {
      const themeLocale = useThemeLocaleData();
      const page = usePageData();
      const frontmatter = usePageFrontmatter();
      const showContributors = frontmatter.value.hasOwnProperty('contributors')
        ? frontmatter.value.contributors : themeLocale.value.contributors || false;

      if (!showContributors || !page.value.git) return false;

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
        contributor.alt = `Picture of ${contributor.name}`;
        contributor.title = `${contributor.name} (${contributor.email}) - ${contributor.commits} commits`;
        contributor.link = `mailto:${contributor.email}`;
      });
      return contributors;
    },
  },
  editNavLink: {
    type: Object,
    default: () => {
      const themeLocale = useThemeLocaleData();
      const page = usePageData();
      const frontmatter = usePageFrontmatter();

      const showEditLink = frontmatter.value.hasOwnProperty('editLink')
        ? frontmatter.value.editLink : themeLocale.value.editLink || false;

      // Bail quick if we can
      if (!showEditLink) return false;
      const {
        sourceRepo,
        docsRepo = sourceRepo,
        docsBranch = 'main',
        docsDir = '',
        editLinkText,
      } = themeLocale.value;

      // Try to bail again
      if (!docsRepo) return false;
      const editLink = resolveEditLink({
        docsRepo,
        docsBranch,
        docsDir,
        filePathRelative: page.value.filePathRelative,
        editLinkPattern: frontmatter.value.editLinkPattern || themeLocale.value.editLinkPattern,
      });

      // Final bail attemp
      if (!editLink) return false;
      return {text: editLinkText || 'Edit this page', link: editLink};
    },
  },
  lastUpdated: {
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
// compute show
const show = computed(() => props.contributors || props.editNavLink || props.lastUpdated);
// compute last updated
const hasLastUpdated = computed(() => props.lastUpdated && props.lastUpdated.timestamp !== null && props.lastUpdated.timestamp !== false);
const lastUpdated = computed(() => {
  if (!hasLastUpdated.value) return null;
  const updatedDate = new Date(props.lastUpdated.timestamp);
  return timeago.format(updatedDate.toLocaleString());
});
</script>

<style lang="scss" scoped>
@import '../styles/main.scss';
.page-meta {
 .meta-item {
   a {
     cursor: pointer;
   }
 }
}
.page-meta-inner {
  border-top: 1px solid var(--c-border);
  font-size: small;
  .meta-item.contributors {
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 10px;
  }
  .meta-item-avatar {
    border-radius: 50% !important;
    margin: 2px;
    margin-top: 10px;
  }
  .meta-item-label {
    font-weight: 400;
    color: var(--c-text-quote);
  }
  .page-meta-inner-right {
    float: right;
    .last-updated {
      float: none;
      text-align: right;
    }
    .edit-link {
      cursor: pointer;
      display: block;
    }
  }
}
</style>
