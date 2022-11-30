<template>
  <div class="theme-container">
    <div class="theme-default-content">
      <h1>404</h1>

      <blockquote>{{ getMsg() }}</blockquote>

      <a :href="homeLink">{{ homeText }}</a>
    </div>
  </div>
</template>

<script setup>
import {useRouteLocale} from '@vuepress/client';
import {useThemeLocaleData} from '@vuepress/plugin-theme-data/client';
const routeLocale = useRouteLocale();
const themeLocale = useThemeLocaleData();
const messages = themeLocale.value.notFound ?? ['Not Found'];
const getMsg = () =>
  messages[Math.floor(Math.random() * messages.length)];
const homeLink = themeLocale.value.home ?? routeLocale.value;
const homeText = themeLocale.value.backToHome ?? 'Back to home';
</script>

<style lang="scss">
@import '../styles/main.scss';
</style>
