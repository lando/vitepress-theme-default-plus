<template>
  <div class="layout-wrapper">
    <ParentLayout>
      <template #navbar-after>
        <SocialLinks
          v-if="social"
          :icons="social"
        />
      </template>
      <template #sidebar-top>
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

      <template #page>
        <div class="page-wrapper-outer">
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
                :key="page.path"
              >
                <template #top />
                <template #bottom />
              </Component>
              <Page
                v-else
                :key="page.path"
              >
                <template #top />
                <template #bottom />
              </Page>
            </Transition>

            <slot name="right-bar">
              <slot name="right-bar-top" />
              <div
                v-if="showRightbar"
                class="rightbar"
              >
                <TOC v-if="toc && frontmatter.toc !== false" />
                <Sponsors v-if="sponsors && frontmatter.sponsors !== false" />
                <ReadMode
                  v-if="readMode && frontmatter.readMode !== false"
                  :distract-name="readMode.distractName"
                  :focus-name="readMode.focusName"
                />
              </div>
              <slot name="right-bar-bottom" />
            </slot>
          </div>
        </div>
      </template>
    </ParentLayout>
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
import CarbonAds from '../components/CarbonAds.vue';
import SocialLinks from '../components/SocialLinks.vue';
import Sponsors from '../global/Sponsors.vue';
import TOC from '../components/TOC.vue';

// Plugin components
import SidebarHeader from './../plugins/plugin-sidebar-header/SidebarHeader.vue';
import ReadMode from './../plugins/plugin-read-mode/ReadMode.vue';

// Get data
const frontmatter = usePageFrontmatter();
const page = usePageData();
const themeData = useThemeData();
// Get the config from themedata
const {carbonAds, pageTypes, readMode, rightbar, sidebarHeader, social, sponsors, toc} = themeData.value;

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
    || (sponsors && frontmatter.value.sponsors !== false)
    || (toc && frontmatter.value.toc !== false);
});

// Figure out if we need to show a given page type
const showCustomPageType = computed(() => getTruthyPageTypes().length > 0);
// Get the custom page type component
const pageType = computed(() => pageTypes.find(page => page.key === getTruthyPageTypes()[0]));

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
  padding-top: var(--navbar-height);
  padding-left: var(--sidebar-width);
  display: flex;
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
  width: var(--rightbar-width);
  padding-left: 0;
  position: sticky;
  top: var(--navbar-height);
  margin-top: calc(0.5rem - var(--navbar-height));
  padding-top: calc(-2rem + var(--navbar-height));
  .header {
    color: var(--c-text-light);
    display: block;
    margin: 3em 0 1em;
    font-weight: 700;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: .4px;
  }
}

.read-mode {
  .sidebar {
    transform: translateX(-100%);
  }
  .navbar {
    transform: translateY(-100%);
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
