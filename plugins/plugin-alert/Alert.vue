<template>
  <div
    v-if="showAlert && props.content !== ''"
    :class="`alert-banner alert-scheme-${props.scheme}`"
  >
    <div :class="`alert-content`">
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
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  .alert-content {
    span {
      font-size: 0.95rem;
      font-weight: 500;
    }
    a {
      font-weight: 800;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .alert-dismiss-button {
    font-size: 1rem;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    &:hover {
      text-decoration: underline;
    }
  }

  &.alert-scheme-danger {
    background-color: var(--c-danger);
    span {
      color: var(--c-bg-lighter);
    }
    a {
      color: var(--c-bg-lighter);
    }
    .alert-dismiss-button {
      color: var(--c-bg-lighter);
    }
  }

  &.alert-scheme-warning {
    background-color: var(--c-warning);
    span {
      color: var(--c-bg-lighter);
    }
    a {
      color: var(--c-bg-lighter);
    }
    .alert-dismiss-button {
      color: var(--c-bg-lighter);
    }
  }

  &.alert-scheme-tip {
    background-color: var(--c-tip-bg);
    span {
      color: var(--c-tip-text);
    }
    a {
      color: var(--c-tip-text);
    }
    .alert-dismiss-button {
      color: var(--c-tip-text);
    }
  }

  &.alert-scheme-neutral {
    background-color: var(--c-brand);
    span {
      color: var(--c-bg-lighter);
    }
    a {
      color: var(--c-bg-lighter);
    }
    .alert-dismiss-button {
      color: var(--c-bg-lighter);
    }
  }

  &.alert-scheme-success {
    background-color: var(--c-success);
    span {
      color: var(--c-bg-lighter);
    }
    a {
      color: var(--c-bg-lighter);
    }
    .alert-dismiss-button {
      color: var(--c-bg-lighter);
    }
  }
}
</style>
