// styles
import './styles/vars.scss';
import './styles/styles.scss';

// client stuff
import {default as enhanceAppWithLayouts} from './client/enhance-app-with-layouts.js';
import {enhanceAppWithTabs} from 'vitepress-plugin-tabs/client';

// layouts
import DefaultTheme from 'vitepress/theme';
import Layout from './components/VPLLayout.vue';

// global components
import VPLJobs from './components/VPLJobs.vue';
import VPLMailChimp from './components/VPLMailChimp.vue';
import VPLSponsors from './components/VPLSponsors.vue';
import VPLYouTube from './components/VPLYouTube.vue';

// composables
export {default as isActive} from './client/is-active.js';
export {default as encodeTag} from './client/encode-tag.js';
export {default as useCollection} from './client/use-collection.js';
export {default as useTeam} from './client/use-team.js';

// components
export {default as VPLAlert} from './components/VPLAlert.vue';
export {default as VPLLink} from './components/VPLLink.vue';
export {default as VPLMenuGroup} from './components/VPLMenuGroup.vue';
export {default as VPLMenuLink} from './components/VPLMenuLink.vue';
export {default as VPLNavBarMenuGroup} from './components/VPLNavBarMenuGroup.vue';

// team page
export {default as VPLTeamMembersItem} from './components/VPLTeamMembersItem.vue';
export {default as VPLTeamMembers} from './components/VPLTeamMembers.vue';
export {VPTeamPage as VPLTeamPage} from 'vitepress/theme';
export {VPTeamPageTitle as VPLTeamPageTitle} from 'vitepress/theme';
export {VPTeamPageSection as VPLTeamPageSection} from 'vitepress/theme';

// collection page
export {default as VPLCollectionItem} from './components/VPLCollectionItem.vue';
export {default as VPLCollectionItemTags} from './components/VPLCollectionItemTags.vue';
export {default as VPLCollectionItems} from './components/VPLCollectionItems.vue';
export {default as VPLCollectionPage} from './components/VPLCollectionPage.vue';
export {default as VPLCollectionPageTags} from './components/VPLCollectionPageTags.vue';
export {default as VPLCollectionPageTitle} from './components/VPLCollectionPageTitle.vue';
export {default as VPLCollectionPageSection} from './components/VPLCollectionPageSection.vue';

const theme = {
  extends: DefaultTheme,
  Layout,
  async enhanceApp({app, router}) {
    // register global components
    app.component('Jobs', VPLJobs);
    app.component('MailChimp', VPLMailChimp);
    app.component('Sponsors', VPLSponsors);
    app.component('YouTube', VPLYouTube);

    // enhance app for tabbin
    enhanceAppWithTabs(app);
    // enhance app with layouts
    enhanceAppWithLayouts(app);

    // add query tags if we can
    if (!import.meta.env.SSR) {
      const params = new URLSearchParams(window.location.search);
      router.route.tags = [params.get('tag'), params.get('tags')]
        .filter(param => param && param !== null && typeof param === 'string')
        .map(param => param.split(','))
        .flat(Infinity);
    }
  },
};

export default theme;
