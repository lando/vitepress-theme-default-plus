export const siteData = JSON.parse("{\"base\":\"/\",\"lang\":\"en-US\",\"title\":\"VuePress 2 Default Theme +\",\"description\":\"The VuePress2 default Theme with some extra power!\",\"head\":[[\"link\",{\"rel\":\"icon\",\"href\":\"/images/favicon.png\"}],[\"link\",{\"rel\":\"preconnect\",\"href\":\"//fonts.googleapis.com\"}],[\"link\",{\"rel\":\"preconnect\",\"href\":\"//fonts.gstatic.com\",\"crossorigin\":true}],[\"link\",{\"rel\":\"stylesheet\",\"href\":\"//fonts.googleapis.com/css2?family=Lexend:wght@500&display=swap\"}]],\"locales\":{}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
