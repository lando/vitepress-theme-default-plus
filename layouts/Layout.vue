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
              <Guide
                v-if="frontmatter.guide"
                :key="page.path"
              >
                <template #top />
                <template #bottom />
              </Guide>
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
                v-if="(!frontmatter.home && frontmatter.rightbar !== false) && sponsors && frontmatter.sponsors !== false"
                class="rightbar"
              >
                <Sponsors />
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
import {Transition} from 'vue'; // eslint-disable-line no-unused-vars
import {usePageData, usePageFrontmatter} from '@vuepress/client';
import {useThemeData} from '@vuepress/plugin-theme-data/lib/client';
import {useScrollPromise} from '@vuepress/theme-default/lib/client/composables';

// Parent components
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue';
import Home from '@theme/Home.vue';
import Page from '@theme/Page.vue';

// Theme components
import CarbonAds from '../components/CarbonAds.vue';
import Guide from '../components/Guide.vue';
import SocialLinks from '../components/SocialLinks.vue';
import Sponsors from '../global/Sponsors.vue';

// Plugin components
import SidebarHeader from '../plugins/plugin-sidebar-header/SidebarHeader.vue';

// Get theme data
const frontmatter = usePageFrontmatter();
const page = usePageData();
const themeData = useThemeData();
// Get the config from themedata
const {carbonAds, sidebarHeader, social, sponsors} = themeData.value;

// Helpers to manage transitions
const scrollPromise = useScrollPromise();
const onBeforeEnter = scrollPromise.resolve;
const onBeforeLeave = scrollPromise.pending;
</script>

<style lang="scss">
@import '../styles/main.scss';
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
  padding-top: calc(1rem + var(--navbar-height));
}

@media (max-width: 1500px) {
  .rightbar {
    display: none;
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
