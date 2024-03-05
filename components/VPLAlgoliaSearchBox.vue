<template>
  <div id="docsearch" />
</template>


<script setup>
import docsearch from '@docsearch/js';
import {useData, useRoute, useRouter} from 'vitepress';
import {nextTick, onMounted, watch} from 'vue';

const props = defineProps({
  algolia: {
    type: Object,
    default: () => ({}),
  },
});

const router = useRouter();
const route = useRoute();
const {site, localeIndex, lang} = useData();

onMounted(update);
watch(localeIndex, update);

async function update() {
  await nextTick();
  const options = {
    ...props.algolia,
    ...props.algolia.locales?.[localeIndex.value],
  };
  const rawFacetFilters = options.searchParameters?.facetFilters ?? [];
  const facetFilters = [
    ...(Array.isArray(rawFacetFilters)
      ? rawFacetFilters
      : [rawFacetFilters]
    ).filter(f => !f.startsWith('lang:')),
    `lang:${lang.value}`,
  ];
  initialize({
    ...options,
    searchParameters: {
      ...options.searchParameters,
      facetFilters,
    },
  });
}

function initialize(userOptions = {}) {
  const options = Object.assign({}, userOptions, {
    container: '#docsearch',
    navigator: {
      navigate({itemUrl}) {
        const {pathname: hitPathname} = new URL(window.location.origin + itemUrl);

        // router doesn't handle same-page navigation so we use the native
        // browser location API for anchor navigation
        if (route.path === hitPathname) window.location.assign(window.location.origin + itemUrl);
        else router.go(itemUrl);
      },
    },

    transformItems(items) {
      console.log(items);
      return items.map(item => Object.assign({}, item, {url: getRelativePath(item.url)}));
    },

    hitComponent({hit, children}) {
      return {
        __v: null,
        type: 'a',
        ref: undefined,
        constructor: undefined,
        target: '_blank',
        key: undefined,
        props: {href: hit.url, children, target: '_self'},
      };
    },
  });

  docsearch(options);
}

function getRelativePath(url) {
  const {pathname, hash} = new URL(url, location.origin);
  return pathname.replace(/\.html$/, site.value.cleanUrls ? '' : '.html') + hash;
}
</script>
