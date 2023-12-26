import './styles/vars.scss';
import './styles/styles.scss';

import {VPBTheme} from '@jcamp/vitepress-blog-theme';
import {enhanceAppWithTabs} from 'vitepress-plugin-tabs/client';
import {defineAsyncComponent} from 'vue';

// layouts
import Layout from './components/VPLLayout.vue';

// global components
import VPLJobs from './components/VPLJobs.vue';
import VPLMailChimp from './components/VPLMailChimp.vue';
import VPLSponsors from './components/VPLSponsors.vue';
import VPLYouTube from './components/VPLYouTube.vue';

// components
export {default as VPLAlert} from './components/VPLAlert.vue';
export {default as VPLMenuGroup} from './components/VPLMenuGroup.vue';
export {default as VPLMenuLink} from './components/VPLMenuLink.vue';
export {default as VPLNavBarMenuGroup} from './components/VPLNavBarMenuGroup.vue';

// composables
export {default as isActive} from './utils/is-active';

const theme = {
  ...VPBTheme,
  extends: VPBTheme,
  Layout,
  enhanceApp({app, router, siteData}) {
    // get site config
    const {themeConfig} = siteData.value;

    // register global components
    app.component('Jobs', VPLJobs);
    app.component('MailChimp', VPLMailChimp);
    app.component('Sponsors', VPLSponsors);
    app.component('YouTube', VPLYouTube);

    // register any custom layouts
    for (const [name, layout] of Object.entries(themeConfig.layouts)) {
      app.component(name, defineAsyncComponent(() => import(layout)));
    }

    // enhance app for tabbin
    enhanceAppWithTabs(app);
  },
};

export {theme as VPLTheme};
