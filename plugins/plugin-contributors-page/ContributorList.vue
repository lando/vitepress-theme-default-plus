<template>
  <div
    id="contributors-list"
    class="contributors-list"
  >
    <AsyncContributor
      v-for="(contributor, index) in props.contributors"
      :key="index"
      :name="contributor.name"
      :img="contributor.img"
      :link="contributor.link"
      :score="contributor.score"
    />
  </div>
</template>

<script setup>
import {defineAsyncComponent} from 'vue';
import Contributor from './Contributor.vue';

const AsyncContributor = defineAsyncComponent({
  loader: async () => Contributor,
});

const props = defineProps({
  contributors: {
    type: Array,
    required: true,
  },
});

</script>

<style lang="scss">
@import '../styles/main.scss';
.contributors-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
}
</style>
