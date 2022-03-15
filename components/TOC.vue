<template>
  <div
    v-if="page.headers.length > 0"
    ref="root"
    class="toc"
  >
    <span class="header">On this page</span>
    <div
      class="marker"
      :style="marker"
    />
    <div
      v-for="(item, index) in page.headers"
      :ref="el => { items[index] = el }"
      :key="index"
      class="toc-item"
      :class="[`toc-h${item.level}`, { active: activeIndex === index }]"
    >
      <a
        :href="`#${item.slug}`"
        :title="item.title"
      >
        {{ item.title }}
      </a>
    </div>
  </div>
</template>

<script setup>
import {onBeforeUnmount, onBeforeUpdate, onMounted, ref, reactive, watch} from 'vue';
import {usePageData} from '@vuepress/client';
import {useRouter} from 'vue-router';

const page = usePageData();
let initTop;
let activeIndex = ref(0);
const marker = reactive({top: 0, opacity: 0});
const root = ref(null);
const router = useRouter();
const items = ref([]);

// get offset top
const getAbsoluteTop = dom => {
  return dom && dom.getBoundingClientRect
    ? dom.getBoundingClientRect().top +
        document.body.scrollTop +
        document.documentElement.scrollTop
    : 0;
};

const setIndex = index => {
  activeIndex.value = index;
  const position = items.value[index].offsetTop + 4;
  marker.top = `${position}px`;
  marker.opacity = (items.value.length > 0) ? 1: 0;
};

const onScroll = () => {
  if (initTop === undefined) {
    initTop = getAbsoluteTop(root);
  }
  // update position
  const scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
  const headings = page.value.headers || [];
  // change active toc with scrolling
  let i = 0;
  const addLink = index => {
    activeIndex.value = index;
  };
  for (; i < headings.length; i++) {
    const dom = document.getElementById(headings[i].slug);
    const top = getAbsoluteTop(dom);
    if (top - 50 < scrollTop) {
      addLink(i);
    } else {
      if (!i) addLink(i);
      break;
    }
  }
};
const _onScroll = () => onScroll();
const _onHashChange = () => {
  const hash = decodeURIComponent(location.hash.substring(1));
  const index = (page.value.headers || []).findIndex(h => h.slug === hash);
  if (index >= 0) setIndex(index);
  if (index === -1 && items.value.length > 0) setIndex(0);
  const dom = hash && document.getElementById(hash);
  if (dom) window.scrollTo(0, getAbsoluteTop(dom) - 20);
};

const triggerEvt = () => {
  _onScroll();
  _onHashChange();
};

onBeforeUnmount(() => {
  window.removeEventListener('scroll', _onScroll);
  window.removeEventListener('hashchange', _onHashChange);
});
onBeforeUpdate(() => {
  items.value = [];
});
onMounted(() => {
  setTimeout(() => triggerEvt(), 500);
  window.addEventListener('scroll', _onScroll);
  window.addEventListener('hashchange', _onHashChange);
});
router.afterEach(route => {
  if (items.value.length === 0) marker.opacity = 0;
  else if (items.value[0] === null) marker.opacity = 0;
  else if (route.hash) triggerEvt();
  else setIndex(0);
});
watch(activeIndex, value => {
  setIndex(value);
});
</script>

<style lang="scss">
.toc {
  max-height: 100vh;
  max-width: 220px;
  overflow-y: auto;
  box-sizing: border-box;
  .marker {
    position: absolute;
    background-color: var(--c-brand);
    border-radius: 4px;
    width: 4px;
    height: 20px;
    top: 0;
    left: -12px;
    z-index: 0;
    transition: top .25s cubic-bezier(0,1,.5,1),opacity .05s,background-color .5s;
  }
  .toc-item {
    line-height: 1.7rem;
    border-left: var(--c-border);
    overflow: hidden;
    a {
      display: block;
      color: var(--c-text-lighter);
      font-size: .8rem;
      width: 100%;
      box-sizing: border-box;
      text-decoration: none;
      transition: color 0.3s;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &.active {
      a {
        color: var(--c-text);
      }
    }
    &:hover {
      a {
        color: var(--c-brand);
      }
    }
  }
  .toc-h3 {
    a {
      padding-left: 1rem;
    }
  }
  .toc-h4 {
    a {
      padding-left: 2rem;
    }
  }
  .toc-h5 {
    a {
      padding-left: 3rem;
    }
  }
  .toc-h6 {
    a {
      padding-left: 4rem;
    }
  }
}
</style>
