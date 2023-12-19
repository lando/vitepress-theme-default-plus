import './styles/vars.scss';
import './styles/styles.scss';

import {h} from 'vue';
import {VPBTheme} from '@jcamp/vitepress-blog-theme';
import {enhanceAppWithTabs} from 'vitepress-plugin-tabs/client';


// global components
import VPLJobs from './components/VPLJobs.vue';
import VPLMailChimp from './components/VPLMailChimp.vue';
import VPLSponsors from './components/VPLSponsors.vue';
import VPLYouTube from './components/VPLYouTube.vue';

// layout
// import Layout from './Layout.vue'

// components
// export { default as VPImage } from './components/VPImage.vue'
// export { default as VPButton } from './components/VPButton.vue'
// export { default as VPHomeHero } from './components/VPHomeHero.vue'
// export { default as VPHomeFeatures } from './components/VPHomeFeatures.vue'
// export { default as VPHomeSponsors } from './components/VPHomeSponsors.vue'
// export { default as VPDocAsideSponsors } from './components/VPDocAsideSponsors.vue'
// export { default as VPSponsors } from './components/VPSponsors.vue'
// export { default as VPTeamPage } from './components/VPTeamPage.vue'
// export { default as VPTeamPageTitle } from './components/VPTeamPageTitle.vue'
// export { default as VPTeamPageSection } from './components/VPTeamPageSection.vue'
// export { default as VPTeamMembers } from './components/VPTeamMembers.vue'

// export { useSidebar } from './composables/sidebar'

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

    // register global components
    app.component('Jobs', VPLJobs);
    app.component('MailChimp', VPLMailChimp);
    app.component('Sponsors', VPLSponsors);
    app.component('YouTube', VPLYouTube);

    // enhance app for tabbin
    enhanceAppWithTabs(app);
  },
};

export {theme as VPLTheme};
