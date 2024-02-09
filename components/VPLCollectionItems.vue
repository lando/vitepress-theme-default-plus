<template>
  <div>
    <div class="collection-articles">
      <div
        v-for="(page, index) in pagination()"
        :key="page.key"
        :class="{'collection-article': true, grower: getGrower(index)}"
      >
        <Article
          :page="page"
          :size="size"
          :more="more"
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
import {computed, ref, defineAsyncComponent} from 'vue';
import {VPButton} from 'vitepress/theme';
import VPLCollectionItem from './VPLCollectionItem.vue';

const Article = defineAsyncComponent({
  loader: async () => VPLCollectionItem,
});

const {items, pager, more, size, tags} = defineProps({
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
    type: Array,
    default: () => ([]),
  },
});

// Hardcoded pager value for now
const amount = ref(pager);

// normalize data and sort
const pages = computed(() => {
  const tagList = Object.entries(tags)
    .filter(pair => pair[1] === true)
    .map(pair => pair[0]);

  const datePages = items
    .map(item => Object.assign(item, {timestamp: item.date ? item.date : item.timestamp}))
    .filter(item => {
      return tagList.every(tag => {
        return item.tags.indexOf(tag) !== -1;
      });
    });

  return datePages.sort((a, b) => a.timestamp < b.timestamp ? 1 : -1);
});

const adder = () => {
  amount.value += pager;
};

const pagination = () => {
  return pages.value.slice(0, amount.value);
};

const getGrower = i => pagination()[i + 1] === undefined && (i + 1) % 2 !== 0;

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
