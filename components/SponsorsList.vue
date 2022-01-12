<template>
  <div
    v-if="hasSponsors"
    id="special_sponsors"
  >
    <h4>special sponsors</h4>
    <div class="sponsor-wrapper">
      <div
        v-for="(sponsor, index) in sponsorList"
        :key="index"
        class="special-sponsor-block"
      >
        <a
          :href="sponsor.url"
          target="_blank"
        >
          <div class="special-sponsor-image"><img
            :src="sponsor.logo"
            :alt="sponsor.name"
          ></div>
        </a>
      </div>
    </div>

    <div class="special-sponsor-footer">
      <a
        href="https://lando.dev/sponsor"
        target="_blank"
      >become a sponsor</a>
    </div>
  </div>
</template>


<script>
import {computed} from 'vue';
import {useThemeData} from '@vuepress/plugin-theme-data/lib/client';

export default {
  setup() {
    // Get theme data
    const themeData = useThemeData();
    // Get relevant config from themedata
    const {sponsors} = themeData.value;

    // Compute sponsor list
    const sponsorList = computed(() => sponsors.data);

    // Compute whether we end up with any sponsors or not
    const hasSponsors = computed(() => sponsors.data.length > 0);

    return {hasSponsors, sponsorList};
  },
};
</script>

<style lang="scss">
@import '../styles/main.scss';
#special_sponsors {
  padding: 3em;
  position: fixed;
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
@media (max-width: 1500px) {
  #special_sponsors {
    display: none;
  }
}
</style>
