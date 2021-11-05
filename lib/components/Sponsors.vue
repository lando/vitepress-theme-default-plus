<template>
  <div id="special_sponsors">
    <h4>special sponsors</h4>
    <div class="sponsor-wrapper">
      <div class="special-sponsor-block" v-for="(sponsor, index) in sponsorList" :key="index">
        <a :href="sponsor.url" target="_blank">
          <div class="special-sponsor-image"><img :src="sponsor.logo" :alt="sponsor.name"></div>
        </a>
      </div>
    </div>

    <div class="special-sponsor-footer">
      <a href="https://lando.dev/sponsor" target="_blank">become a sponsor</a>
    </div>
  </div>
</template>


<script>
import { filter } from 'lodash';
import { useThemeData } from '@vuepress/plugin-theme-data/lib/client';

export default {
  data() {
    return {
      sponsorList: [],
    };
  },
  setup() {
    // Get theme data
    const themeData = useThemeData();
    // Get the config from themedata
    const {showSponsors = true} = themeData.value;
    const {sponsors = []} = themeData.value;

    return {
      showSponsors,
      sponsors
    }
  },
  mounted() {
    this.sponsorList = !Array.isArray(this.showSponsors) 
      ? this.sponsors
      : filter(this.sponsors, sponsor => {
          return this.showSponsors.includes(sponsor.id);
      });
  },
};
</script>

<style lang="scss">
@import '../styles/main.scss';
#special_sponsors {
  padding: 3em;
  position: absolute;
  right: 2em;
  top: 6em;
  width: 150px;
  background: transparent;
  opacity: .75;
  text-align: center;
  font-size: .8em;
}
.special-sponsor-block {
  img {
    width: 100px;
    padding-bottom: 2em;
  }
}
@media (max-width: 1300px) {
  #special_sponsors {
    position: initial;
    padding: 1em;
    right: initial;
    top: initial;
    width: initial;
    .sponsor-wrapper {
      display: flex;
      justify-content: center;
      .special-sponsor-block {
        margin-top: auto;
        margin-bottom: auto;
        padding-right: 1em;
        &:last-of-type {
          padding-right: 0;
        }
        img {
          height: auto;
          padding: 0;
        }
      }
    }
    .special-sponsor-footer {
      padding-top: 2em;
    }
  }
}
</style>