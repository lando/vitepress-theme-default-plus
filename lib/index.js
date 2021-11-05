const { path } = require('@vuepress/utils')

module.exports = {
  name: '@lando/vuepress-docs-theme',
  layouts: path.resolve(__dirname, 'layouts'),
  plugins: [
    [
      '@vuepress/docsearch',
      {
        apiKey: '15e332850128e9ec96929f44c62f6c88',
        indexName: 'lando',
      },
    ],
    [
      '@vuepress/register-components',
      {
        componentsDir: path.resolve(__dirname, 'components') + '/global',
        componentsPatterns: ['*.vue', '**/*.vue']
      },
    ],
  ]
}
