<template>
  <div :class="`VPMenuGroup ${getItemColumnsClass(props.columns)}`">
    <p
      v-if="props.text"
      class="title"
    >
      {{ props.text }}
    </p>

    <div class="VPMenuGroup-flex-wrapper">
      <template v-for="item in props.items">
        <VPMenuLink
          v-if="'link' in item"
          :key="item.href"
          :item="item"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import VPMenuLink from '@default-theme/components/VPMenuLink.vue';

const props = defineProps({
  columns: {
    type: Number,
    default: 1,
  },
  items: {
    type: Array,
    default: () => ([]),
  },
  text: {
    type: String,
    default: undefined,
  },
});

const getItemColumnsClass = columns => {
  switch (columns) {
    case 1:
      return 'VPMenuGroup-columns-full';
    case 2:
      return 'VPMenuGroup-columns-half';
    case 3:
      return 'VPMenuGroup-columns-third';
    case 4:
      return 'VPMenuGroup-columns-quarter';
    default:
      return 'VPMenuGroup-colums-third';
  };
};

</script>

<style scoped>
.VPMenuGroup {
  margin: 12px -12px 0;
  border-top: 1px solid var(--vp-c-divider);
  padding: 12px 12px 0;
}

.VPMenuGroup .title {
  color: var(--vp-c-text-3);
  width: 100%;
}

.VPMenuGroup .VPMenuGroup-flex-wrapper {
  display: flex;
  flex-wrap: wrap;
  width: 500px;
}

.VPMenuGroup-columns-full .VPMenuLink {
  width: 100%;
}

.VPMenuGroup-columns-half .VPMenuLink {
  width: 50%;
}

.VPMenuGroup-columns-third .VPMenuLink {
  width: 33%;
}

.VPMenuGroup-columns-quarter .VPMenuLink {
  width: 25%;
}

.VPMenuGroup:first-child {
  margin-top: 0;
  border-top: 0;
  padding-top: 0;
}

.VPMenuGroup + .VPMenuGroup {
  margin-top: 12px;
  border-top: 1px solid var(--vp-c-divider);
}

.title {
  display: block;
  padding: 0 12px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  transition: color 0.25s;
}
</style>
