<template>
  <div
    v-if="showAlert && props.content !== ''"
    class="alert-banner"
  >
    <div class="alert-content">
      <span v-html="props.content" />
      <span v-if="props.closeable">
        <button
          class="alert-dismiss-button"
          @click="dismissAlert"
        >
          [x] dismiss.
        </button>
      </span>
    </div>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref, watch} from 'vue';

const props = defineProps({
  content: {
    type: String,
    default: '',
    required: true,
  },
  scheme: {
    type: String,
    default: 'neutral',
  },
  closeable: {
    type: Boolean,
    default: true,
  },
});

const isAlertMode = ref(props.content !== '');
const showAlert = ref(isAlertMode.value);

const update = (value = isAlertMode.value) => {
  const htmlEl = window.document.querySelector('html');
  htmlEl.classList.toggle('alert', value);
};

const dismissAlert = () => {
  update(false);
  showAlert.value = false;
};

onMounted(() => {
  watch(isAlertMode, update, {immediate: true});
});
onUnmounted(() => update());
</script>

<style lang="scss">
@import '../../styles/main.scss';
.alert-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--alert-height);
  background-color: var(--c-brand);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  .alert-content {
    span {
      color: var(--c-bg-lighter);
      font-size: 0.95rem;
      font-weight: 500;
    }
    a {
      color: var(--c-bg-lighter);
      font-weight: 800;
      &:hover {
        text-decoration: underline;
      }
    }
  }


  .alert-dismiss-button {
    color: var(--c-bg-lighter);
    font-size: 1rem;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
