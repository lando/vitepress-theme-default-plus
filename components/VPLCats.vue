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
      <img src="https://i.pinimg.com/originals/4c/d9/ce/4cd9ce636c6d5f23688f0fda99cd81cf.gif">
    </template>
    <template #aside-outline-before>
      <img src="https://i.pinimg.com/originals/4c/d9/ce/4cd9ce636c6d5f23688f0fda99cd81cf.gif">
    </template>
    <template #aside-outline-after>
      <img src="https://i.pinimg.com/originals/4c/d9/ce/4cd9ce636c6d5f23688f0fda99cd81cf.gif">
    </template>
    <template #aside-ads-before>
      <img src="https://i.pinimg.com/originals/4c/d9/ce/4cd9ce636c6d5f23688f0fda99cd81cf.gif">
    </template>
    <template #aside-ads-after>
      <img src="https://i.pinimg.com/originals/4c/d9/ce/4cd9ce636c6d5f23688f0fda99cd81cf.gif">
    </template>
    <template #aside-bottom>
      <img src="https://i.pinimg.com/originals/4c/d9/ce/4cd9ce636c6d5f23688f0fda99cd81cf.gif">
    </template>

    <div class="cat-container">
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

