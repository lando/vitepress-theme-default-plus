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
      <div
        v-if="mailchimp"
        class="newsletter-wrapper"
      >
        <MailChimp v-bind="mailchimp" />
      </div>
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme';
import {useData} from 'vitepress';
import {computed, ref} from 'vue';

import {default as Alert} from '../components/VPLAlert.vue';
import {default as CollectionHeader} from '../components/VPLCollectionHeader.vue';
import {default as MailChimp} from '../components/VPLMailchimp.vue';
import {default as PostHeader} from '../components/VPLPostHeader.vue';

const {Layout} = DefaultTheme;

const alertKey = ref(0);
const jobsKey = ref(0);
const sponsorsKey = ref(0);
const {frontmatter, theme} = useData();

const alert = computed(() => frontmatter.value.alert ?? theme.value.alert ?? false);
const header = computed(() => frontmatter.value.collection || '');
const headerClass = computed(() => frontmatter.value.collection ? `collection-${frontmatter.value.collection}` : '');
const mailchimp = computed(() => frontmatter.value?.mailchimp?.action ? frontmatter.value.mailchimp : false);

</script>

<style lang="scss" scoped>
.newsletter-wrapper {
  border-top: 1px solid var(--vp-c-divider);
  padding: 16px 0 ;
}
</style>

