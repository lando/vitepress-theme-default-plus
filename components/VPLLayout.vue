<template>
  <Layout>
    <template #layout-top>
      <Alert
        v-if="alert"
        :key="alertKey"
        :content="alert.content"
        :closeable="alert.closeable"
        :type="alert.type"
      />
    </template>

    <template #aside-ads-before>
      <Jobs :key="jobsKey" />
      <Sponsors :key="sponsorsKey" />
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme';
import {useData} from 'vitepress';
import {ref, watch} from 'vue';
import {default as Alert} from '../components/VPLAlert.vue';
const {Layout} = DefaultTheme;

const alertKey = ref(0);
const jobsKey = ref(0);
const sponsorsKey = ref(0);
const {frontmatter, page, theme} = useData();

const getAlert = () => frontmatter.value.alert ?? theme.value.alert;

let alert = getAlert();

watch(() => page.value.relativePath, () => {
  alert = getAlert();
  alertKey.value += 1;
  jobsKey.value += 1;
  sponsorsKey.value += 1;
});
</script>
