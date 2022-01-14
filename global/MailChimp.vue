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
          <input
            id="mc-embedded-subscribe"
            :class="{ button: true, disabled: !email }"
            :disabled="!email"
            type="submit"
            :value="props.button"
            name="subscribe"
          >
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
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

<style lang="scss">
@import '../styles/main.scss';
.newsletter {
  text-align: center;
  width: 100%;
  font-size: 1rem;
  color: var(--c-text);
}
.newsletter__wrap {
  margin: 1.5rem auto;
  padding: 1.8rem 2.3rem;
  border-radius: 3px;
  box-sizing: border-box;
  width: auto;
  background-color: var(--c-bg-light);
}
.newsletter__title {
  font-size: 1.7rem;
}
.newsletter__content {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  line-height: 1.7rem;
}
.newsletter__input {
  font-size: inherit;
  border: 1px solid var(--c-border);
  width: 100%;
  padding: 0.6rem 1.2rem;
  box-sizing: border-box;
  border-radius: 3px;
  margin-bottom: 0.8rem;
  outline: none;
}
.button {
  font-size: inherit;
  border: none;
  cursor: pointer;
  background: var(--c-text-accent);
  color: #fff;
  padding: 0.6rem 1.8rem;
  box-sizing: border-box;
  border-radius: 3px;
  width: 100%;
  outline: none;
}
.post-subscribe {
  .subscribe {
    width: 100%;
    padding: 0;
    .button {
      font-size: inherit;
      border: none;
      cursor: pointer;
      background: var(--c-brand);
      color: #fff;
      padding: 0.6rem 1.2rem;
      box-sizing: border-box;
      border-radius: 3px;
      width: 100%;
      outline: none;
      text-transform: none;
      font-weight: 400;
      height: auto;
    }
  }
  .subscribe-input {
    background-color: #fff;
    font-size: inherit;
    border: 1px solid #ddd;
    width: 100%;
    padding: 0.6rem 1.2rem;
    box-sizing: border-box;
    border-radius: 3px;
    margin-bottom: 0.8rem;
    outline: none;
    height: auto;
    margin: 1em 0;
  }
  .newsletter__wrap {
    background-color: var(--c-bg-light);
  }
  @media (max-width: $MQMobile) {
    .post-subscribe .subscribe-form {
      display: block;
    }
  }
}
</style>
