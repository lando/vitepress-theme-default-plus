<template>
  <div
    :class="{ subscribe: true, 'subscribe-dark': theme === 'dark' }"
    :style="customStyles"
  >
    <h3>{{ title }}</h3>
    <div id="mc_embed_signup">
      <form
        id="mc-embedded-subscribe-form"
        action="https://dev.us12.list-manage.com/subscribe/post?u=59874b4d6910fa65e724a4648&amp;id=613837077f"
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

        <ul
          v-if="interests.length > 0"
          style="display: none;"
        >
          <li
            v-for="(interest, index) in interests"
            :key="index"
          >
            <input
              :id="`mce-group[${interest.group}]-${interest.group}-${index}`"
              type="checkbox"
              :checked="interest.checked"
              :value="interest.id"
              :name="`group[${interest.group}][${interest.id}]`"
            >
            <label :for="`mce-group[${interest.group}]-${interest.group}-${index}`">{{ interest.label }}</label>
          </li>
        </ul>

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
          :value="buttonLabel"
          name="subscribe"
        >
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NewsletterSubscribe',
  props: {
    buttonLabel: {
      type: String,
      default: 'Subscribe',
    },
    customStyles: {
      type: Object,
      default: () => ({
        width: '90%',
      }),
    },
    interests: {
      type: Array,
      default: () => ([]),
    },
    hideInterests: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: 'Get the latest updates',
    },
    theme: {
      type: String,
      default: 'light',
    },
  },
  data() {
    return {
      email: '',
    };
  },
};
</script>

<style lang="scss">
@import '../styles/main.scss';
.subscribe {
  margin: auto;
  width: 90%;
  padding: 2em 0;
  text-align: center;
  h3 {
    color: $pink;
  }
  &.subscribe-dark {
    background-color: darken(#000, 12%);
    h3 {
      color: lighten(#000, 90%);
    }
  }
  .button {
    text-transform: uppercase;
    background-color: $pink;
    margin: 1em 0;
    font-size: 1.2em;
    font-weight: 500;
    letter-spacing: .05em;
    min-width: 8em;
    text-align: center;
    &:not(:last-child) {
      margin-right: 1%;
    }
    &.disabled {
      opacity: .5;
    }
  }
  .hidden-field {
    visibility: hidden;
  }
  .subscribe-alliance,
  .subscribe-devnetwork,
  .subscribe-sponsors {
    padding-top: 2em;
    padding-bottom: 2em;
    p {
      color: lighten(#000, 90%);
      font-size: 1.2em;
    }
    .subscribe-alliance-wrapper,
    .subscribe-devnetwork-checkbox,
    .subscribe-sponsors-wrapper {
      padding-top: 1em;
      padding-bottom: 1em;
      input.subscribe-alliance-checkbox {
        font-size: 16px;
      }
      label {
        cursor: pointer;
        color: lighten(#000, 90%);
        font-size: 2em;
        font-weight: 800;
      }
      small {
        font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
        color: lighten(#000, 90%);
        text-align: center;
        font-size: 1.4em;
        letter-spacing: 0;
      }
    }
    .subscribe-devnetwork-checkbox {
      padding-top: .5em;
      padding-bottom: .5em;
      label {
        font-size: 1em;
      }
    }
  }
  .subscribe-input {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 80px 10px 20px;
    margin-bottom: 1em;
    height: 50px;
    border-radius: 50px;
    border: 1px solid #ccc;
    font-size: 16px;
    background-color: lighten(#000, 96%);
    &:focus {
      outline: none;
      border-color: lighten($pink, 18%);
    }
    &.disabled {
      opacity: .5;
    }
  }

  .subscribe-error,
  .subscribe-success {
    padding: 1em;
    color: red;
    text-transform: uppercase;
    font-weight: 800;
    font-size: 0.75rem;
    .subscribe-success {
      color: $pink
    }
  }
}

@media (max-width: $MQMobile) {
  .subscribe {
    .subscribe-input {
      width: 90%;
    }
  }
}

</style>
