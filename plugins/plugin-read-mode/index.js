import {getDirname, path} from '@vuepress/utils';

const __dirname = getDirname(import.meta.url);

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
