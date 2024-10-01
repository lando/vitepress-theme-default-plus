<template>
  <div>
    <div
      :key="key"
      class="collection-articles"
    >
      <div
        v-for="(page, index) in pagination()"
        :key="page.key"
        :class="{'collection-article': true, grower: getGrower(index)}"
      >
        <Article
          :page="page"
          :size="props.size"
          :more="props.more"
          class="collection-page-article"
        />
      </div>
    </div>
    <VPButton
      v-if="pages.length > amount"
      size="medium"
      text="load more"
      theme="alt"
      class="load-more-button"
      @click="adder"
    >
      load more
    </VPButton>
  </div>
</template>

<script setup>
import {defineAsyncComponent, onMounted, ref, watch} from 'vue';
import {VPButton} from 'vitepress/theme';

import Item from './VPLCollectionItem.vue';

const Article = defineAsyncComponent({
  loader: async () => Item,
});

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  more: {
    type: String,
    default: 'readmore',
  },
  pager: {
    type: Number,
    default: 10,
  },
  size: {
    type: String,
    default: 'medium',
  },
  tags: {
    type: Object,
    default: () => ({}),
  },
});

// Hardcoded pager value for now
const amount = ref(props.pager);
const key = ref(0);

// normalize data and sort
let pages = props.items
  .map(item => Object.assign(item, {show: true, timestamp: item.date ? item.date : item.timestamp}))
  .sort((a, b) => a.timestamp < b.timestamp ? 1 : -1);

const adder = () => amount.value += props.pager;
const getGrower = i => pagination()[i + 1] === undefined && (i + 1) % 2 !== 0;
const pagination = () => pages.slice(0, amount.value);

const filter = () => {
  const tagList = Object.entries(props.tags).filter(pair => pair[1].selected === true).map(pair => pair[0]);
  if (tagList.length === 0) return props.items;
  return props.items.filter(item => Array.isArray(item.tags) && tagList.every(tag => item.tags.includes(tag)));
};

// recompute filter when tags change
watch(props.tags, () => {
  pages = filter();
  key.value++;
});

onMounted(() => {
  pages = filter();
  key.value++;
});

</script>

<style scoped>
.collection-articles {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  .collection-article {
    max-width: 50%;
    display: flex;
    flex-grow: 1;
    padding: 6px;
    &.grower {
      max-width: 100%;
    }
  }
}

.load-more-button {
  margin: 24px 6px;
  padding: 24px;
}

@media (max-width: 767px) {
  .collection-articles {
    .collection-article {
      max-width: 100%;
    }
  }
}

@media (max-width: 420px) {
  .collection-articles {
    .collection-article {
      padding: 6px 0;
    }
  }
}

</style>
