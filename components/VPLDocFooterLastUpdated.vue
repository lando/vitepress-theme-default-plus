<template>
  <ClientOnly>
    <p class="VPLastUpdated">
      {{ theme.lastUpdated?.text || theme.lastUpdatedText || 'Last updated' }}
      <time :datetime="isoDatetime">{{ datetime }}</time>
    </p>
  </ClientOnly>
</template>

<script setup>
import {ref, computed, watchEffect, onMounted} from 'vue';
import {useData} from 'vitepress';
import {format as timeago} from 'timeago.js';

const {theme, page, frontmatter, lang} = useData();

// handle time
const date = computed(() => new Date(frontmatter.value.lastUpdated ?? page.value.lastUpdated));
const isoDatetime = computed(() => date.value.toISOString());
const datetime = ref('');

// set time on mounted hook to avoid hydration mismatch due to
// potential differences in timezones of the server and clients
onMounted(() => {
  watchEffect(() => {
    // allow for timeago style
    // @TODO: timeago has localization support but only en_US and zh_CN by default if we add support for this we need
    // to do this in the component so the localization is relative to the users browser and not the build server
    if (theme.value.lastUpdated?.formatOptions?.dateStyle === 'timeago') {
      datetime.value = timeago(date.value.toLocaleDateString());

    // otherwis the usual
    } else {
      datetime.value = new Intl.DateTimeFormat(
        theme.value.lastUpdated?.formatOptions?.forceLocale ? lang.value : undefined,
        theme.value.lastUpdated?.formatOptions ?? {dateStyle: 'short', timeStyle: 'short'},
      ).format(date.value);
    }
  });
});
</script>

<style scoped>
.VPLastUpdated {
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

@media (min-width: 640px) {
  .VPLastUpdated {
    line-height: 32px;
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
