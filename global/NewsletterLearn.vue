<template>
  <div class="newsletter post-subscribe">
    <div class="newsletter__wrap">
      <div class="newsletter__title">
        Want more helpful onboarding content?
      </div>
      <div class="newsletter__content">
        Sign up and we'll send you a new and helpful guide every week!
      </div>
      <Subscribe
        success-message="Soon you will be the master!"
        :custom-styles="stylez"
        :groups="groups"
        title=""
      />
    </div>
  </div>
</template>

<script>
import Subscribe from '../components/Subscribe.vue';

export default {
  name: 'NewsletterLearn',
  components: {Subscribe}, // eslint-disable-line
  data() {
    return {
      stylez: {
        width: '100%',
      },
      groups: ['NEWSLETTER', 'NEWUSER'],
    };
  },
};
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
  background-color: #f8f8f8;
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
  border: 1px solid var(  --c-border);
  width: 100%;
  padding: 0.6rem 1.2rem;
  box-sizing: border-box;
  border-radius: 3px;
  margin-bottom: 0.8rem;
  outline: none;
}
.newsletter__button {
  font-size: inherit;
  border: none;
  cursor: pointer;
  background: var(  --c-text-accent);
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
      background: #ed3f7a;
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
  .subscribe-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
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
    &:focus {
      outline: none;
      border: 0;
      border-color: transparent;
    }
  }
  @media (max-width: $MQMobile) {
    .subscribe-form {
      display: block;
    }
    .newsletter__wrap {
      background-color: #f8f8f8;
    }
  }
}
</style>
