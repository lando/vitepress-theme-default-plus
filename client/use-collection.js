import sortBy from 'lodash/sortBy.js';
import uniq from 'lodash/uniq.js';

import {computed, reactive, watch} from 'vue';
import {useRoute} from 'vitepress';
import {data as collections} from './collections.data.js';

export default function useCollection(type = undefined) {
  const route = useRoute();
  const urlSearchParams = new URLSearchParams(window.location.search);

  const path = route.path;
  const params = Object.fromEntries(urlSearchParams.entries());

  function isTagSelected(q) {
    const {tag = '', tags = ''} = params;
    return [...tag.split(','), ...tags.split(',')].includes(q);
  }

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
  const selectedTags = reactive(Object.fromEntries(tags.value.map(tag => ([tag, isTagSelected(tag)]))));
  const selectedTagsList = computed(() => Object.entries(selectedTags)
    .filter(pair => pair[1] === true)
    .map(pair => pair[0]));

  // pages by tags
  // let pagesBySelectedTags = pages;

  // watch(selectedTags, () => {
  //   pagesBySelectedTags = pages.filter(page => {
  //     const selectedTagsList = Object.entries(selectedTags)
  //     .filter(pair => pair[1] === true)
  //     .map(pair => pair[0]);
  //     return selectedTagsList.every(tag => {
  //       return page.tags.indexOf(tag) !== -1;
  //     });
  //   });
  // }, {immediate: true});

  return {
    pages,
    page,
    nextPage, prevnext,
    prevPage, path,
    tagCounts,
    tags,
    selectedTags,
    selectedTagsList,
  };
}
