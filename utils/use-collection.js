import {computed} from 'vue';
import {useRoute} from 'vitepress';
import {data as collections} from './collections.data';

export function useCollection(type = undefined) {
  const route = useRoute();
  const path = route.path;

  function findCurrentIndex() {
    const result = pages.findIndex(p => p.url === route.path);
    if (result === -1) console.error(`blog post missing: ${route.path}`);
    return result;
  }

  // filter pages if needed
  const pages = type === undefined ? collections : collections.filter(page => page.type === type);
  const page = computed(() => pages[findCurrentIndex()]);
  const nextPage = computed(() => pages[findCurrentIndex() - 1]);
  const prevPage = computed(() => pages[findCurrentIndex() + 1]);

  return {pages, page, nextPage, prevPage, path};
}
