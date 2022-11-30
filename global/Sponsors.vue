<template>
  <div
    v-if="hasSponsors"
    class="sponsors"
  >
    <span class="header">Sponsors</span>
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
import {useThemeData} from '@vuepress/plugin-theme-data/client';

// Get theme data
const themeData = useThemeData();
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
  border-radius: 3px;
  .sponsor-inner {
    background-color: var(--c-bg-lighter);
    width: 100%;
    height: 100%;
    margin-left: 1px;
    margin-right: 1px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 3px;
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

.read-mode {
  .sponsors {
    display: none;
  }
}
</style>
