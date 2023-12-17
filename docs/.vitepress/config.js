import path from 'node:path';
import {defineConfig} from '../../config';

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@lando/vitepress-theme-default-plus': path.resolve(__dirname, '../../index.js'),
        '@lando/vitepress-theme-default-plus/config': path.resolve(__dirname, '../../config.js'),
      },
    },
  },
  title: 'VitePress Blog',
  description: 'A VitePress Blog Theme',
  themeConfig: {
    editLink: {
      pattern:
        'https://github.com/jcamp-code/vitepress-blog-theme/edit/main/docs/:path',
    },
    blog: {
      title: 'My AI Written Blog',
      description: 'All these articles were written by AI!',
      defaultAuthor: 'AI Writer',
      categoryIcons: {
        article: 'i-[heroicons-outline/book-open]',
        tutorial: 'i-[heroicons-outline/academic-cap]',
        document: 'i-[heroicons-outline/annotation]',
      },
      tagIcons: {
        github: 'i-[carbon/logo-github]',
        vue: 'i-[carbon/logo-vue]',
      },
    },
    search: {
      provider: 'local',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: 'Guide',
        link: '/guide/what-is-vitepress-blog',
        activeMatch: '/guide/',
      },
      {
        text: 'Reference',
        link: '/reference/config',
        activeMatch: '/reference/',
      },
      {
        text: 'Examples',
        items: [
          {
            text: 'Markdown',
            link: '/markdown-examples',
          },
          {
            text: 'Theme Test',
            link: '/theme-test',
          },
        ],
      },
      {
        text: 'Blog',
        activeMatch: '/blog/',
        items: [
          {
            text: 'Blog Home',
            link: '/blog/',
            activeMatch: '/blog/$',
          },
          {
            text: 'Tags',
            link: '/blog/tags',
            activeMatch: '/blog/tags',
          },
          {
            text: 'Archives',
            link: '/blog/archives',
            activeMatch: '/blog/archives',
          },
          // {
          //   text: 'RSS Feed',
          //   link: '/blog/feed.rss',
          // },
        ],
      },
      {
        text: '1.0.0',
        items: [
          {
            text: 'Changelog',
            link: 'https://github.com/jcamp-code/vitepress-blog-theme/blob/main/CHANGELOG.md',
          },
          {
            text: 'Contributing',
            link: 'https://github.com/jcamp-code/vitepress-blog-theme/blob/main/.github/contributing.md',
          },
        ],
      },
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/jcamp-code/vitepress-blog-theme',
      },
    ],
  },
});
