import {defineClientAppEnhance} from '@vuepress/client';
import {h} from 'vue';
import DocsearchPlus from './../global/DocsearchPlus.vue';

const options = {...__THEME_OPTIONS__, ...__DOCSEARCH_OPTIONS__};

export default defineClientAppEnhance(({app, router, siteData}) => {
  // Add in the new docsearch component if it makes sense
  if (options.search.apiKey && options.search.indexName) {
    app.component('DocsearchPlus', () => h(DocsearchPlus, {options}));
  }

  // Rework the navbarsearch component to use our Docsearch instead
  delete app._context.components.NavbarSearch;
  app.component('NavbarSearch', () => {
    const SearchComponent = app.component('DocsearchPlus') || app.component('SearchBox');
    if (SearchComponent && options.search.enabled) return h(SearchComponent);
    return null;
  });
});
