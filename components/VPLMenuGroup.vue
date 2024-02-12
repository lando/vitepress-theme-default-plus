<template>
  <div :class="`VPMenuGroup ${getItemColumnsClass(props.columns)}`">
    <p
      v-if="props.text"
      class="title"
    >
      {{ props.text }}
    </p>

    <div :class="{'VPMenuGroup-flex-wrapper': props.columns > 1}">
      <template v-for="item in props.items">
        <MenuLink
          v-if="'link' in item"
          :key="item.href"
          :item="item"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import MenuLink from './VPLMenuLink.vue';

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
  width: 500px;
  display: flex;
  flex-wrap: wrap;
}

.VPMenuGroup-columns-full .VPMenuLink {
  width: unset;
  min-width: 100%;
}

.VPMenuGroup-columns-half .VPMenuLink {
  min-width: 49%;
  max-width: 50%;
}

.VPMenuGroup-columns-third .VPMenuLink {
  min-width: 32%;
  max-width: 33%;
}

.VPMenuGroup-columns-quarter .VPMenuLink {
  min-width: 24%;
  max-width: 25%;
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
