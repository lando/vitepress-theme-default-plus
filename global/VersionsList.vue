<template>
  <ul
    id="versions-list"
    class="versions-list"
  >
    <li
      v-for="(version, index) in props.versions"
      :key="index"
    >
      <a :href="version.url">{{ version.name }}</a>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  versions: {
    type: Array,
    required: true,
  },
});

</script>

<style lang="scss">
@import '../styles/main.scss';
</style>
