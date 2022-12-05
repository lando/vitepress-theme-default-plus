<template>
  <div class="alert-banner">
    <div class="alert-content">
      <span>
        some content and then like a <a href="/.">link to something else that is good and right .</a>
      </span>
      <span>
        <button
          class="alert-dismiss-button"
          @click="dismissAlert"
        >
          [x] dismiss.
        </button>
      </span>
    </div>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref, watch} from 'vue';
import {useThemeLocaleData} from '@vuepress/theme-default/client';
import {usePageFrontmatter} from '@vuepress/client';

const themeLocale = useThemeLocaleData();
const frontmatter = usePageFrontmatter();
const isAlertMode = ref(frontmatter.value.alert || themeLocale.value.alert);

const update = (value = isAlertMode.value) => {
  const htmlEl = window.document.querySelector('html');
  htmlEl.classList.toggle('alert', value);
};

const dismissAlert = () => {
  update(false);
};

onMounted(() => {
  watch(isAlertMode, update, {immediate: true});
});
onUnmounted(() => update());
</script>

<style lang="scss" scoped>
@import '../../styles/main.scss';
.alert-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--alert-height);
  background-color: var(--c-brand);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--c-bg-lighter);
  font-size: 0.95rem;
  font-weight: 500;
  a {
    color: var(--c-bg-lighter);
    font-weight: 800;
    &:hover {
      text-decoration: underline;
    }
  }
  .alert-dismiss-button {
    color: var(--c-bg-lighter);
    font-size: 1rem;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
