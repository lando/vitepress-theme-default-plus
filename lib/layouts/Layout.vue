<template>
  <ParentLayout>
    <template #sidebar-top>
      <CarbonAds v-if="showCarbonAds" />
    </template>
    <template #page-top>
      <Sponsors v-if="showSponsors" />
    </template>
  </ParentLayout>
</template>

<script setup>
import { computed } from 'vue'
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
import CarbonAds from '../components/CarbonAds.vue';
import Sponsors from '../components/Sponsors.vue';
import { useThemeData } from '@vuepress/plugin-theme-data/lib/client'

// Get theme data
const themeData = useThemeData();
// Get the config from themedata
const {showCarbonAds = true} = themeData.value;
const {showSponsors = true} = themeData.value;

</script>

<style lang="scss">
@import '../styles/index.scss';
@import '../styles/palette.scss';
@import '@vuepress/plugin-palette/palette';
</style>
