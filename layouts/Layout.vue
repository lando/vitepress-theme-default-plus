<template>
  <div class="layout-wrapper">
    <ParentLayout>
      <template #navbar-before>
        <slot name="navbar-before" />
      </template>
      <template #navbar-after>
        <SocialLinks
          v-if="social"
          :icons="social"
        />
        <slot name="navbar-after" />
      </template>

      <template #sidebar-top>
        <slot name="sidebar-top" />
        <CarbonAds
          v-if="carbonAds"
          :placement="carbonAds.placement"
          :serve="carbonAds.serve"
        />
        <SidebarHeader
          v-if="sidebarHeader"
          :title="sidebarHeader.title"
          :version="sidebarHeader.version"
          :link="sidebarHeader.link"
          :icon="sidebarHeader.icon"
        />
      </template>
      <template #sidebar-bottom>
        <slot name="sidebar-bottom" />
      </template>

      <template #page>
        <div
          class="page-wrapper-outer"
          :class="pageType && pageType.key ? `page-type-${pageType.key.toLowerCase()}` : ''"
        >
          <div class="page-wrapper-inner">
            <Home v-if="frontmatter.home" />

            <Transition
              v-else
              name="fade-slide-y"
              mode="out-in"
              @before-enter="onBeforeEnter"
              @before-leave="onBeforeLeave"
            >
              <Component
                :is="pageType.name"
                v-if="showCustomPageType"
                :key="`${pageType.key}-${page.path}`"
              >
                <template #top>
                  <slot :name="`${pageType.key}-page-top`" />
                </template>
                <template #bottom>
                  <slot :name="`${pageType.key}-page-bottom`" />
                </template>
              </Component>

              <Page
                v-else
                :key="page.path"
              >
                <template #top>
                  <slot name="page-top" />
                </template>
                <template #bottom>
                  <slot name="page-bottom" />
                </template>
              </Page>
            </Transition>

            <slot name="right-bar">
              <slot name="right-bar-top" />
              <div
                v-if="showRightbar"
                class="rightbar"
              >
                <TOC v-if="toc && frontmatter.toc !== false" />
                <TagList
                  v-if="tags && frontmatter.tags !== false"
                  :tags="tags"
                />
                <ReadMode
                  v-if="readMode && frontmatter.readMode !== false"
                  :distract-name="readMode.distractName"
                  :focus-name="readMode.focusName"
                />
                <Sponsors v-if="sponsors && frontmatter.sponsors !== false" />
                <Jobs v-if="jobs && frontmatter.jobs !== false" />
              </div>
              <slot name="right-bar-bottom" />
            </slot>
          </div>
          <slot name="page-footer" />
        </div>
      </template>
    </ParentLayout>
    <slot name="footer" />
  </div>
</template>

<script setup>
// Deps
import {Transition, defineAsyncComponent, computed, inject} from 'vue'; // eslint-disable-line no-unused-vars
import {usePageData, usePageFrontmatter} from '@vuepress/client';
import {useThemeData} from '@vuepress/plugin-theme-data/lib/client';
import {useScrollPromise} from '@vuepress/theme-default/lib/client/composables';

// Parent components
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue';
import Home from '@theme/Home.vue';
import Page from '@theme/Page.vue';

// Theme components
import CarbonAds from '@theme/CarbonAds.vue';
import SocialLinks from '@theme/SocialLinks.vue';
import TOC from '@theme/TOC.vue';
import Sponsors from '../global/Sponsors.vue';

// Plugin components
import ReadMode from '@theme/ReadMode.vue';
import SidebarHeader from '@theme/SidebarHeader.vue';
import TagList from '@theme/TagList.vue';

// Get data
const frontmatter = usePageFrontmatter();
const page = usePageData();
const themeData = useThemeData();
// Get the config from themedata
const {carbonAds, jobs, pageTypes, readMode, rightbar, sidebarHeader, social, sponsors, toc} = themeData.value;

// Helpers to manage transitions
const scrollPromise = useScrollPromise();
const onBeforeEnter = scrollPromise.resolve;
const onBeforeLeave = scrollPromise.pending;

// Get list of page types that are frontmatter truth
const getTruthyPageTypes = () => {
  return pageTypes
    .map(page => page.key)
    .filter(key => frontmatter.value[key] === true);
};

// Compute rightbar visibility
const showRightbar = computed(() => {
  // Do not show on home page
  if (frontmatter.value.home === true) return false;
  // Do not show if purposefully disabled
  else if (!rightbar || frontmatter.value.rightbar === false) return false;
  // Do not show if all children components have been disabled
  return (readMode && frontmatter.value.readMode !== false)
    || (jobs && frontmatter.value.jobs !== false)
    || (sponsors && frontmatter.value.sponsors !== false)
    || (tags && frontmatter.value.tags !== false)
    || (toc && frontmatter.value.toc !== false);
});

// Figure out if we need to show a given page type
const showCustomPageType = computed(() => getTruthyPageTypes().length > 0);
// Get the custom page type component
const pageType = computed(() => pageTypes.find(page => page.key === getTruthyPageTypes()[0]));
// Get tags
const tags = computed(() => page.value.tags);
</script>

<style lang="scss">
@import '../styles/main.scss';
.lando-home {
  .page-wrapper-outer {
    padding: 0;
  }
  .page-wrapper-inner {
    max-width: none;
  }
}
.navbar {
  transition: transform var(--t-transform), background-color var(--t-color), border-color var(--t-color);
}
.navbar .site-name {
  font-family: var(--font-family-logo);
}
.page-wrapper-outer {
  transition: transform var(--t-transform), background-color var(--t-color), border-color var(--t-color);
  padding-top: calc(var(--navbar-height) + 50px);
  padding-left: var(--sidebar-width);
  display: flex;
  &.page-type-blog {
    .page-wrapper-inner {
      .rightbar {
        padding-top: 1em;
      }
    }
  }
}
.page-wrapper-inner {
  display: flex;
  align-items: flex-start;
  margin: auto;
  max-width: var(--total-width);
  flex-wrap: wrap;
  justify-content: center;
}
.page {
  width: var(--content-width);
  padding-top: 0;
  padding-left: 0;
}
.rightbar {
  transition: transform var(--t-transform), background-color var(--t-color), border-color var(--t-color);
  width: var(--rightbar-width);
  margin-left: var(--rightbar-margin);
  padding-left: 0;
  position: sticky;
  top: var(--navbar-height);
  padding-top: 3em;
  > * {
    margin-bottom: 1em;
  }
  .header {
    color: var(--c-text-light);
    display: block;
    margin: 0em 0 1em;
    font-weight: 700;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: .4px;
  }
}
.no-sidebar {
  .page-wrapper-outer {
    padding-left: 0;
  }
}
.read-mode {
  .sidebar {
    transform: translateX(-100%);
  }
  .navbar {
    transform: translateY(-100%);
  }
  .rightbar {
    transform: translateX(calc(var(--rightbar-margin) * -1));
  }
  .page-wrapper-outer {
    transform: translateX(calc(var(--sidebar-width) * -1 * .25));
  }
  .no-sidebar {
    .page-wrapper-outer {
      padding-left: inherit;
      transform: none;
    }
  }
}

@media (max-width: 1500px) {
  .rightbar {
    display: none;
  }
  .read-mode {
    .page-wrapper-outer {
      padding-top: 0;
      padding-left: 0;
    }
  }
}
@media (max-width: $MQNarrow) {
  .page-wrapper-outer {
    padding-left: var(--sidebar-width-mobile);
  }
  .page-wrapper-inner {
    width: 100%;
  }
  .page {
    width: 100%;
  }
}
@media (max-width: $MQMobile) {
  .page-wrapper-outer {
    padding-left: 0;
  }
  .page-wrapper-inner {
    width: 100%;
  }
}
</style>
