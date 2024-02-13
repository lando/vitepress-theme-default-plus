<template>
  <footer
    v-if="showFooter"
    class="VPDocFooter"
  >
    <slot name="doc-footer-before" />
    <div class="footer-box">
      <div
        v-if="hasBackLink"
        class="back-link"
      >
        <Link :href="backLink.link">
          {{ backLink.text ?? '<- Back' }}
        </Link>
      </div>

      <div
        v-if="hasContributors"
        class="contributors"
      >
        <div class="contributors-flex">
          <Contributor
            v-for="contributor in contributors"
            :key="contributor.key"
            size="icon"
            :member="contributor"
          />
        </div>
      </div>

      <div class="empty" />

      <div
        v-if="hasEditLink || hasLastUpdated"
        class="edit-info"
      >
        <div
          v-if="hasEditLink"
          class="edit-link"
        >
          <Link
            class="edit-link-button"
            :href="editLink.url"
            :no-icon="true"
          >
            <VPIconEdit
              class="edit-link-icon"
              aria-label="edit icon"
            />
            {{ editLink.text }}
          </Link>
        </div>

        <div
          v-if="hasLastUpdated"
          class="last-updated"
        >
          <DocFooterLastUpdated />
        </div>
      </div>
    </div>

    <nav
      v-if="control.prev?.link || control.next?.link"
      class="prev-next"
    >
      <div class="pager">
        <Link
          v-if="control.prev?.link"
          class="pager-link prev"
          :href="control.prev.link"
        >
          <span
            class="desc"
            v-html="theme.docFooter?.prev || 'Previous page'"
          />
          <span
            class="title"
            v-html="control.prev.text"
          />
        </Link>
      </div>

      <div class="pager">
        <Link
          v-if="control.next?.link"
          class="pager-link next"
          :href="control.next.link"
        >
          <span
            class="desc"
            v-html="theme.docFooter?.next || 'Next page'"
          />
          <span
            class="title"
            v-html="control.next.text"
          />
        </Link>
      </div>
    </nav>
  </footer>
</template>

<script setup>
import {computed} from 'vue';
import {useData} from 'vitepress';
import {useEditLink} from 'vitepress/dist/client/theme-default/composables/edit-link';
import {usePrevNext} from 'vitepress/dist/client/theme-default/composables/prev-next';
import useCollection from '../client/use-collection.js';

import VPIconEdit from 'vitepress/dist/client/theme-default/components/icons/VPIconEdit.vue';
import Contributor from './VPLTeamMembersItem.vue';
import DocFooterLastUpdated from './VPLDocFooterLastUpdated.vue';
import Link from './VPLLink.vue';

const useBackLink = () => {
  // if its a string then assume its the link
  if (typeof frontmatter.value?.backLink === 'string') {
    return computed(() => ({link: frontmatter.value.backLink}));
  }
  return computed(() => frontmatter.value.backLink);
};

const {theme, page, frontmatter} = useData();
const collection = computed(() => frontmatter.value?.collection ?? false);

const {prevnext} = useCollection(collection.value);
const oprevnext = usePrevNext();

const cprevnext = computed(() => {
  const links = frontmatter.value?.collection ? prevnext : usePrevNext();
  return links.value;
});

const control = computed(() => ({
  prev: frontmatter.value?.prev ? oprevnext.value.prev : cprevnext.value.prev,
  next: frontmatter.value?.next ? oprevnext.value.next : cprevnext.value.next,
}));

const backLink = useBackLink();
const contributors = computed(() => frontmatter.value.contributors ?? page.value.contributors);
const editLink = frontmatter.value?.editLink ? computed(() => frontmatter.value?.editLink) : useEditLink();

const hasBackLink = computed(() => {
  return frontmatter.value?.backLink?.link;
});

const hasContributors = computed(() => {
  return contributors.value && contributors.value.length > 0;
});

const hasEditLink = computed(() => {
  return theme.value.editLink && frontmatter.value.editLink !== false;
});

const hasLastUpdated = computed(() => {
  return page.value.lastUpdated && frontmatter.value.lastUpdated !== false;
});

const showFooter = computed(() => {
  return hasEditLink.value || hasLastUpdated.value || control.value.prev || control.value.next;
});
</script>


<style scoped>
.VPDocFooter {
  margin-top: 64px;
}

.back-link {
  display: flex;
  align-items: flex-end;
  border: 0;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  transition: color 0.25s;
}

.contributors {
  max-width: 420px;
  overflow: hidden;
  max-height: 70px;
}
.contributors-flex {
  height: 65px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.desc {
  display: block;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.edit-link-button {
  display: flex;
  align-items: center;
  border: 0;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  transition: color 0.25s;
}

.edit-link-button:hover {
  color: var(--vp-c-brand-2);
}

.edit-link-icon {
  margin-right: 8px;
  width: 14px;
  height: 14px;
  fill: currentColor;
}

.footer-box {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
}

.prev-next {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 24px;
  display: grid;
  grid-row-gap: 8px;
}

.pager-link {
  display: block;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 11px 16px 13px;
  width: 100%;
  height: 100%;
  transition: border-color 0.25s;
}

.pager-link:hover {
  border-color: var(--vp-c-brand-1);
}

.pager-link.next {
  margin-left: auto;
  text-align: right;
}

.title {
  display: block;
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  transition: color 0.25s;
}

@media (max-width: 767px) {
  .contributors {
    max-width: 300px;
  }
}

@media (max-width: 640px) {
  .contributors {
    display: none;
  }
}

@media (min-width: 640px) {
  .edit-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
@media (min-width: 640px) {
  .prev-next {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 16px;
  }
}
</style>
