<template>
  <div class="tag-page">
    <Summary
      v-for="page in pagination()"
      :key="page.key"
      :page="page"
      class="tag-page-summary"
    />
    <div
      v-if="pages.length > amount"
      class="load-more"
      @click="more"
    >
      <button
        class="load-more-link"
      >
        load more
      </button>
    </div>
  </div>
</template>

<script setup>
import {computed, ref, defineAsyncComponent} from 'vue';
import TagPageCard from './TagPageCard.vue';

const Summary = defineAsyncComponent({
  loader: async () => TagPageCard,
});

const props = defineProps({
  pages: {
    type: Array,
    required: true,
  },
});

// Hardcoded pager value for now
const pager = 10;
const amount = ref(pager);

// normalize data and sort
const pages = computed(() => {
  const datePages = props.pages.map(page => Object.assign(page, {timestamp: page.date ? page.date : page.updated}));
  return datePages.sort((a, b) => a.timestamp < b.timestamp ? 1 : -1);
});
const pagination = (t = 1) => {
  return pages.value.slice(0, amount.value);
};
const more = () => {
  amount.value += pager;
};
</script>

<style lang="scss" scoped>
@import '../../styles/main.scss';
.load-more {
  text-align: center;
  margin-top: 2em;
}
.load-more-link {
  width: 100%;
  border: 0;
  color: var(--c-text-light);
  display: block;
  font-weight: 700;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  background-color: var(--c-bg-lighter);
  height: 50px;
  margin: auto;
  cursor: pointer;
}
</style>
