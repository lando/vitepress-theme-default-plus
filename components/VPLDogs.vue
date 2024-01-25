<template>
  <Page>
    <template #doc-top>
      <img src="https://i.pinimg.com/originals/4c/d9/ce/4cd9ce636c6d5f23688f0fda99cd81cf.gif">
    </template>
    <template #doc-before>
      <img src="https://i.pinimg.com/originals/4c/d9/ce/4cd9ce636c6d5f23688f0fda99cd81cf.gif">
    </template>
    <template #doc-after>
      <img src="https://i.pinimg.com/originals/4c/d9/ce/4cd9ce636c6d5f23688f0fda99cd81cf.gif">
    </template>
    <template #doc-bottom>
      <img src="https://i.pinimg.com/originals/4c/d9/ce/4cd9ce636c6d5f23688f0fda99cd81cf.gif">
    </template>
    <template #aside-top>
      aside-top
    </template>
    <template #aside-outline-before>
      aside-outline-before
    </template>
    <template #aside-outline-after>
      aside-outline-after
    </template>
    <template #aside-ads-before>
      aside-ads-before
    </template>
    <template #aside-ads-after>
      aside-ads-after
    </template>
    <template #aside-bottom>
      aside-bottom
    </template>

    <div class="cat-container">
      CATVIBES
      <Content />
    </div>
  </Page>
</template>

<script setup>
import Page from 'vitepress/dist/client/theme-default/components/VPDoc.vue';
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

