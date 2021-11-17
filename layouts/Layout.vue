<template>
  <div class="layout-wrapper">
    <slot name="right-bar">
      <div class="right-bar">
        <slot name="right-bar-top" />
        <Sponsors v-if="showSponsors" />
        <slot name="right-bar-bottom" />
      </div>
    </slot>

    <ParentLayout>
      <template #sidebar-top>
        <CarbonAds v-if="showCarbonAds" />
        <div
          v-if="sidebarTitle || showVersion"
          class="sidebar-header"
        >
          <span
            v-if="sidebarTitle"
            class="sidebar-title"
          >
            {{ sidebarTitle }}
          </span>
          <span
            v-if="showVersion"
            class="sidebar-version"
          >
            <a
              v-if="page.versionLink"
              :href="page.versionLink"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Badge type="tip">{{ page.version }}</Badge>
            </a>
            <Badge
              v-else
              type="tip"
            >
              {{ page.version }}
            </Badge>
          </span>
        </div>
      </template>

      <template #page>
        <Home v-if="frontmatter.home" />
        <Transition
          v-else
          name="fade-slide-y"
          mode="out-in"
          @before-enter="onBeforeEnter"
          @before-leave="onBeforeLeave"
        >
          <CustomPage :key="page.path">
            <template #top />
            <template #bottom />
          </CustomPage>
        </Transition>
      </template>
    </ParentLayout>
  </div>
</template>

<script setup>
// Deps
import {computed, Transition} from 'vue'; // eslint-disable-line no-unused-vars
import {usePageData, usePageFrontmatter} from '@vuepress/client';
import {useThemeData} from '@vuepress/plugin-theme-data/lib/client';
import {useScrollPromise} from '@vuepress/theme-default/lib/client/composables';

// Parent components
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue';
import Home from '@vuepress/theme-default/lib/client/components/Home.vue';

// Theme components
import CarbonAds from '../components/CarbonAds.vue';
import CustomPage from '../components/CustomPage.vue';
import Sponsors from '../components/SponsorsList.vue';

// Get theme data
const frontmatter = usePageFrontmatter();
const themeData = useThemeData();
const page = usePageData();
// Get the config from themedata
const {showCarbonAds, showSponsors, sidebarTitle, showVersion} = themeData.value;
// Handle scrollBehavior with transition
const scrollPromise = useScrollPromise();
const onBeforeEnter = scrollPromise.resolve;
const onBeforeLeave = scrollPromise.pending;
</script>

<style lang="scss">
@import '../styles/main.scss';
.sidebar-header {
  display: flex;
  margin-top: 1.5rem;
  padding: 1.5rem 1.5rem 1.5rem;
  font-weight: 800;
  font-size: 1.2em;
  border-top: 1px solid var(--c-border);
  border-bottom: 1px solid var(--c-border);
  flex-direction: row;
  justify-content: space-between;
  .sidebar-version {
    margin-top: 3px;
  }
  @media (max-width: 719px) {
    font-weight: 700;
    border-bottom: 0;
    padding-bottom: 0;
    .sidebar-version {
      margin-top: 2px;
    }
  }
}
</style>
