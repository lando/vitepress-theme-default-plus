import {defineClientAppEnhance} from '@vuepress/client';
import {h} from 'vue';
const options = {...__THEME_OPTIONS__, ...__DOCSEARCH_OPTIONS__};

export default defineClientAppEnhance(({app, router, siteData}) => {
  delete app._context.components.NavbarSearch;

  app.component('NavbarSearch', () => {
    const SearchComponent = app.component('Docsearch2');
    if (SearchComponent) {
      return h(SearchComponent, {options});
    }
    return null;
  });
});
