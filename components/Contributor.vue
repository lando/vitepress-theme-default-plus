<template>
  <div class="contributor-block">
    <div class="contributor-block-pic">
      <img
        :src="props.img"
        :alt="props.name"
      >
    </div>
    <div class="contributor-block-name">
      <a
        :href="props.link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2>{{ props.name }}<OutboundLink /></h2>
      </a>
      <div class="contributor-block-score">
        {{ props.score }}
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    score: {
      type: String,
      required: true,
    },
  });
</script>

<style lang="scss" scoped>
@import '../styles/main.scss';
.contributor-block {
  width: 150px;
  padding: 15px 0;
  text-align: center;
  h2 {
    font-size: .80rem;
    border: 0;
    padding: 0;
    margin: 0;
  }
  .contributor-block-score {
    font-size: small;
    font-weight: 400;
    color: var(--c-text-quote);
  }
  .contributor-block-pic {
    padding: 10px 0;
    img {
      width: 110px;
      border-radius: 50% !important;
    }
  }
}
</style>
