<template>
  <div
    v-if="hasSponsors"
    class="sponsors"
  >
    <span
      v-if="props.title"
      class="ad-header"
    >
      {{ props.title }}
    </span>
    <div class="sponsors-wrapper">
      <div
        v-for="(sponsor, index) in sponsorList"
        :key="index"
        :class="sponsor.classes"
      >
        <div class="sponsor-inner">
          <a
            :href="sponsor.url"
            target="_blank"
          >
            <div class="sponsor-image"><img
              :src="sponsor.logo"
              :alt="sponsor.name"
            ></div>
          </a>
        </div>
      </div>
    </div>

    <div
      v-if="props.text || props.link"
      class="sponsor-footer"
    >
      <a
        :href="props.link"
        target="_blank"
      >
        <div class="sponsor sponsor-full">
          <span class="sponsor-link">
            {{ props.text }}
          </span>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import yaml from 'js-yaml';

import {computed, onMounted, ref} from 'vue';
import {useData} from 'vitepress';

const extname = path => {
  const file = path.split('/')[path.split('/').length - 1];
  const fileparts = file.split('.');
  return fileparts.length > 1 ? `.${fileparts[fileparts.length - 1]}` : undefined;
};

const {theme, frontmatter} = useData();
const sponsors = frontmatter.value.sponsors ?? theme.value.sponsors ?? [];

const props = defineProps({
  text: {
    type: [String, Boolean],
    default: () => {
      const {theme, frontmatter} = useData();
      const sponsors = frontmatter.value.sponsors ?? theme.value.sponsors ?? [];
      return sponsors.text ?? 'your logo?';
    },
  },
  link: {
    type: [String, Boolean],
    default: () => {
      const {theme, frontmatter} = useData();
      const sponsors = frontmatter.value.sponsors ?? theme.value.sponsors ?? [];
      return sponsors.link;
    },
  },
  title: {
    type: [String, Boolean],
    default: 'SPONSORS',
  },
});

// Set sponsor data to some reactive thing
const data = ref(sponsors.data ?? []);

// if data is a string/needs to be fetched then do that here
onMounted(async () => {
  // if data is already an array then we good
  if (Array.isArray(data.value)) return;

  // otherwise it SHOULD be a url string
  try {
    const url = new URL(data.value);
    const response = await fetch(url.href);

    // allow special file extension handling
    switch (extname(url.pathname)) {
      case '.yaml':
      case '.yml':
        data.value = yaml.load(await response.text());
        break;
      default:
        data.value = await response.json();
        break;
    };
  } catch (error) {
    console.error(`could not fetch and parse data from ${data.value}`);
    console.error(error);
  }
});

// Compute sponsor list
const sponsorList = computed(() => {
  if (Array.isArray(data.value)) {
    return data.value.map(sponsor => ({...sponsor, classes: `sponsor sponsor-${sponsor.type}`}));
  } else {
    return [];
  }
});

// Compute whether we end up with any sponsors or not
const hasSponsors = computed(() => sponsors !== false && sponsors && sponsors.data && sponsors.data.length > 0);
</script>

<style lang="scss" scoped>
.sponsors-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.sponsor {
  height: 50px;
  width: 33%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 2px;
  cursor: pointer;
  border-radius: var(--vpl-c-border-radius);
  .sponsor-inner {
    background-color: var(--vp-carbon-ads-bg-color);
    width: 100%;
    height: 100%;
    margin-left: 1px;
    margin-right: 1px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: var(--vpl-c-border-radius);
  }
  &.sponsor-half {
    width: 50%;
  }
  &.sponsor-full {
    width: 100%;
    margin-bottom: 10px;
  }
  .sponsor-image {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 5px;
    img {
      max-height: 40px;
      max-width: 80%;
    }
  }
}
.sponsor-footer {
  margin-top: 10px;
  .sponsor {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: auto;
    background-color: var(--vp-carbon-ads-bg-color);
    width: 100%;
    height: 50px;
    margin-left: 1px;
    margin-right: 1px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .sponsor-link {
      color: var(--vp-c-text-3);
      display: block;
      font-weight: 700;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: .4px;
    }
  }
}
@media (max-width: 1500px) {
  .rightbar {
    .sponsors {
      display: none;
    }
  }
}

.read-mode {
  .sponsors {
    display: none;
  }
}
</style>
