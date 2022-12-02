import { defineAsyncComponent } from 'vue'

export default {
  enhance: ({ app }) => {    
      app.component("TagPage", defineAsyncComponent(() => import("/Users/pirog/work/vuepress-theme-default-plus/plugins/plugin-simple-tags/TagPage.vue")))
  },
}
