---
description: VitePress Default Theme Plus extends the VitePress default theme with some extra power and features.
layout: home
hero:
  name: VitePress Theme +
  text: The Default Theme w/ MoAr PoWaH.
  tagline: The default VitePress theme extended with things helpful to <strong>BIG</strong> open source projects
  image:
    src: /images/vitepress-lando-logo.webp
    alt: VitePress
  actions:
    - theme: brand
      text: Get Started
      link: /overview
    - theme: alt
      text: View on GitHub
      link: https://github.com/lando/vitepress-theme-default-plus
features:
  - icon: 🗃️
    title: Collections
    details: Organize and tag docs into categories like <em>posts</em> or <em>guides</em> each with default frontmatter.
  - icon: 🧾
    title: Navbar+
    details: Configurable dropdown column size, expiring badges and notifications.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" id="RSSicon" viewBox="0 0 8 8" width="24" height="24"><title>RSS feed icon</title><style type="text/css">.button {stroke: none; fill: orange;}.symbol {stroke: none; fill: white;}</style><rect class="button" width="8" height="8" rx="1.5"/><circle class="symbol" cx="2" cy="6" r="1"/><path class="symbol" d="m 1,4 a 3,3 0 0 1 3,3 h 1 a 4,4 0 0 0 -4,-4 z"/><path class="symbol" d="m 1,2 a 5,5 0 0 1 5,5 h 1 a 6,6 0 0 0 -6,-6 z"/></svg>'
    title: Feeds
    details: Generate one or many RSS feeds using glob patterns.
  - icon: 🧩
    title: Components
    details: Additonal markdown containers, YouTube, MailChimp and other components.
  - icon: 🦄
    title: Contributors
    details: Automatically populate contributor metadata from git.
  - icon: 🔨
    title: MVB
    details: Build multiple versions of your docs using our `mvb` command
  - icon: 🤖
    title: Autometa
    details: Automatically add metadata for X, Facebook, canonical links, etc.
  - icon: 🥳
    title: And More!
    details: Read on to learn what else VitePress Theme + has to offer...
---

<script setup>
import {VPButton} from 'vitepress/theme';
</script>

<div class="home-other-stuff">
  <VPButton href="/overview" size="medium" text="Read more" />
</div>

<style>
.clip {
  color: transparent;
}
.home-other-stuff {
  padding: 64px 0px;
  text-align: center;
}

@media (min-width: 1290px) {
  .home-other-stuff {
    text-align: left;
    margin: 0 auto;
    max-width: 1152px;
  }
}

</style>
