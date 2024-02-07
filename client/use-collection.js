import {computed} from 'vue';
import {useRoute} from 'vitepress';
import {data as collections} from './collections.data.js';

export default function useCollection(type = undefined) {
  const route = useRoute();
  const path = route.path;

  function findCurrentIndex() {
    const result = pages.findIndex(p => p.url === route.path);
    if (result === -1) console.error(`blog post missing: ${route.path}`);
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

  return {pages, page, nextPage, prevnext, prevPage, path};
}
