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
      <div
        v-if="header !== ''"
        class="collection-header"
      >
        <PostHeader v-if="header === 'post'" />
        <CollectionHeader v-else />
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
import {default as Contributor} from '../components/VPLTeamMembersItem.vue';
import {default as CollectionHeader} from '../components/VPLCollectionHeader.vue';
import {default as PostHeader} from '../components/VPLPostHeader.vue';

const {Layout} = DefaultTheme;

const alertKey = ref(0);
const jobsKey = ref(0);
const sponsorsKey = ref(0);
const {frontmatter, page, theme} = useData();

const getAlert = () => frontmatter.value.alert ?? theme.value.alert;
let alert = getAlert();

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

