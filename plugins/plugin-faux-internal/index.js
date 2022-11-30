import {chalk, warn} from '@vuepress/utils';
import {customLinksPlugin} from './custom-links.js';
import {makeFauxInternal} from './utils';

export const fauxInternalPlugin = (options = {}) => {
  const name = '@lando/plugin-faux-internal';
  if (!options.baseUrl) {
    warn(`plugin ${chalk.magenta(name)} has no baseUrl set, plugin not loaded`);
    return {};
  }

  return app => {
    // If baseUrl and base are both set and home is not then lets set a better default
    if (app.options.base && !options.home) {
      options.home = options.baseUrl;
    }

    // Make sure if navbar has any "faux internal links" that they are set as such
    options.navbar = makeFauxInternal(options.navbar, options.baseUrl);

    return {
      name,
      // Replace the core linksPlugin
      extendsMarkdown: md => {
        md.use(customLinksPlugin, options);
      },
    };
  };
};
