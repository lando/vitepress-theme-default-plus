<template>
  <div
    v-if="hasJobs"
    class="jobs"
  >
    <span
      v-if="props.title"
      class="ad-header"
    >
      {{ props.title }}
    </span>
    <div
      v-for="(job, index) in jobs"
      :key="index"
      class="job"
    >
      <a
        :href="job.link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="job-image">
          <img
            :src="job.logo"
            :alt="job.company"
          >
        </div>
        <div class="job-info">
          <div class="job-title">{{ job.title }}</div>
          <div class="job-aux">
            {{ job.company }} - {{ job.aux }}
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue';
import {useData} from 'vitepress';

const props = defineProps({
  title: {
    type: [String, Boolean],
    default: 'Jobs',
  },
});

const {theme, frontmatter} = useData();
const jobs = frontmatter.value.jobs ?? theme.value.jobs ?? [];

// Compute whether we end up with any jobs or not
const hasJobs = computed(() => jobs !== false && jobs.length > 0);

</script>

<style lang="scss" scoped>
.job {
  background-color: var(--vp-carbon-ads-bg-color);
  padding: 10px;
  border-radius: var(--vpl-c-border-radius);
  font-weight: 400;
  margin-bottom: 10px;
  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    color: var(--vp-c-text-1);
    font-weight: 700;
  }
  .job-image {
    width: 34px;
    margin-right: 5px;
    text-decoration: none;
    img {
      max-height: 24px;
      max-width: 24px;
    }
  }
  .job-info {
    width: 100%;
    .job-title {
      font-size: 14px;
    }
    .job-aux {
      font-size: 10px;
      letter-spacing: .3px;
      color: var(--vp-c-brand-1);
      font-weight: 400;
    }
  }
}

@media (max-width: 1500px) {
  .rightbar {
    .jobs {
      display: none;
    }
  }
}

.read-mode {
  .jobs {
    display: none;
  }
}
</style>
