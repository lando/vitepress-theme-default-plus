import {defineClientAppEnhance} from '@vuepress/client';
import {h} from 'vue';
import DocsearchPlus from './../components/DocsearchPlus';

const options = {...__THEME_OPTIONS__, ...__DOCSEARCH_OPTIONS__};

export default defineClientAppEnhance(({app, router, siteData}) => {
  // Add in the new docsearch component if it makes sense
  if (options.searchSettings.apiKey && options.searchSettings.indexName) {
    app.component('DocsearchPlus', () => h(DocsearchPlus, {options}));
  }

  // Rework the navbarsearch component to use our Docsearch instead
  delete app._context.components.NavbarSearch;
  app.component('NavbarSearch', () => {
    const SearchComponent = app.component('DocsearchPlus') || app.component('SearchBox');
    if (SearchComponent && options.showSearch) return h(SearchComponent);
    return null;
  });
});
