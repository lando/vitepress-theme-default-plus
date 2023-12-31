'use strict';

import {chalk, getDirname, path, warn} from '@vuepress/utils';

const __dirname = getDirname(import.meta.url);

export const hubspotPlugin = ({id}) => {
  const name = '@lando/plugin-hubspot-tracking';
  return () => {
    if (!id) {
      warn(`plugin ${chalk.magenta(name)} has no id set, plugin not loaded!`);
      return {};
    }

    return {
      name,
      clientConfigFile: path.resolve(__dirname, 'hubspot.js'),
      define: {
        __HUBSPOT_OPTIONS__: {id},
      },
    };
  };
};
