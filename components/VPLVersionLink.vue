<template>
  <a
    class="VPLink"
    :class="{
      'prerelease': props.prerelease,
      link: props.version ?? props.text,
      'vp-external-link-icon': props.target === '_blank',
      'no-icon': props.noIcon
    }"
    :href="getLink(props.version ?? props.text)"
    :target="props.target"
  >
    {{ props.version ?? props.text }}
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
import {default as normalizeMvb} from '../utils/normalize-mvblink';
import {useData} from 'vitepress';

const {site} = useData();

const props = defineProps({
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
  stable: {
    type: Boolean,
    default: false,
  },
  target: {
    type: String,
    default: '_blank',
  },
  version: {
    type: String,
    default: undefined,
  },

  // DEPRECATED but kept for backwards compat
  text: {
    type: String,
    default: undefined,
  },
});

const getLink = version => {
  if (props.dev === true) return normalizeMvb('/dev/', site.value);
  return normalizeMvb(`/${version}/`, site.value);
};

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
