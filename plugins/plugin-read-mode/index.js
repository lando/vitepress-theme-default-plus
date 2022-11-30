import {path} from '@vuepress/utils';

export const readModePlugin = () => {
  const name = '@lando/plugin-read-mode';
  return () => {
    return {
      name,
      clientConfigFile: path.resolve(__dirname, 'read-mode.js'),
      alias: {
        '@theme/ReadMode.vue': path.resolve(__dirname, 'ReadMode.vue'),
      },
    };
  };
};
