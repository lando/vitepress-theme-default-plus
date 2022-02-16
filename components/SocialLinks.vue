<template>
  <div class="social-links">
    <a
      v-for="(icon, index) in props.icons"
      :key="index"
      :href="icon.link"
    >
      <svg
        v-if="icon.svg"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        viewBox="0 0 24 24"
      >
        <title>{{ icon.title }}</title>
        <path
          v-if="icon.svg.path"
          :d="icon.svg.path"
        />
      </svg>
    </a>
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
.sidebar .social-links {
  display: none;
}
.right-bar .social-links {
  position: fixed;
  top: var(--navbar-height);
  right: 2em;
  width: 150px;
  padding: 1.5rem 1.5rem;
  border-bottom: 1px solid var(--c-border);
  height: 20px;
  background: var(--c-bg);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-between;
  svg {
    width: 20px;
    fill: var(--c-brand-light);
  }
}

@media (max-width: 1500px) {
  .right-bar .social-links {
    display: none;
  }
}

@media (max-width: $MQMobile) {
  .sidebar-open .sidebar .social-links {
    margin-top: 1.5em;
    padding: 0.5rem 1.5rem 1.5rem;
    border-bottom: 1px solid var(--c-border);
    height: 20px;
    background: var(--c-bg);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-between;
    svg {
      width: 25px;
      fill: var(--c-brand);
    }
  }
}

</style>
