const {path} = require('@vuepress/utils');

module.exports = (options, app) => {
  // Define default options
  const defaultOptions = {
    // Shows the CarbonAds in the top sidebar
    showCarbonAds: true,
    // Shows the special sponsors on the right
    // Can be true|false|or a list of sponsors to show
    showSponsors: true,
    // Metadata for our sponsors
    // sponsors:
  };

  // Merge together
  options = {...defaultOptions, ...options};

  return {
    name: '@lando/vuepress-docs-theme',
    extends: '@vuepress/theme-default',
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
          componentsDir: path.resolve(__dirname, 'components/global'),
          componentsPatterns: ['*.vue', '**/*.vue'],
        },
      ],
      [
        '@vuepress/plugin-palette',
        {
          preset: 'sass',
        },
      ],
    ],
  };
};
