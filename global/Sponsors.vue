<template>
  <div
    v-if="hasSponsors && frontmatter.sponsors !== false"
    class="sponsors"
  >
    <span class="header">SPONSORS</span>
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

    <div class="sponsor-footer">
      <a
        :href="sponsors.link"
        target="_blank"
      >
        <div class="sponsor sponsor-full">
          <span class="sponsor-link">
            {{ sponsors.text }}
          </span>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue';
import {useThemeData} from '@vuepress/plugin-theme-data/lib/client';
import {usePageFrontmatter} from '@vuepress/client';

// Get theme data
const themeData = useThemeData();
const frontmatter = usePageFrontmatter();
// Get relevant config from themedata
const {sponsors} = themeData.value;
// Compute sponsor list
const sponsorList = computed(() => {
  sponsors.data.forEach(sponsor => {
    sponsor.classes = `sponsor sponsor-${sponsor.type}`;
  });
  return sponsors.data;
});
// Compute whether we end up with any sponsors or not
const hasSponsors = computed(() => sponsors.data.length > 0);
</script>

<style lang="scss" scoped>
@import '../styles/main.scss';
.sponsors {
  .header {
    color: var(--c-text-light);
    display: block;
    margin: 3em 0 1em;
    font-weight: 700;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: .4px;
  }
}
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
  cursor: pointer;;
  .sponsor-inner {
    background-color: var(--c-bg-lighter);
    width: 100%;
    height: 100%;
    margin-left: 1px;
    margin-right: 1px;
    display: flex;
    align-items: center;
    justify-content: space-around;
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
    background-color: var(--c-bg-lighter);
    width: 100%;
    height: 50px;
    margin-left: 1px;
    margin-right: 1px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .sponsor-link {
      color: var(--c-text-light);
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
</style>
