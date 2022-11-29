import {defineClientConfig} from '@vuepress/client';
import {h} from 'vue';
import DocsearchPlus from './DocsearchPlus.vue';

const options = {...__THEME_OPTIONS__, ...__DOCSEARCH_OPTIONS__};

export default defineClientConfig({
  enhance({app, router, siteData}) {
    // Add in the new docsearch component if it makes sense
    if (options.apiKey && options.indexName) {
      app.component('DocsearchPlus', () => h(DocsearchPlus, {options, searchBase: options.searchBase}));
    }

    // Rework the navbarsearch component to use our Docsearch instead
    delete app._context.components.NavbarSearch;
    app.component('NavbarSearch', () => {
      const SearchComponent = app.component('DocsearchPlus') || app.component('SearchBox');
      if (SearchComponent && options.search) return h(SearchComponent);
      return null;
    });
  },
});
