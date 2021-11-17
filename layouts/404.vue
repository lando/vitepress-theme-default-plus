<template>
  <ParentLayout />
</template>

<script>
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/404.vue';
export default {
  name: 'FourOhFour',
  components: {ParentLayout},
};
</script>

<style lang="scss">
@import '../styles/main.scss';
</style>
