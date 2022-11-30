<template>
  <div
    v-if="hasJobs"
    class="jobs"
  >
    <span class="header">Jobs</span>
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
import {useThemeData} from '@vuepress/plugin-theme-data/client';

// Get theme data
const themeData = useThemeData();
// Get relevant config from themedata
const {jobs} = themeData.value;
// Compute whether we end up with any jobs or not
const hasJobs = computed(() => jobs.length > 0);
</script>

<style lang="scss" scoped>
@import '../styles/main.scss';
.job {
  background-color: var(--c-bg-lighter);
  padding: 10px;
  border-radius: 3px;
  font-weight: 400;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    color: var(--c-text-light);
  }
  .job-image {
    width: 34px;
    margin-right: 5px;
    img {
      max-height: 24px;
      max-width: 24px;
    }
  }
  .job-info {
    width: 100%;
    .job-title {
      font-size: 14px;
      font-weight: 400;
      a {
        color: var(--c-brand);
      }
    }
    .job-aux {
      color: var(--c-text-quote);
      font-size: 10px;
      letter-spacing: .3px;
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
