<template>
  <div class="collection-page">
    <slot />
  </div>
</template>

<script setup>
import {useCollection} from '../utils/use-collection';

console.log(useCollection('guide'));

</script>


<style scoped>
.collection-page {
  padding-bottom: 96px;
}

@media (min-width: 768px) {
  .collection-page {
    padding-bottom: 128px;
  }
}

:slotted(.collection-page-section + .collection-page-section),
:slotted(.collection-page-article + .collection-page-section) {
  margin-top: 64px;
}

:slotted(.collection-page-article + .collection-page-article) {
  margin-top: 24px;
}

@media (min-width: 768px) {
  :slotted(.collection-pageTitle + .collection-page-section) {
    margin-top: 16px;
  }

  :slotted(.collection-page-section + .collection-page-section),
  :slotted(.collection-page-article + .collection-page-section) {
    margin-top: 96px;
  }
}

:slotted(.collection-page-article) {
  padding: 0 24px;
}

@media (min-width: 768px) {
  :slotted(.collection-page-article) {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  :slotted(.collection-page-article) {
    padding: 0 64px;
  }
}
</style>
