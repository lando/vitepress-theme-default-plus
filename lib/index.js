const { path } = require('@vuepress/utils')

const docsTheme = (options, app) => {
  return {
    name: 'vuepress-docs-theme',
    layouts: path.resolve(__dirname, 'layouts'),
  }
}