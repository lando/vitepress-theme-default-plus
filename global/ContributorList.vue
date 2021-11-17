<template>
  <div
    id="contributors-list"
    class="contributors-list"
  >
    <AsyncContributor
      v-for="(contributor, index) in props.contributors"
      :key="index"
      :name="contributor.login"
      :img="contributor.avatar_url"
      :link="contributor.html_url"
      :score="contributor.contributions"
    />
  </div>
</template>

<script setup>
import {defineAsyncComponent} from 'vue';
import Contributor from './../components/Contributor.vue';

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
  justify-content: space-between;
}
</style>
