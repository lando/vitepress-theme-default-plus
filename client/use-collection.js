import sortBy from 'lodash-es/sortBy.js';
import uniq from 'lodash-es/uniq.js';

import {computed, reactive} from 'vue';
import {useData, useRoute} from 'vitepress';
import {data as collections} from './collections.data.js';

export default function useCollection(type = undefined) {
  const route = useRoute();
  const path = route.path;
  const {theme} = useData();
  const themeTags = theme.value?.tags ?? {};

  function findCurrentIndex() {
    const result = pages.findIndex(p => p.url === route.path);
    if (result === -1) console.error(`content missing: ${route.path}`);
    return result;
  }

  // filter pages if needed
  const pages = type === undefined ? collections : collections.filter(page => page.type === type);

  // current
  const page = computed(() => pages[findCurrentIndex()]);

  // prev page or loop back to end unless the end is me
  const prevPage = computed(() => {
    const prev = pages[findCurrentIndex() - 1] ?? pages[pages.length - 1];
    return prev?.id !== page?.value?.id ? prev : undefined;
  });
  // next page or loop back to beginning unless the beginning is me
  const nextPage = computed(() => {
    const next = pages[findCurrentIndex() + 1] ?? pages[0];
    return next?.id !== page?.value?.id ? next : undefined;
  });

  // these are meant to replace the core next|prev nav links
  const prevnext = computed(() => ({
    prev: prevPage.value ? {text: prevPage.value.title, link: prevPage.value.url} : undefined,
    next: nextPage.value ? {text: nextPage.value.title, link: nextPage.value.url} : undefined,
  }));

  // get the tagz as well
  const sortedTags = sortBy(uniq(pages.map(page => page.tags).flat(Infinity)));
  const tags = reactive(Object.fromEntries(sortedTags.map(tag => ([tag, {
    selected: false,
    ...themeTags[tag] ?? {},
  }]))));

  // helper func to see if a set of tag filtered pages has items or not, useful for showing collection sections
  const hasItems = (items = [], tags = {}) => {
    const tagList = Object.entries(tags).filter(pair => pair[1].selected === true).map(pair => pair[0]);
    const filteredItems = items.filter(item => tagList.every(tag => item.tags.indexOf(tag) !== -1));
    return filteredItems.length > 0;
  };

  return {
    hasItems,
    pages,
    page,
    nextPage,
    prevnext,
    prevPage,
    path,
    tags,
  };
}
