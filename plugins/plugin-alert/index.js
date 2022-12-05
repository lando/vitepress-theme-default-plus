import {getDirname, path} from '@vuepress/utils';

const __dirname = getDirname(import.meta.url);

export const alertPlugin = () => {
  const name = '@lando/plugin-alert';
  return () => {
    return {
      name,
      alias: {
        '@theme/Alert.vue': path.resolve(__dirname, 'Alert.vue'),
      },
    };
  };
};
