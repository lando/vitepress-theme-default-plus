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
    const {showSponsors, sponsors} = themeData.value;

    // Compute sponsor list
    const sponsorList = computed(() => {
      // return entire list if true
      if (showSponsors === true) return sponsors;
      // otherwise try to filter
      return sponsors.filter(sponsor => showSponsors.includes(sponsor.id));
    });

    // Compute whether we end up with any sponsors or not
    const hasSponsors = computed(() => sponsorList.value.length > 0);

    return {hasSponsors, showSponsors, sponsorList};
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
@media (max-width: 1300px) {
  #special_sponsors {
    padding-top: var(--navbar-height);
    padding-left: var(--sidebar-width);
    position: initial;
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
