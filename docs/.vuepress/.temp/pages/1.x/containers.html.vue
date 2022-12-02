<template><div><h1 id="custom-containers" tabindex="-1"><a class="header-anchor" href="#custom-containers" aria-hidden="true">#</a> Custom Containers</h1>
<p>Note that the below are <em>in addition</em> to the <a href="https://v2.vuepress.vuejs.org/reference/default-theme/markdown.html#custom-containers" target="_blank" rel="noopener noreferrer">custom containers<ExternalLinkIcon/></a> from the default theme.</p>
<h2 id="halfsies" tabindex="-1"><a class="header-anchor" href="#halfsies" aria-hidden="true">#</a> Halfsies</h2>
<p>This is useful if you want to break content into two columns for a bit.</p>
<h4 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h4>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>::: half
CONTENT HERE
:::
::: half
CONTENT HERE
:::
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="example" tabindex="-1"><a class="header-anchor" href="#example" aria-hidden="true">#</a> Example</h4>
<h4 id="input" tabindex="-1"><a class="header-anchor" href="#input" aria-hidden="true">#</a> Input</h4>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>::: half
<span class="token url"><span class="token operator">!</span>[<span class="token content">At the Opera</span>](<span class="token url">https://media1.giphy.com/media/bjtM9GdxbqL5e/giphy.gif</span>)</span>
:::
::: half
<span class="token url"><span class="token operator">!</span>[<span class="token content">At the Opera</span>](<span class="token url">https://media1.giphy.com/media/bjtM9GdxbqL5e/giphy.gif</span>)</span>
:::
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="output" tabindex="-1"><a class="header-anchor" href="#output" aria-hidden="true">#</a> Output</h4>
<p>::: half
<img src="https://media1.giphy.com/media/bjtM9GdxbqL5e/giphy.gif" alt="Is it possible to learn this power?">
:::</p>
<p>::: half
<img src="https://media1.giphy.com/media/bjtM9GdxbqL5e/giphy.gif" alt="Is it possible to learn this power?">
:::</p>
<h2 id="thirdsies" tabindex="-1"><a class="header-anchor" href="#thirdsies" aria-hidden="true">#</a> Thirdsies</h2>
<p>This is useful if you want to break content into three columns for a bit.</p>
<h4 id="usage-1" tabindex="-1"><a class="header-anchor" href="#usage-1" aria-hidden="true">#</a> Usage</h4>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>::: third
CONTENT HERE
:::
::: third
CONTENT HERE
:::
::: third
CONTENT HERE
:::
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="example-1" tabindex="-1"><a class="header-anchor" href="#example-1" aria-hidden="true">#</a> Example</h4>
<h4 id="input-1" tabindex="-1"><a class="header-anchor" href="#input-1" aria-hidden="true">#</a> Input</h4>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>::: third
<span class="token url"><span class="token operator">!</span>[<span class="token content">What a show!</span>](<span class="token url">https://c.tenor.com/88jV4RXj3x4AAAAC/not-from-a-jedi-palpatine.gif</span>)</span>
:::
::: third
<span class="token url"><span class="token operator">!</span>[<span class="token content">What a show!</span>](<span class="token url">https://c.tenor.com/88jV4RXj3x4AAAAC/not-from-a-jedi-palpatine.gif</span>)</span>
:::
::: third
<span class="token url"><span class="token operator">!</span>[<span class="token content">What a show!</span>](<span class="token url">https://c.tenor.com/88jV4RXj3x4AAAAC/not-from-a-jedi-palpatine.gif</span>)</span>
:::
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="output-1" tabindex="-1"><a class="header-anchor" href="#output-1" aria-hidden="true">#</a> Output</h4>
<p>::: third
<img src="https://c.tenor.com/88jV4RXj3x4AAAAC/not-from-a-jedi-palpatine.gif" alt="What a show!">
:::
::: third
<img src="https://c.tenor.com/88jV4RXj3x4AAAAC/not-from-a-jedi-palpatine.gif" alt="What a show!">
:::
::: third
<img src="https://c.tenor.com/88jV4RXj3x4AAAAC/not-from-a-jedi-palpatine.gif" alt="What a show!">
:::</p>
<h2 id="center" tabindex="-1"><a class="header-anchor" href="#center" aria-hidden="true">#</a> Center</h2>
<p>This is useful if you want to just center some stuff for awhile.</p>
<h4 id="usage-2" tabindex="-1"><a class="header-anchor" href="#usage-2" aria-hidden="true">#</a> Usage</h4>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>::: center
CONTENT HERE
:::
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="example-2" tabindex="-1"><a class="header-anchor" href="#example-2" aria-hidden="true">#</a> Example</h4>
<h4 id="input-2" tabindex="-1"><a class="header-anchor" href="#input-2" aria-hidden="true">#</a> Input</h4>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>::: center
<span class="token url"><span class="token operator">!</span>[<span class="token content">Bendu in the middle</span>](<span class="token url">https://preview.redd.it/rztids1gllb51.jpg?auto=webp&amp;s=72b1a7d64e6fbfb8e01028e598f854e62de07770</span>)</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>small</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>strong</span><span class="token punctuation">></span></span>IN THE MIDDLE<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>strong</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>small</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
:::
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="output-2" tabindex="-1"><a class="header-anchor" href="#output-2" aria-hidden="true">#</a> Output</h4>
<p>::: center
<img src="https://preview.redd.it/rztids1gllb51.jpg?auto=webp&amp;s=72b1a7d64e6fbfb8e01028e598f854e62de07770" alt="Bendu in the middle"></p>
<p><small><strong>IN THE MIDDLE</strong></small></p>
:::
<h2 id="left" tabindex="-1"><a class="header-anchor" href="#left" aria-hidden="true">#</a> Left</h2>
<p>This is useful if you want to insert a block to float left amid a sea of text.</p>
<h4 id="usage-3" tabindex="-1"><a class="header-anchor" href="#usage-3" aria-hidden="true">#</a> Usage</h4>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>::: left
CONTENT HERE
:::
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="example-3" tabindex="-1"><a class="header-anchor" href="#example-3" aria-hidden="true">#</a> Example</h4>
<h4 id="input-3" tabindex="-1"><a class="header-anchor" href="#input-3" aria-hidden="true">#</a> Input</h4>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>I'm baby occaecat paleo beard twee enamel pin. Irure occupy hot chicken yr heirloom ennui. Eiusmod cliche tempor, four dollar toast tousled sustainable keytar in ut waistcoat dolore. Shoreditch migas excepteur man bun.

::: left
<span class="token url"><span class="token operator">!</span>[<span class="token content">Hip Kitten</span>](<span class="token url">https://i.pinimg.com/originals/70/36/7d/70367d787e4806129c62e759b8ad2aee.jpg</span>)</span>
:::

I'm baby polaroid kale chips tattooed viral iceland lomo authentic next level, coloring book fanny pack four dollar toast. Venmo pop-up four dollar toast snackwave bespoke squid, echo park cardigan austin. Chia hot chicken skateboard tousled, kitsch af vegan food truck snackwave cred craft beer farm-to-table hoodie. Raclette tilde bitters keffiyeh woke, sustainable poutine asymmetrical af slow-carb. Twee tilde fingerstache pug direct trade cold-pressed, forage readymade cray you probably haven't heard of them raw denim.

Cornhole microdosing gochujang lo-fi. Air plant selfies kickstarter seitan, austin listicle pinterest narwhal ramps pop-up kale chips yr next level chambray butcher. Pabst man bun ennui +1. Man bun adaptogen echo park thundercats, la croix gluten-free portland woke mixtape iPhone salvia. Farm-to-table health goth godard, vegan raw denim gastropub pinterest post-ironic vaporware blue bottle readymade PBR&amp;B authentic.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="output-3" tabindex="-1"><a class="header-anchor" href="#output-3" aria-hidden="true">#</a> Output</h4>
<p>I'm baby occaecat paleo beard twee enamel pin. Irure occupy hot chicken yr heirloom ennui. Eiusmod cliche tempor, four dollar toast tousled sustainable keytar in ut waistcoat dolore. Shoreditch migas excepteur man bun.</p>
<p>::: left
<img src="https://i.pinimg.com/originals/70/36/7d/70367d787e4806129c62e759b8ad2aee.jpg" alt="Hip Kitten">
:::</p>
<p>I'm baby polaroid kale chips tattooed viral iceland lomo authentic next level, coloring book fanny pack four dollar toast. Venmo pop-up four dollar toast snackwave bespoke squid, echo park cardigan austin. Chia hot chicken skateboard tousled, kitsch af vegan food truck snackwave cred craft beer farm-to-table hoodie. Raclette tilde bitters keffiyeh woke, sustainable poutine asymmetrical af slow-carb. Twee tilde fingerstache pug direct trade cold-pressed, forage readymade cray you probably haven't heard of them raw denim.</p>
<p>Cornhole microdosing gochujang lo-fi. Air plant selfies kickstarter seitan, austin listicle pinterest narwhal ramps pop-up kale chips yr next level chambray butcher. Pabst man bun ennui +1. Man bun adaptogen echo park thundercats, la croix gluten-free portland woke mixtape iPhone salvia. Farm-to-table health goth godard, vegan raw denim gastropub pinterest post-ironic vaporware blue bottle readymade PBR&amp;B authentic.</p>
<h2 id="right" tabindex="-1"><a class="header-anchor" href="#right" aria-hidden="true">#</a> Right</h2>
<p>This is useful if you want to insert a block to float right amid a sea of text.</p>
<h4 id="usage-4" tabindex="-1"><a class="header-anchor" href="#usage-4" aria-hidden="true">#</a> Usage</h4>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>::: right
CONTENT HERE
:::
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="example-4" tabindex="-1"><a class="header-anchor" href="#example-4" aria-hidden="true">#</a> Example</h4>
<h4 id="input-4" tabindex="-1"><a class="header-anchor" href="#input-4" aria-hidden="true">#</a> Input</h4>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>I'm baby occaecat paleo beard twee enamel pin. Irure occupy hot chicken yr heirloom ennui. Eiusmod cliche tempor, four dollar toast tousled sustainable keytar in ut waistcoat dolore. Shoreditch migas excepteur man bun.

::: right
<span class="token url"><span class="token operator">!</span>[<span class="token content">Hip Kitten</span>](<span class="token url">https://i.pinimg.com/originals/70/36/7d/70367d787e4806129c62e759b8ad2aee.jpg</span>)</span>
:::

I'm baby polaroid kale chips tattooed viral iceland lomo authentic next level, coloring book fanny pack four dollar toast. Venmo pop-up four dollar toast snackwave bespoke squid, echo park cardigan austin. Chia hot chicken skateboard tousled, kitsch af vegan food truck snackwave cred craft beer farm-to-table hoodie. Raclette tilde bitters keffiyeh woke, sustainable poutine asymmetrical af slow-carb. Twee tilde fingerstache pug direct trade cold-pressed, forage readymade cray you probably haven't heard of them raw denim.

Cornhole microdosing gochujang lo-fi. Air plant selfies kickstarter seitan, austin listicle pinterest narwhal ramps pop-up kale chips yr next level chambray butcher. Pabst man bun ennui +1. Man bun adaptogen echo park thundercats, la croix gluten-free portland woke mixtape iPhone salvia. Farm-to-table health goth godard, vegan raw denim gastropub pinterest post-ironic vaporware blue bottle readymade PBR&amp;B authentic.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="output-4" tabindex="-1"><a class="header-anchor" href="#output-4" aria-hidden="true">#</a> Output</h4>
<p>I'm baby occaecat paleo beard twee enamel pin. Irure occupy hot chicken yr heirloom ennui. Eiusmod cliche tempor, four dollar toast tousled sustainable keytar in ut waistcoat dolore. Shoreditch migas excepteur man bun.</p>
<p>::: right
<img src="https://i.pinimg.com/originals/70/36/7d/70367d787e4806129c62e759b8ad2aee.jpg" alt="Hip Kitten">
:::</p>
<p>I'm baby polaroid kale chips tattooed viral iceland lomo authentic next level, coloring book fanny pack four dollar toast. Venmo pop-up four dollar toast snackwave bespoke squid, echo park cardigan austin. Chia hot chicken skateboard tousled, kitsch af vegan food truck snackwave cred craft beer farm-to-table hoodie. Raclette tilde bitters keffiyeh woke, sustainable poutine asymmetrical af slow-carb. Twee tilde fingerstache pug direct trade cold-pressed, forage readymade cray you probably haven't heard of them raw denim.</p>
<p>Cornhole microdosing gochujang lo-fi. Air plant selfies kickstarter seitan, austin listicle pinterest narwhal ramps pop-up kale chips yr next level chambray butcher. Pabst man bun ennui +1. Man bun adaptogen echo park thundercats, la croix gluten-free portland woke mixtape iPhone salvia. Farm-to-table health goth godard, vegan raw denim gastropub pinterest post-ironic vaporware blue bottle readymade PBR&amp;B authentic.</p>
<h2 id="cardish" tabindex="-1"><a class="header-anchor" href="#cardish" aria-hidden="true">#</a> Cardish</h2>
<p>This is useful if you just want a very subtle card-ish type vibe.</p>
<h4 id="usage-5" tabindex="-1"><a class="header-anchor" href="#usage-5" aria-hidden="true">#</a> Usage</h4>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>::: card TITLE HERE
CONTENT HERE
:::
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="example-5" tabindex="-1"><a class="header-anchor" href="#example-5" aria-hidden="true">#</a> Example</h4>
<h4 id="input-5" tabindex="-1"><a class="header-anchor" href="#input-5" aria-hidden="true">#</a> Input</h4>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>::: card WAIT... ANOTHER WHAT?
<span class="token url"><span class="token operator">!</span>[<span class="token content">Another happy landing</span>](<span class="token url">https://c.tenor.com/e9yVO9Q1ckEAAAAC/kenobi-star-wars.gif</span>)</span>
:::
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="output-5" tabindex="-1"><a class="header-anchor" href="#output-5" aria-hidden="true">#</a> Output</h4>
<p>::: card WAIT... ANOTHER WHAT?
<img src="https://c.tenor.com/e9yVO9Q1ckEAAAAC/kenobi-star-wars.gif" alt="Another happy landing">
:::</p>
<h2 id="highlight" tabindex="-1"><a class="header-anchor" href="#highlight" aria-hidden="true">#</a> Highlight</h2>
<h4 id="usage-6" tabindex="-1"><a class="header-anchor" href="#usage-6" aria-hidden="true">#</a> Usage</h4>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>::: highlight
CONTENT HERE
:::
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="example-6" tabindex="-1"><a class="header-anchor" href="#example-6" aria-hidden="true">#</a> Example</h4>
<h4 id="input-6" tabindex="-1"><a class="header-anchor" href="#input-6" aria-hidden="true">#</a> Input</h4>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>::: highlight
What if I told you that the Republic was now under the control of a Dark Lord of the Sith?
:::
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="output-6" tabindex="-1"><a class="header-anchor" href="#output-6" aria-hidden="true">#</a> Output</h4>
<p>::: highlight
What if I told you that the Republic was now under the control of a Dark Lord of the Sith?
:::</p>
<h2 id="thumbnail-caption" tabindex="-1"><a class="header-anchor" href="#thumbnail-caption" aria-hidden="true">#</a> Thumbnail/Caption</h2>
<h4 id="usage-7" tabindex="-1"><a class="header-anchor" href="#usage-7" aria-hidden="true">#</a> Usage</h4>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>:::: thumbnail
SOME IMAGE
::: caption
SOME CAPTION
:::
::::
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="example-7" tabindex="-1"><a class="header-anchor" href="#example-7" aria-hidden="true">#</a> Example</h4>
<h4 id="input-7" tabindex="-1"><a class="header-anchor" href="#input-7" aria-hidden="true">#</a> Input</h4>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>:::: thumbnail
<span class="token url"><span class="token operator">!</span>[<span class="token content">kalabox1-dash</span>](<span class="token url">https://thinktandem.io/images/articles/kalabox1.png</span> <span class="token string">"Kalabox V1 Dashboard"</span>)</span>
::: caption
Kalabox Version 1 Dashboard
:::
::::
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="output-7" tabindex="-1"><a class="header-anchor" href="#output-7" aria-hidden="true">#</a> Output</h4>
<p>:::: thumbnail
<img src="https://thinktandem.io/images/articles/kalabox1.png" alt="kalabox1-dash" title="Kalabox V1 Dashboard">
::: caption
Kalabox Version 1 Dashboard
:::
::::</p>
</div></template>


