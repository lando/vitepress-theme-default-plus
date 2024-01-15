import {computed} from 'vue';
import {useRoute} from 'vitepress';
import {data as collections} from './collections.data';

export function useCollection() {
  console.log(collections);
  const route = useRoute()

  const path = route.path

  function findCurrentIndex() {
    const result = posts.findIndex((p) => p.url === route.path)
    if (result === -1) console.error(`blog post missing: ${route.path}`)
    return result
  }

  const post = computed(() => posts[findCurrentIndex()])
  const nextPost = computed(() => posts[findCurrentIndex() - 1])
  const prevPost = computed(() => posts[findCurrentIndex() + 1])

  return { posts, post, nextPost, prevPost, path }
}
