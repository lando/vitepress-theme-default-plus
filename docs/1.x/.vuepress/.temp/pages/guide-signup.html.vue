<template><div><p>While you can leverage the global <RouterLink to="/components.html#mailchimp">MailChimp</RouterLink> component to add a newsletter signup to any page we've added a way to invoke it through <code v-pre>frontmatter</code> for convenience.</p>
<p><strong>Note that this <em>only</em> works for Guide content.</strong></p>
<p>Here is how we do it for this page:</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token front-matter yaml language-yaml"><span class="token key atrule">title</span><span class="token punctuation">:</span> Adding a guide signup
<span class="token key atrule">description</span><span class="token punctuation">:</span> Learn how to easily add a guide newsletter signup.
<span class="token key atrule">guide</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">mailchimp</span><span class="token punctuation">:</span>
  <span class="token comment"># action is required</span>
  <span class="token key atrule">action</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//dev.us12.list<span class="token punctuation">-</span>manage.com/subscribe/post<span class="token punctuation">?</span>u=59874b4d6910fa65e724a4648<span class="token important">&amp;amp;id=613837077f</span>
  <span class="token comment"># everything else is optional</span>
  <span class="token key atrule">title</span><span class="token punctuation">:</span> Want similar content<span class="token punctuation">?</span>
  <span class="token key atrule">byline</span><span class="token punctuation">:</span> Signup and we will send you a weekly blog digest of similar content to keep you satiated.
  <span class="token key atrule">button</span><span class="token punctuation">:</span> Sign me up<span class="token tag">!</span></span>
<span class="token punctuation">---</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


