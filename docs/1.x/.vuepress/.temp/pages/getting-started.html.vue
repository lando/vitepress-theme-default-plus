<template><div><h1 id="getting-started" tabindex="-1"><a class="header-anchor" href="#getting-started" aria-hidden="true">#</a> Getting Started</h1>
<h2 id="installation" tabindex="-1"><a class="header-anchor" href="#installation" aria-hidden="true">#</a> Installation</h2>
<p>To start you should install the theme into your VuePress 2 site with either <code v-pre>yarn</code> or <code v-pre>npm</code>.</p>
<CodeGroup>
<CodeGroupItem title="YARN">
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> @lando/vuepress-theme-default-plus <span class="token parameter variable">--dev</span>
</code></pre></div></CodeGroupItem>
<CodeGroupItem title="NPM">
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> @lando/vuepress-theme-default-plus --save-dev
</code></pre></div></CodeGroupItem>
</CodeGroup>
<div class="custom-container danger"><p class="custom-container-title">MUST USE VUEPRESS 2.0.0-beta.53</p>
<p>VuePress 2.0.0 is currently in <code v-pre>beta</code> and as such is currently still introducing <a href="https://github.com/vuepress/vuepress-next/blob/main/CHANGELOG.md" target="_blank" rel="noopener noreferrer">many breaking changes<ExternalLinkIcon/></a>. For that reason you <em>must</em> use version 2.0.0-beta.53 with the current version of this theme..</p>
<p><strong>THIS MEANS YOU LIKELY WILL NEED TO UPDATE YOUR SUBTHEME TO ACCOMMODATE THE BREAKING CHANGES!.</strong></p>
</div>
<h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h2>
<p>Import the theme directly to your <a href="https://v2.vuepress.vuejs.org/guide/theme.html#community-theme" target="_blank" rel="noopener noreferrer">theme key<ExternalLinkIcon/></a> in your VuePress 2 <code v-pre>config.js</code> and pass the config into the theme function.</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>defineUserConfig<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@vuepress/cli'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>defaultThemePlus<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@lando/vuepress-theme-default-plus'</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineUserConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token literal-property property">theme</span><span class="token operator">:</span> <span class="token function">defaultThemePlus</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token operator">...</span>
    <span class="token literal-property property">docsDir</span><span class="token operator">:</span> <span class="token string">'docs'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">docsBranch</span><span class="token operator">:</span> <span class="token string">'main'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">navbar</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span><span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'GitHub'</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">'https://github.com/lando/vuepress-theme-default-plus/'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token operator">...</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Check out the <RouterLink to="/config.html">configuration page</RouterLink> for the complete set of config options.</p>
</div></template>


