import sortBy from 'lodash/sortBy.js';
import uniq from 'lodash/uniq.js';

import {computed, reactive} from 'vue';
import {useRoute} from 'vitepress';
import {data as collections} from './collections.data.js';

export default function useCollection(type = undefined) {
  const route = useRoute();
  const path = route.path;

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
  const tags = computed(() => sortBy(uniq(pages.map(page => page.tags).flat(Infinity))));

  // and the amount of content in each
  const tagCounts = reactive(Object.fromEntries(tags.value.map(tag => ([tag, 0]))));
  for (const tag of pages.map(page => page.tags).flat(Infinity)) {
    tagCounts[tag] = tagCounts[tag] ? tagCounts[tag] + 1 : 1;
  }

  // and a selected tag reactive for filtering and that sort of thing
  // @TODO: it would be great to set selectedTags from query params instead of just false but when we try to do it the
  // obvious way we get a hydration mismatch which breaks filtering on prod
  const selectedTags = reactive(Object.fromEntries(tags.value.map(tag => ([tag, false]))));
  const selectedTagsList = computed(() => Object.entries(selectedTags)
    .filter(pair => pair[1] === true)
    .map(pair => pair[0]));

  // helper func to see if a set of tag filtered pages has items or not, useful for showing collection sections
  const hasItems = (items = [], tags = {}) => {
    const tagList = Object.entries(tags).filter(pair => pair[1] === true).map(pair => pair[0]);
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
    tagCounts,
    tags,
    selectedTags,
    selectedTagsList,
  };
}
