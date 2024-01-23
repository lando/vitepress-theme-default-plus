<template>
  <div class="newsletter post-subscribe">
    <div class="newsletter__wrap">
      <div class="newsletter__title">
        <h3>{{ props.title }}</h3>
      </div>
      <div class="newsletter__content">
        {{ props.byline }}
      </div>
      <div id="mc_embed_signup">
        <form
          id="mc-embedded-subscribe-form"
          :action="props.action"
          method="post"
          name="mc-embedded-subscribe-form"
          class="validate subscribe-form"
          target="_blank"
          novalidate
        >
          <input
            id="mce-EMAIL"
            v-model="email"
            type="email"
            placeholder="Email address"
            name="EMAIL"
            class="subscribe-input"
          >
          <div
            id="mce-responses"
            class="clear"
          >
            <div
              id="mce-error-response"
              class="response"
              style="display:none"
            />
            <div
              id="mce-success-response"
              class="response"
              style="display:none"
            />
          </div>
          <div
            style="position: absolute; left: -5000px;"
            aria-hidden="true"
          >
            <input
              type="text"
              name="b_59874b4d6910fa65e724a4648_613837077f"
              tabindex="-1"
              value=""
            >
          </div>
          <VPButton
            size="big"
            :text="props.button"
          >
            <input
              id="mc-embedded-subscribe"
              :class="{ disabled: !email }"
              :disabled="!email"
              type="submit"
              name="subscribe"
              value=""
            >
          </VPButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {VPButton} from 'vitepress/theme';

const props = defineProps({
  action: {
    required: true,
    type: String,
  },
  title: {
    type: String,
    default: 'Subscribe to the newsletter!',
  },
  byline: {
    type: String,
    default: null,
  },
  button: {
    type: String,
    default: 'Subscribe',
  },
});

const email = ref(null);
</script>

<style lang="scss" scoped>
.newsletter {
  text-align: center;
  color: var(--vp-c-text-1);
  margin: 16px 0;
}
.newsletter__wrap {
  padding: 32px 32px;
  border-radius: var(--vpl-c-border-radius);
  box-sizing: border-box;
  width: auto;
  font-size: 14px;
  input[type=email], input[type=text], textarea {
    border: 0 solid #f8f8f8;
    box-sizing: border-box;
    height: 50px;
    width: 100%;
    padding: 1em;
    &:focus {
      outline: 1px solid var(--vp-c-brand-soft);
      outline-offset: 2px;
    }
  }
}
.newsletter__title {
  h3 {
    margin: 0;
    color: var(--vp-custom-block-brand-title);
    font-weight: 600;
    font-size: 18px;
    text-transform: uppercase;
  }
}
.newsletter__content {
  margin: 16px 0;
  line-height: 28px;
}
.post-subscribe {
  .subscribe {
    width: 100%;
    padding: 0;
  }
  .subscribe-input {
    background-color: var(--vp-c-bg);
    font-size: inherit;
    border: 1px solid var(--vp-c-bg-alt);
    width: 100%;
    padding: 0.6rem 1.2rem;
    box-sizing: border-box;
    border-radius: var(--vpl-c-border-radius);
    outline: none;
    height: auto;
    margin: 1em 0;
  }
  .newsletter__wrap {
    background-color: var(--vp-c-brand-soft);
  }
  @media (max-width: 767px) {
    .post-subscribe .subscribe-form {
      display: block;
    }
  }
}

@media (max-width: 420px) {
  .newsletter {
    padding-left: 0;
    padding-right: 0;
    border-radius: 0;
    width: 100%;
  }
  .newsletter__wrap {
    margin: 0.85rem -1.5rem;
    border-radius: 0;
  }
}
</style>
