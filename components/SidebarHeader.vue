<template>
  <div class="sidebar-header">
    <span
      v-if="props.icon"
      class="sidebar-icon"
    >
      <img :src="props.icon">
    </span>
    <span
      v-if="props.title"
      class="sidebar-title"
    >
      {{ props.title }}
    </span>
    <span
      v-if="props.version"
      class="sidebar-version"
    >
      <a
        v-if="props.link"
        :href="props.link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Badge type="tip">{{ props.version }}</Badge>
      </a>
      <Badge
        v-else
        type="tip"
      >
        {{ props.version }}
      </Badge>
    </span>
  </div>
</template>

<script setup>
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      default: null,
    },
    link: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
  });
  console.log(props);
</script>

<style lang="scss" scoped>
@import '../styles/main.scss';
.sidebar-header {
  display: flex;
  margin-top: 1.5rem;
  padding: 1.5rem 1.5rem 1.5rem;
  font-weight: 800;
  font-size: 1.2em;
  border-top: 1px solid var(--c-border);
  border-bottom: 1px solid var(--c-border);
  flex-direction: row;
  justify-content: space-between;
  .sidebar-version {
    margin-top: 3px;
  }
  .sidebar-icon {
    img {
      width: 24px;
    }
  }
  @media (max-width: 719px) {
    font-weight: 700;
    font-size: 1.1em;
    border-bottom: 0;
    padding-bottom: 0;
    .sidebar-version {
      margin-top: 2px;
    }
    .sidebar-icon {
      display: none;
    }
  }
}
</style>
