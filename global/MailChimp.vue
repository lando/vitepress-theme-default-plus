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
  background-color: var(--c-brand-bg);
  input[type=email], input[type=text], textarea {
    border: 0 solid #f8f8f8;
    box-sizing: border-box;
    font-size: 1em;
    height: 50px;
    width: 100%;
    padding: 1em;
    &:focus {
      outline: 1px solid var(--c-brand-light);
      outline-offset: 2px;
    }
  }
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
  margin: auto;
  box-sizing: border-box;
  font-size: 16px;
  display: inline-block;
  font-size: 1.2rem;
  padding: 0.8rem 1.6rem;
  background-color: var(--c-brand);
  border-width: 2px;
  border-style: solid;
  border-radius: 4px;
  border-color: var(--c-brand);
  color: #ffffff;
  transition: background-color var(--c-brand-light);
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    background-color: var(--c-brand-light);
    color: #ffffff;
    transition: all 0.2s;
  }
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
    background-color: var(--c-brand-bg);
  }
  @media (max-width: $MQMobile) {
    .post-subscribe .subscribe-form {
      display: block;
    }
  }
}

@media (max-width: $MQMobileNarrow) {
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
