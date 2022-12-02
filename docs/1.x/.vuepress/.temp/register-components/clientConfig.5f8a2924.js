import { defineAsyncComponent } from 'vue'

export default {
  enhance: ({ app }) => {    
      app.component("Jobs", defineAsyncComponent(() => import("/Users/pirog/work/vuepress-theme-default-plus/global/Jobs.vue"))),
      app.component("MailChimp", defineAsyncComponent(() => import("/Users/pirog/work/vuepress-theme-default-plus/global/MailChimp.vue"))),
      app.component("Sponsors", defineAsyncComponent(() => import("/Users/pirog/work/vuepress-theme-default-plus/global/Sponsors.vue"))),
      app.component("YouTube", defineAsyncComponent(() => import("/Users/pirog/work/vuepress-theme-default-plus/global/YouTube.vue")))
  },
}
