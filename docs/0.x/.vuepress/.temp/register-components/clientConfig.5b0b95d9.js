import { defineAsyncComponent } from 'vue'

export default {
  enhance: ({ app }) => {    
      app.component("ContributorList", defineAsyncComponent(() => import("/Users/pirog/work/vuepress-theme-default-plus/plugins/plugin-contributors-page/ContributorList.vue")))
  },
}
