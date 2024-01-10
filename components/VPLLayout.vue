<template>
  <Layout :class="headerClass">
    <template #layout-top>
      <Alert
        v-if="alert"
        :key="alertKey"
        :content="alert.content"
        :closeable="alert.closeable"
        :type="alert.type"
      />
    </template>

    <template #doc-before>
      <CollectionIcon
        v-if="collection !== false"
        v-bind="collection"
      />
      <div class="doc-header">
        <GuideHeader v-if="header === 'guide'" />
        <PostHeader v-else-if="header === 'post'" />
      </div>
    </template>

    <template #aside-ads-before>
      <Jobs :key="jobsKey" />
      <Sponsors :key="sponsorsKey" />
    </template>

    <template #doc-footer-before>
      <div class="contributors">
        <div class="contributors-flex">
          <Contributor
            v-for="contributor in contributors"
            :key="contributor.key"
            size="icon"
            :member="contributor"
          />
        </div>
      </div>
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme';
import {useData} from 'vitepress';
import {computed, ref, watch} from 'vue';

import {default as Alert} from '../components/VPLAlert.vue';
import {default as CollectionIcon} from '../components/VPLCollectionIcon.vue';
import {default as Contributor} from '../components/VPLTeamMembersItem.vue';
import {default as GuideHeader} from '../components/VPLGuideHeader.vue';
import {default as PostHeader} from '../components/VPLPostHeader.vue';

const {Layout} = DefaultTheme;

const alertKey = ref(0);
const jobsKey = ref(0);
const sponsorsKey = ref(0);
const {frontmatter, page, theme} = useData();

const getAlert = () => frontmatter.value.alert ?? theme.value.alert;
let alert = getAlert();

const collection = computed(() => {
  // if there is no collection info then return false or whatever
  if (frontmatter.value.collection === undefined) return false;
  // if frontmatter collection is a string then return the matching theme collection data if we have one
  if (typeof frontmatter.value.collection === 'string') {
    if (theme.value?.collections[frontmatter.value.collection]) {
      const {link, icon} = theme.value?.collections[frontmatter.value.collection];
      return {icon, link, title: frontmatter.value.collection};
    }
  }
  // otherwise assume collection is an object and just return that
  return frontmatter.value.collection;
});

const contributors = computed(() => page.value.contributors);
const header = computed(() => frontmatter.value.collection || '');
const headerClass = computed(() => frontmatter.value.collection ? `collection-${frontmatter.value.collection}` : '');

watch(() => page.value.relativePath, () => {
  alert = getAlert();
  alertKey.value += 1;
  jobsKey.value += 1;
  sponsorsKey.value += 1;
});
</script>

<style lang="scss" scoped>
  .contributors {
    float: left;
    max-width: 70%;
    overflow: hidden;
    max-height: 70px;
  }
  .contributors-flex {
    height: 65px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
</style>

