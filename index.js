import {h} from 'vue';
import {VPBTheme} from '@jcamp/vitepress-blog-theme';
import './styles/style.css';

const theme = {
  ...VPBTheme,
  extends: VPBTheme,
  Layout: () => {
    return h(VPBTheme.Layout, null, {
    // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({app, router, siteData}) {
    // call the base themes enhanceApp
    // register your custom global components
    // app.component('MyGlobalComponent' /* ... */)
  },
};

export {theme as VPLTheme};
