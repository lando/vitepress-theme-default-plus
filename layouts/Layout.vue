<template>
  <div class="layout-wrapper">
    <slot name="right-bar">
      <div class="right-bar">
        <slot name="right-bar-top" />
        <Sponsors v-if="sponsors.enabled" />
        <SocialLinks
          v-if="social.enabled"
          :icons="social.icons"
        />
        <slot name="right-bar-bottom" />
      </div>
    </slot>

    <ParentLayout>
      <template #sidebar-top>
        <CarbonAds
          v-if="carbonAds.enabled"
          :placement="carbonAds.placement"
          :serve="carbonAds.serve"
        />
        <SidebarHeader
          v-if="sidebarHeader.enabled"
          :title="sidebarHeader.title"
          :version="sidebarHeader.version"
          :link="sidebarHeader.versionLink"
          :icon="sidebarHeader.icon"
        />
        <SocialLinks
          v-if="social.enabled"
          :icons="social.icons"
        />
      </template>

      <template #page>
        <Transition
          name="fade-slide-y"
          mode="out-in"
          @before-enter="onBeforeEnter"
          @before-leave="onBeforeLeave"
        >
          <Home v-if="frontmatter.home" />
          <Guide
            v-else-if="frontmatter.guide"
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
import Home from '@vuepress/theme-default/lib/client/components/Home.vue';
import Page from '@vuepress/theme-default/lib/client/components/Page.vue';

// Theme components
import CarbonAds from '../components/CarbonAds.vue';
import Guide from '../components/Guide.vue';
import SidebarHeader from '../components/SidebarHeader.vue';
import SocialLinks from '../components/SocialLinks.vue';
import Sponsors from '../components/SponsorsList.vue';

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
</style>
