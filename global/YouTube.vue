<template>
  <div
    v-if="url"
    class="video-responsive"
  >
    <iframe
      width="100%"
      height="400"
      :src="url"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
</template>

<script setup>
import {computed} from 'vue';
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const url = computed(() => `https://www.youtube.com/embed/${props.id}`);
</script>

<style lang="scss">
@import '../styles/main.scss';

.video-responsive {
  margin-top: 1em;
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;
  height: 0;
  iframe {
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
  }
}
</style>
