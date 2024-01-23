<template>
  <div class="collection-page">
    <slot />
  </div>
</template>

<style scoped>
.collection-page {
  padding: 0 16px 96px;
  position: relative;
  margin: 0 auto;
  width: 100%;
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
  :slotted(.collection-page-title + .collection-page-section) {
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
  .collection-page {
    padding: 0 32px 128px;
  }
  :slotted(.collection-page-article) {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .collection-page {
    padding: 0 64px 128px;
  }
  :slotted(.collection-page-article) {
    padding: 0 64px;
  }
}

@media (min-width: 1280px) {
  .collection-page {
    order: 1;
    min-width: 640px;
    max-width: 1200px;
    margin: auto;
  }
}

</style>
