<template><div><p>Guides are <em>how tos</em> or <em>tutorials</em> that fit somewhere in between technical documentation and blog posts. They generally
seek to answer a single question such as &quot;How do I create a guide using this theme?&quot; and are heavy on code snippets. In this case there are actually two ways to create a guide:</p>
<ul>
<li>Autopopulating data from GitHub</li>
<li><RouterLink to="/1.x/making-a-guide-2.html">Manually entering data</RouterLink></li>
</ul>
<h2 id="autopopulating-data-from-github" tabindex="-1"><a class="header-anchor" href="#autopopulating-data-from-github" aria-hidden="true">#</a> Autopopulating data from GitHub</h2>
<p>To automatically grab relevant authorship and data information make sure you set <code v-pre>repo</code> to a publically accessible GitHub repo and also set <code v-pre>autoPopulate</code> to <code v-pre>true</code> in the <RouterLink to="/1.x/config.html">theme config</RouterLink>.</p>
<p>Once you have done that then you can make a guide by adding the following frontmatter to your markdown file.</p>
<div class="custom-container warning"><p class="custom-container-title">You must set the title!</p>
<p>Note that because of how the underlying components are layered and called you must set the title in the frontmatter. This will populate the <code v-pre>h1</code> on the page. You can and should then omit the <code v-pre>h1</code> in the markdown content itself.</p>
</div>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token front-matter yaml language-yaml"><span class="token key atrule">title</span><span class="token punctuation">:</span> Making A Guide 1
<span class="token key atrule">guide</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="token punctuation">---</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You can check out the full markdown file that generated this page <a href="https://github.com/lando/vuepress-theme-default-plus/blob/main/docs/making-a-guide.html" target="_blank" rel="noopener noreferrer">here<ExternalLinkIcon/></a>. If you are interested in manually setting the <code v-pre>authors</code>, <code v-pre>date</code> and edit link then check out <RouterLink to="/1.x/making-a-guide-2.html">Making a Guide 2</RouterLink></p>
</div></template>


