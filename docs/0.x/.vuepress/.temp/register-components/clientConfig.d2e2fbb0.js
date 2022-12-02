import { defineAsyncComponent } from 'vue'

export default {
  enhance: ({ app }) => {    
      app.component("VersionsList", defineAsyncComponent(() => import("/Users/pirog/work/vuepress-theme-default-plus/plugins/plugin-versions-page/VersionsList.vue")))
  },
}
