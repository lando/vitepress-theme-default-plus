<script>
// @ts-ignore: docsearch type issue
import docsearch from '@docsearch/js';
import {usePageLang, useRouteLocale} from '@vuepress/client';
import {computed, h, onMounted, watch} from 'vue';
import '@docsearch/css';

import {useSiteData} from '@vuepress/client';
import {resolveRoutePathFromUrl} from '@vuepress/shared';
import {createElement} from 'preact';
import {useRouter} from 'vue-router';
const isSpecialClick = event => event.button === 1 ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey;

const useDocsearchShim = baseUrl => {
    const router = useRouter();
    const site = useSiteData();
    return {
        // transform full url to route path
        transformItems: items => items.map(item => ({
            ...item,
            // the `item.url` is full url with protocol and hostname
            // so we have to transform it to vue-router path
            url: applyBaseUrl(item.url, site.value.base, baseUrl),
        })),
        // render the hit component with custom `onClick` handler
        hitComponent: ({hit, children}) => createElement('a', {
            href: hit.url,
            // handle `onClick` by `router.push`
            onClick: event => {
                if (isSpecialClick(event)) {
                    return;
                }
                event.preventDefault();
                router.push(hit.url);
            },
        }, children),
        // navigation behavior triggered by `onKeyDown` internally
        navigator: {
            // when pressing Enter without metaKey
            navigate: ({itemUrl}) => {
                router.push(itemUrl);
            },
        },
    };
};

const applyBaseUrl = (url, sep, baseUrl) => {
  const path = resolveRoutePathFromUrl(url, sep);
  return baseUrl !== null ? baseUrl + path : path;
};

export default {
  name: 'Docsearch2', // eslint-disable-line
  props: {
      options: {
        type: Object,
        required: true,
      },
  },
  setup(props) {
    const routeLocale = useRouteLocale();
    const lang = usePageLang();
    const docsearchShim = useDocsearchShim(props.options.baseUrl);
    // resolve docsearch props for current locale
    const propsLocale = computed(() => {
        let _a;
        return ({
            ...props.options,
            ...(_a = props.options.locales) === null || _a === void 0 ? void 0 : _a[routeLocale.value],
        });
    });
    const facetFilters = [];
    const initialize = () => {
        let _a; let _b;
        facetFilters.splice(0, facetFilters.length, `lang:${lang.value}`, ...((_b = (_a = propsLocale.value.searchParameters) === null || _a === void 0 ? void 0 : _a.facetFilters) !== null && _b !== void 0 ? _b : []));
        docsearch({
            ...docsearchShim,
            ...propsLocale.value,
            container: '#docsearch-container',
            searchParameters: {
                ...propsLocale.value.searchParameters,
                facetFilters,
            },
        });
    };
    onMounted(() => {
        initialize();
        // re-initialize if the options is changed
        watch([routeLocale, propsLocale], ([curRouteLocale, curPropsLocale], [prevRouteLocale, prevPropsLocale]) => {
            if (curRouteLocale === prevRouteLocale) {
              return;
            }
            if (JSON.stringify(curPropsLocale) !== JSON.stringify(prevPropsLocale)) {
              initialize();
            }
        });
        // modify the facetFilters in place to avoid re-initializing docsearch
        // when page lang is changed
        watch(lang, (curLang, prevLang) => {
            if (curLang !== prevLang) {
                const prevIndex = facetFilters.findIndex(item => item === `lang:${prevLang}`);
                if (prevIndex > -1) {
                  facetFilters.splice(prevIndex, 1, `lang:${curLang}`);
                }
            }
        });
    });
  },
  render() {
    return h('div', {id: 'docsearch-container'});
  },
};
</script>
