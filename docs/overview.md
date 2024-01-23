---
description: VitePress Default Theme Plus extends the VitePress default theme with some extra power and features.
---

# VitePress Theme +

This extends the [VitePress default theme](https://vitepress.dev) and by extension the [VitePress default theme](https://vitepress.dev) with some extra power and features.

::: tip RTFM
Default this theme extends the default VitePress theme it also has all of its features so it is a **REALLY GOOD IDEA** to familiarize yourself with [their docs](https://vitepress.dev) as well!
:::

## Collections

Organize docs into [collections](./config/config.md#collections) by glob patterns so you can set default front matter and build index pages. And then assemble them into [pages](./pages/collections.md).

For example this theme adds [guides](/guides) and [a blog](/blog).

:::: half
::: success Some Recent Guides
<ul>
  <li v-for="item in guides.pages">
    <a :href="item.url">{{ item.title }}</a>
  </li>
</ul>
:::
::::

:::: half
::: warning Some Recent Blog Postz
<ul>
  <li v-for="item in posts.pages">
    <a :href="item.url">{{ item.title }}</a>
  </li>
</ul>
:::
::::

## Navbar+

Build more [complex navbars](./config/config.md#navbar) with multi-column drop down menus, link badges and expirable notifications as in the demo below:

::: box-brand
<NavBar class="navbar-plus-demo" :item="data"/>
:::

Note that these features only work with "Menu Groups" eg dropdowns that have multiple sections.

## Components

Various Markdown, global and page creation components including this nice tabbed one.

:::tabs box-blue
== Markdown
* [Admonitions](/markdown/admonitions)
* [Alignments](/markdown/alignments)
* [Boxes](/markdown/boxes)
* [Cards](/markdown/cards)
* [Columns](/markdown/columns)
* [Highlights](/markdown/highlights)
* [Tabs](/markdown/tabs)
* [Thumbnails](/markdown/thumbnails)
* [Advanced](/guides/advanced-markdown)

== Global
* [Jobs](/components/jobs)
* [MailChimp](/components/mailchimp)
* [Sponsor](/components/sponsors)
* [YouTube](/components/youtube)

== Page composition
* [Collections](/pages/collections)
* [Team](/pages/teams)
:::

## And More!!!

* [Alert](/config/config#alert)
* [Autometa](/config/config#autometa)
* [Containers](/config/config#containers)
* [Contributors](/config/config#contributors)
* [Feeds](/config/config#feeds)
* [Internal Domains](/config/config#interal-domains)
* [Jobs](/config/config#jobs)
* [Sponsors](/config/config#sponsors)
* [Layouts](/config/config#layouts)
* [Robots](/config/config#robots)
* [Sponsors](/config/config#sponsors)
* [Tracking](/config/config#tracking)

<script setup>
import NavBar from '../components/VPLNavBarMenuGroup.vue';
import {useCollection} from '@lando/vitepress-theme-default-plus';

const posts = useCollection('post');
const guides = useCollection('guide');

const data = {
  text: 'Hover to see NavBar+ features',
  items: [
    {
      text: 'Full Column',
      columns: 1,
      items: [
        {
          text: 'Example Link 1',
          link: '#',
        },
      ],
    },
    {
      text: '2 Columns',
      columns: 2,
      items: [
        {
          text: 'Example Link 1',
          link: '#',
        },
        {
          text: 'Example Link 2',
          link: '#',
        },
      ],
    },
    {
      text: '3 Columns',
      columns: 3,
      items: [
        {
          text: 'Example Link 1',
          link: '#',
        },
        {
          text: 'Example Link 2',
          link: '#',
        },
        {
          text: 'Example Link 3',
          link: '#',
        },
      ],
    },
    {
      text: '4 Columns',
      columns: 4,
      items: [
        {
          text: 'Example Link 1',
          link: '#',
        },
        {
          text: 'Example Link 2',
          link: '#',
        },
        {
          text: 'Example Link 3',
          link: '#',
        },
        {
          text: 'Example Link 4',
          link: '#',
        },
      ],
    },
    {
      text: 'With Alerts',
      columns: 2,
      items: [
        {
          text: 'Old Example Link 1',
          link: '#',
          alert: {
            text: 'DEPRECATED!',
            type: 'danger',
            expires: 16972999930001111,
          },
        },
        {
          text: 'Example Link 2',
          link: '#',
          alert: {
            text: 'NEW!',
            type: 'new',
            expires: 1697299119930001,
          },
        },
      ],
    },
  ],
};
</script>

<style>
.navbar-plus-demo {
  border-radius: var(--vpl-c-border-radius);
  .menu {
    z-index: 9999999999;
  }
}
</style>
