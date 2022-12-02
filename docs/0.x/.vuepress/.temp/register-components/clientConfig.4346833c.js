import { defineAsyncComponent } from 'vue'

export default {
  enhance: ({ app }) => {    
      app.component("Guide", defineAsyncComponent(() => import("@theme/Guide.vue"))),
      app.component("Blog", defineAsyncComponent(() => import("@theme/BlogPost.vue")))
  },
}
