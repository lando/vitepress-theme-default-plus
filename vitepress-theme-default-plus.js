// styles
import './styles/vars.scss';
import './styles/styles.scss';

// client stuff
import {default as enhanceAppWithLayouts} from './client/enhance-app-with-layouts';
import {enhanceAppWithTabs} from 'vitepress-plugin-tabs/client';
import {VPBTheme} from '@jcamp/vitepress-blog-theme';

// layouts
import Layout from './components/VPLLayout.vue';

// global components
import VPLJobs from './components/VPLJobs.vue';
import VPLMailChimp from './components/VPLMailChimp.vue';
import VPLSponsors from './components/VPLSponsors.vue';
import VPLYouTube from './components/VPLYouTube.vue';

// composables
export {default as isActive} from './utils/is-active';

// components
export {default as VPLAlert} from './components/VPLAlert.vue';
export {default as VPLMenuGroup} from './components/VPLMenuGroup.vue';
export {default as VPLMenuLink} from './components/VPLMenuLink.vue';
export {default as VPLNavBarMenuGroup} from './components/VPLNavBarMenuGroup.vue';

const theme = {
  ...VPBTheme,
  extends: VPBTheme,
  Layout,
  enhanceApp({app, router, siteData}) {
    // register global components
    app.component('Jobs', VPLJobs);
    app.component('MailChimp', VPLMailChimp);
    app.component('Sponsors', VPLSponsors);
    app.component('YouTube', VPLYouTube);

    // enhance app for tabbin
    enhanceAppWithTabs(app);
    // enhance app with tabs
    enhanceAppWithLayouts(app);
  },
};

export {theme as VPLTheme};
