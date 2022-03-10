<template>
  <div class="social-links">
    <div
      v-for="(icon, index) in props.icons"
      :key="index"
      class="social-link"
    >
      <a
        :href="icon.link"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="icon.title"
      >
        <svg
          v-if="icon.svg"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          v-bind="icon.svg.attributes"
        >
          <title v-if="icon.svg.title">{{ icon.title }}</title>
          <path
            v-if="icon.svg.path"
            v-bind="icon.svg.path"
          />
          <polygon
            v-if="icon.svg.polygon"
            v-bind="icon.svg.polygon"
          />
        </svg>
      </a>
    </div>
  </div>
</template>


<script setup>
// Deps
const props = defineProps({
  icons: {
    type: Array,
    default: () => ([]),
  },
});
</script>

<style lang="scss">
@import '../styles/main.scss';
.navbar-items-wrapper {
  .social-links {
    display: flex;
    margin-right: -0.5em;
  }
  .social-link {
    display: flex;
    margin: auto;
    margin-left: 1rem;
    margin-top: 4px;
    border: 0;
    background: none;
    opacity: 0.8;
    cursor: pointer;
    svg {
      width: 1.25em;
      height: 1.26em;
      stroke: var(--c-text);
      &:hover {
        stroke: var(--c-brand);
      }
    }
  }
}
</style>
