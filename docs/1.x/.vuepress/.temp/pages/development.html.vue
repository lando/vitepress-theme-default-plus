<template><div><h1 id="development" tabindex="-1"><a class="header-anchor" href="#development" aria-hidden="true">#</a> Development</h1>
<h2 id="requirements" tabindex="-1"><a class="header-anchor" href="#requirements" aria-hidden="true">#</a> Requirements</h2>
<p>(<a href="https://lando.dev/" target="_blank" rel="noopener noreferrer">Lando<ExternalLinkIcon/></a>) <strong>OR</strong> (<a href="https://nodejs.org/en/download/" target="_blank" rel="noopener noreferrer">Node 14+<ExternalLinkIcon/></a> and <a href="https://classic.yarnpkg.com/lang/en/docs/install" target="_blank" rel="noopener noreferrer">Yarn<ExternalLinkIcon/></a>)</p>
<div class="custom-container tip"><p class="custom-container-title">Yarn is optional</p>
<p><code v-pre>yarn</code> is technically optional but is preferred and is assumed in the docs below. That said you can probably use <code v-pre>npm</code> as a drop in replacement for <code v-pre>yarn</code> below and end up in the same place.</p>
</div>
<CodeGroup>
<CodeGroupItem title="LANDO">
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># clone repo</span>
<span class="token function">git</span> clone https://github.com/lando/vuepress-theme-default-plus.git <span class="token operator">&amp;&amp;</span>
  <span class="token punctuation">\</span> <span class="token builtin class-name">cd</span> vuepress-theme-default-plus

<span class="token comment"># start up app</span>
lando start

<span class="token comment"># launch dev server</span>
lando dev
</code></pre></div></CodeGroupItem>
<CodeGroupItem title="YARN">
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># clone repo</span>
<span class="token function">git</span> clone https://github.com/lando/vuepress-theme-default-plus.git <span class="token operator">&amp;&amp;</span>
  <span class="token punctuation">\</span> <span class="token builtin class-name">cd</span> vuepress-theme-default-plus

<span class="token comment"># install deps</span>
<span class="token function">yarn</span>

<span class="token comment"># launch dev server</span>
<span class="token function">yarn</span> dev

<span class="token comment"># launch dev server in debug mode</span>
<span class="token assign-left variable">DEBUG</span><span class="token operator">=</span><span class="token string">"@lando/*"</span> <span class="token function">yarn</span> dev
</code></pre></div></CodeGroupItem>
</CodeGroup>
<h2 id="testing" tabindex="-1"><a class="header-anchor" href="#testing" aria-hidden="true">#</a> Testing</h2>
<CodeGroup>
<CodeGroupItem title="LANDO">
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># lint the code</span>
lando <span class="token function">yarn</span> <span class="token builtin class-name">test</span>
</code></pre></div></CodeGroupItem>
<CodeGroupItem title="YARN">
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># lint the code</span>
<span class="token function">yarn</span> <span class="token builtin class-name">test</span>
</code></pre></div></CodeGroupItem>
</CodeGroup>
<h2 id="releasing" tabindex="-1"><a class="header-anchor" href="#releasing" aria-hidden="true">#</a> Releasing</h2>
<p>Here are some helpful commands to actually deploy a release.</p>
<CodeGroup>
<CodeGroupItem title="LANDO">
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># build the site</span>
lando <span class="token function">yarn</span> build

<span class="token comment"># bump and tag the version the site</span>
lando <span class="token function">yarn</span> release
</code></pre></div></CodeGroupItem>
<CodeGroupItem title="YARN">
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># build the site</span>
<span class="token function">yarn</span> build

<span class="token comment"># bump and tag the version the site</span>
<span class="token function">yarn</span> release
</code></pre></div></CodeGroupItem>
</CodeGroup>
<p>An actual release to <code v-pre>npm</code> can be done by <a href="https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository" target="_blank" rel="noopener noreferrer">create a release on GitHub<ExternalLinkIcon/></a>. Pre-releases will deploy to <code v-pre>@edge</code> tag.</p>
</div></template>


