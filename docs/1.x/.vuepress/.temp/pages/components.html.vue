<template><div><h1 id="components" tabindex="-1"><a class="header-anchor" href="#components" aria-hidden="true">#</a> Components</h1>
<p>This theme adds a few more helpful and globally available components in addition to the ones <a href="https://v2.vuepress.vuejs.org/reference/default-theme/components.html" target="_blank" rel="noopener noreferrer">already provided by the default theme<ExternalLinkIcon/></a>. We have also added a &quot;Guide&quot; component but it is best used <RouterLink to="/making-a-guide.html">this like</RouterLink>.</p>
<p>Anyway, here are the additional globally available components that we've added.</p>
<h2 id="youtube" tabindex="-1"><a class="header-anchor" href="#youtube" aria-hidden="true">#</a> YouTube</h2>
<h4 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage:</h4>
<p>All you should need is the <code v-pre>id</code> of the YouTube video and you'll get a responsive full width embed.</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>YouTube</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>YOUTUBE_VIDEOID<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="example" tabindex="-1"><a class="header-anchor" href="#example" aria-hidden="true">#</a> Example:</h4>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>YouTube</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>tKjZuykKY1I<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><YouTube id="tKjZuykKY1I"/><h2 id="mailchimp" tabindex="-1"><a class="header-anchor" href="#mailchimp" aria-hidden="true">#</a> MailChimp</h2>
<h4 id="usage-1" tabindex="-1"><a class="header-anchor" href="#usage-1" aria-hidden="true">#</a> Usage:</h4>
<p>You'll need to get the form action URL for the MailChimp audience you want the user to subscribe to. If you are not sure what that is all about then <a href="https://mailchimp.com/help/determine-webpage-signup-location/" target="_blank" rel="noopener noreferrer">check this out<ExternalLinkIcon/></a>.</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>MailChimp</span>
  <span class="token attr-name">action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>MAILCHIMP_FORM_ACTION_URL<span class="token punctuation">"</span></span>
  <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Subscribe to the newsletter!<span class="token punctuation">"</span></span>
  <span class="token attr-name">byline</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token punctuation">"</span></span>
  <span class="token attr-name">button</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Subscribe<span class="token punctuation">"</span></span>
<span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="example-1" tabindex="-1"><a class="header-anchor" href="#example-1" aria-hidden="true">#</a> Example:</h4>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>MailChimp</span>
  <span class="token attr-name">action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://dev.us12.list-manage.com/subscribe/post?u=59874b4d6910fa65e724a4648<span class="token entity named-entity" title="&amp;">&amp;amp;</span>id=613837077f<span class="token punctuation">"</span></span>
  <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Lando Newsletter<span class="token punctuation">"</span></span>
  <span class="token attr-name">byline</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Join our revolution to free developers from the mind forged manacled of lesser dev tools<span class="token punctuation">"</span></span>
  <span class="token attr-name">button</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>I'm your huckleberry!<span class="token punctuation">"</span></span>
<span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><MailChimp
  action="https://dev.us12.list-manage.com/subscribe/post?u=59874b4d6910fa65e724a4648&amp;id=613837077f"
  title="Lando Newsletter"
  byline="Join our revolution to free developers from the mind forged manacled of lesser dev tools"
  button="I'm your huckleberry!"
/>
<h2 id="sponsors" tabindex="-1"><a class="header-anchor" href="#sponsors" aria-hidden="true">#</a> Sponsors</h2>
<h4 id="usage-2" tabindex="-1"><a class="header-anchor" href="#usage-2" aria-hidden="true">#</a> Usage:</h4>
<p>You'll need to set sponsors over <RouterLink to="/config.html#sponsors">here</RouterLink> for this to work.</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Sponsors</span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="example-2" tabindex="-1"><a class="header-anchor" href="#example-2" aria-hidden="true">#</a> Example:</h4>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Sponsors</span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><Sponsors /><h2 id="jobs" tabindex="-1"><a class="header-anchor" href="#jobs" aria-hidden="true">#</a> Jobs</h2>
<h4 id="usage-3" tabindex="-1"><a class="header-anchor" href="#usage-3" aria-hidden="true">#</a> Usage:</h4>
<p>You'll need to set jobs over <RouterLink to="/config.html#jobs">here</RouterLink> for this to work.</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Jobs</span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="example-3" tabindex="-1"><a class="header-anchor" href="#example-3" aria-hidden="true">#</a> Example:</h4>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Jobs</span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><Jobs /></div></template>


