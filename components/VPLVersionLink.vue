<template>
  <a
    class="VPLink"
    :class="{
      'prerelease': props.prerelease,
      link: props.href,
      'vp-external-link-icon': props.target === '_blank',
      'no-icon': props.noIcon
    }"
    :href="props.href"
    :target="props.target"
    :rel="props.rel"
  >
    {{ props.text }}
    <Badge
      v-if="props.stable"
      type="success"
      text="STABLE"
      vertical="middle"
    />
    <Badge
      v-if="props.edge"
      type="warning"
      text="EDGE"
      vertical="middle"
    />
    <Badge
      v-if="props.dev"
      type="tip"
      text="DEV"
      vertical="middle"
    />
  </a>
</template>

<script setup>

const props = defineProps({
  text: {
    type: String,
    default: undefined,
  },
  href: {
    type: String,
    default: undefined,
  },
  dev: {
    type: Boolean,
    default: false,
  },
  edge: {
    type: Boolean,
    default: false,
  },
  noIcon: {
    type: Boolean,
    default: false,
  },
  prerelease: {
    type: Boolean,
    default: false,
  },
  rel: {
    type: String,
    default: undefined,
  },
  stable: {
    type: Boolean,
    default: false,
  },
  target: {
    type: String,
    default: '_blank',
  },
});
</script>

<style lang="scss">
.version-link {
  a {
    color: var(--vp-c-green-3);
    &:hover {
      color: var(--vp-c-green-3);
    }
  }
  a.prerelease {
    color: var(--vp-c-yellow-3);
    &:hover {
      color: var(--vp-c-yellow-3);
    }
  }
}
</style>
