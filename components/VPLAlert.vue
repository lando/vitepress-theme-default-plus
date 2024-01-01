<template>
  <div
    v-if="showAlert && props.content !== ''"
    :class="`alert-banner alert-${props.type}`"
  >
    <div class="alert-content">
      <span v-html="props.content" />
      <span v-if="props.closeable">
        <button
          class="alert-dismiss-button"
          @click="dismissAlert"
        >
          <small>&nbsp;&nbsp;[x] dismiss</small>
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
  type: {
    type: String,
    default: 'tip',
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

<style lang="scss" scoped>
:root {
  --vpl-alert-height: 40px;
}

.alert-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--vpl-alert-height);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  .alert-content {
    span {
      font-size: 0.95rem;
      font-weight: 500;
    }
  }

  .alert-dismiss-button {
    font-size: 1rem;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    font-weight: 700;
  }

  &.alert-brand {
    background-color: var(--vp-c-brand-soft-hex);
    color:  var(--vp-c-brand-hard);
  }

  &.alert-danger {
    background-color: var(--vp-c-red-soft-hex);
    color:  var(--vp-c-red-hard);
  }

  &.alert-tip {
    background-color: var(--vp-c-indigo-soft-hex);
    color:  var(--vp-c-indigo-hard);
  }

  &.alert-info {
    background-color: var(--vp-c-gray-soft-hex);
    color:  var(--vp-c-gray-hard);
  }

  &.alert-success {
    background-color: var(--vp-c-green-soft-hex);
    color:  var(--vp-c-green-hard);
  }

  &.alert-warning {
    background-color: var(--vp-c-yellow-soft-hex);
    color:  var(--vp-c-yellow-hard);
  }
}
</style>
