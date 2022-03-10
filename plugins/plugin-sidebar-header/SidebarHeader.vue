<template>
  <div class="sidebar-header">
    <span
      v-if="props.icon"
      class="sidebar-icon"
    >
      <img :src="$withBase(props.icon)">
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
</script>

<style lang="scss" scoped>
@import '../styles/main.scss';
.sidebar-header {
  display: flex;
  padding: 2rem 1.5rem 1.5rem;
  font-weight: 800;
  font-size: 1.2em;
  border-bottom: 1px solid var(--c-border);
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .sidebar-version {
    margin-top: 3px;
  }
  .sidebar-icon {
    display: flex;
    img {
      width: 24px;
    }
  }
  @media (max-width: 719px) {
    font-weight: 700;
    font-size: 1.2em;
    border-bottom: 0;
    padding-bottom: 0;
    flex-direction: row;
    .sidebar-version {
      display: none;
      margin-top: 2px;
      .badge {
        font-size: 0.7em;
      }
    }
    .sidebar-icon {
      display: none;
    }
  }
}
</style>
