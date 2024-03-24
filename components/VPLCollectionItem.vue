<template>
  <article
    class="collection-article-card"
    :class="`${page.type} ${size}`"
  >
    <Icon
      v-if="icon !== false"
      :icon="icon"
      :link="iconLink"
      :title="page.type"
    />
    <Link :href="page.url">
      <h2 class="title">
        {{ page.title }}
      </h2>
    </Link>
    <div
      class="summary"
    >
      {{ page.summary }}
    </div>
    <div class="attribution">
      <div class="authors">
        <div
          v-if="page.authors && page.authors.length > 0"
          class="avatars"
        >
          <Author
            v-for="author in page.authors"
            :key="author.name"
            size="icon"
            :member="author"
          />
        </div>
        <Link
          v-for="(author, index) in page.authors"
          :key="author.name"
          class="names"
          :href="author.link"
          no-icon
        >
          <span class="underline">{{ author.name }}</span><span class="separator">{{ getSeparator(index, page.authors.length) }}&nbsp;</span>
        </Link>
      </div>

      <time
        v-if="more === 'date'"
        class="date"
        :datetime="page.datetime"
      >
        {{ hdate }}
      </time>
      <Link
        v-else
        :href="page.url"
        class="read-more"
      >
        <time :datetime="page.datetime" />
        Read More ->
      </Link>
    </div>
  </article>
</template>

<script setup>
import {computed} from 'vue';
import {useData} from 'vitepress';

import Link from './VPLLink.vue';
import Author from './VPLTeamMembersItem.vue';
import Icon from './VPLCollectionIcon.vue';

const {more, page, size} = defineProps({
  page: {
    type: Object,
    required: true,
  },
  size: {
    type: String,
    default: 'medium',
  },
  more: {
    type: String,
    default: 'readmore',
  },
});

const {theme} = useData();
const collection = computed(() => page?.collection ?? false);

const icon = computed(() => theme.value?.collections[collection.value]?.icon ?? false);
const iconLink = computed(() => theme.value?.collections[collection.value]?.iconLink ?? false);

const hdate = computed(() => {
  return new Date(page.date ?? page.timestamp).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});

const getSeparator = (index, end = 0) => {
  return index + 1 === end ? '' : ',';
};

</script>

<style lang="scss" scoped>
.collection-article-card {
  background-color: var(--vp-c-bg-soft);
  border-radius: var(--vpl-c-border-radius);
  border: 1px solid var(--vp-c-bg-soft);
  padding: 24px 24px 20px 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  h2 {
    color: var(--vp-c-brand-1);
    margin-top: -18px;
    line-height: 24px;
    font-size: 20px;
    font-weight: 700;
    max-width: 80%;
  }
  .collection-icon {
    font-weight: 500;
    font-size: 10px;
    position: relative;
    top: -20px;
    right: -16px;
    color: var(--vp-c-text-3);
    .icon {
      width: 10px;
    }
  }
  .summary {
    padding-top: 1em;
    padding-bottom: 2em;
    line-height: 24px;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-text-2);
    flex-grow: 1;
  }
  .attribution {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-text-3);

    .authors {
      display: flex;
      .avatars {
        display: flex;
        justify-content: flex-end;
        .VPTeamMembersItem.icon {
          overflow: visible;
          &:not(:first-child) {
            margin-left: -14px;
          }
        }
      }
    }
    .date {
      color: var(--vp-c-text-3);
    }
    .read-more {
      color: var(--vp-c-brand-3);
    }
  }
}

@media (max-width: 767px) {
  .collection-article-card {
    width: auto;
  }
}

@media (max-width: 420px) {
  .attribution .authors .names {
    display: none;
  }
}


</style>
