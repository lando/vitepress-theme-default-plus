<template>
  <div
    id="versions-list"
    class="versions-list"
  >
    <ul>
      <li
        v-for="(version, index) in props.versions"
        :key="index"
      >
        <a v-bind="version">{{ version.name }}</a>
      </li>
    </ul>
    <div v-if="edgeVersion">
      Or check out bleeding edge documentation over on the <a v-bind="edgeVersion">{{ edgeVersion.name }}</a> branch!
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  edgeVersion: {
    type: Object,
    default: null,
  },
  versions: {
    type: Array,
    required: true,
  },
});
console.log(props);
</script>

<style lang="scss">
@import '../styles/main.scss';
</style>
