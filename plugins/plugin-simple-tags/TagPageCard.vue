<template>
  <div class="tag-page-summary-card-outer">
    <RouterLink
      :to="props.page.path"
      class="tag-page-title"
    >
      <div class="tag-page-summary-card">
        <h2>{{ title }}</h2>
        <div
          class="tag-page-summary"
        >
          {{ summary }}
        </div>
        <div class="tag-page-attribution">
          <div class="authors">
            <span
              v-for="author in authors"
              :key="author.pic"
              class="pic"
            >
              <a
                :href="author.link"
                target="_blank"
              ><img
                width="30"
                height="30"
                :src="author.pic"
                :alt="author.name"
                class="custom"
              ></a>
            </span>

            <span
              v-for="author in authors"
              :key="author.pic"
              class="author"
            >
              <a
                :href="author.link"
                target="_blank"
              >{{ author.name }}{{ author.separator }}</a>
            </span>
          </div>

          <div
            class="date"
          >
            {{ date }}
          </div>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
import gravatarUrl from 'gravatar-url';
import {RouterLink} from 'vue-router';
import {computed} from 'vue';

const props = defineProps({
  page: {
    type: Object,
    required: true,
  },
});

// Normalize page input
const title = computed(() => props.page.title);
const summary = computed(() => props.page.summary);
const date = computed(() => {
  const updatedDate = new Date(props.page.timestamp);
  const abbrevDays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${abbrevDays[updatedDate.getDay()]}, ${months[updatedDate.getMonth()]} ${updatedDate.getDate()}, ${updatedDate.getFullYear()}`;
});
const authors = computed(() => {
  const people = (props.page.authors || props.page.contributors)
    .map(person => {
      if (!person.pic && person.email) {
        person.pic = gravatarUrl(person.email, {size: 60});
      }
      if (!person.link && person.email) {
        person.link = `mailto:${person.email}`;
      }
      person.alt = `Picture of ${person.name}`;
      person.title = person.name;
      person.separator = ',';
      return person;
    });
  const lastPerson = people[people.length - 1];
  lastPerson.separator = '';
  return people;
});
</script>

<style lang="scss" scoped>
@import '../../styles/main.scss';
.tag-page-summary-card-outer {
  a {
    color: var(--c-text-light);
    &:hover {
      color: white;
      text-decoration: none;
    }
  }
  .tag-page-summary-card {
    background-color: var(--c-bg-lighter);
    border-radius: 3px;
    margin-bottom: 10px;
    padding: 1em 1em 2em 2em;
    h2 {
      border: 0;
    }
    &:hover {
      background-color: var(--c-brand);
      color: white;
      transition: all 0.2s;
      .tag-page-attribution {
        color: white;
        a {
          color: white;
        }
      }
    }
    .tag-page-summary {
      padding-top: 1em;
      padding-bottom: 2em;
      line-height: 1.7;
      opacity: .86;
    }
    .tag-page-attribution {
      padding: 0 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--c-text-lightest);
      text-transform: uppercase;
      font-size: .8em;
      .authors {
        display: flex;
        align-items: center;
        .author {
          margin-right: 5px;
        }
        .pic {
          margin-right: 8px;
          img {
            margin-left: -19px;
            border-radius: 50% !important;
            width: 30px;
            max-width: initial;
          }
        }
      }
    }
  }
}
</style>
