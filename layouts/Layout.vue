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
import {Transition} from 'vue'; // eslint-disable-line no-unused-vars
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
const {showCarbonAds, showSponsors} = themeData.value;
// Handle scrollBehavior with transition
const scrollPromise = useScrollPromise();
const onBeforeEnter = scrollPromise.resolve;
const onBeforeLeave = scrollPromise.pending;
</script>

<style lang="scss">
@import '../styles/main.scss';
</style>
