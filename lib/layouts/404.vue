<template>
  <ParentLayout></ParentLayout>
</template>

<script>
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/404.vue'

export default {
  components: {ParentLayout},
};
</script>

<style lang="scss">
@import '../styles/index.scss';
@import '@vuepress/plugin-palette/palette';
</style>
