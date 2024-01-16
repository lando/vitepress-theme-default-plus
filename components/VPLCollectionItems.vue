<template>
  <div>
    <div class="collection-articles">
      <Article
        v-for="page in pagination()"
        :key="page.key"
        :page="page"
        :size="size"
        :more="more"
        class="collection-page-article"
      />
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
import {computed, ref, defineAsyncComponent} from 'vue';
import {VPButton} from 'vitepress/theme';
import VPLCollectionItem from './VPLCollectionItem.vue';

const Article = defineAsyncComponent({
  loader: async () => VPLCollectionItem,
});

const {items, pager, more, size} = defineProps({
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
});

// Hardcoded pager value for now
const amount = ref(pager);

// normalize data and sort
const pages = computed(() => {
  const datePages = items.map(item => Object.assign(item, {timestamp: item.date ? item.date : item.timestamp}));
  return datePages.sort((a, b) => a.timestamp < b.timestamp ? 1 : -1);
});
const pagination = (t = 1) => {
  return pages.value.slice(0, amount.value);
};
const adder = () => {
  amount.value += pager;
};
</script>

<style scoped>
.collection-articles {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 24px;
  article {
    max-width: 48%;
  }
}

.load-more-button {
  margin: 24px 0;
  padding: 24px;
}

@media (max-width: 767px) {
  .collection-articles {
    article {
      max-width: 100%;
    }
  }
}

</style>
