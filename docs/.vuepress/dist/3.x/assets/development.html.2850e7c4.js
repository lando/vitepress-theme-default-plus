import{_ as r,r as c,o as d,c as i,a as e,b as n,d as s,w as a}from"./app.34cd1582.js";const u={},p=e("h1",{id:"development",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#development","aria-hidden":"true"},"#"),n(" Development")],-1),h=e("h2",{id:"requirements",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#requirements","aria-hidden":"true"},"#"),n(" Requirements")],-1),m={href:"https://lando.dev/",target:"_blank",rel:"noopener noreferrer"},_=e("strong",null,"OR",-1),g={href:"https://nodejs.org/en/download/",target:"_blank",rel:"noopener noreferrer"},f={href:"https://classic.yarnpkg.com/lang/en/docs/install",target:"_blank",rel:"noopener noreferrer"},b=e("div",{class:"custom-container tip"},[e("p",{class:"custom-container-title"},"Yarn is optional"),e("p",null,[e("code",null,"yarn"),n(" is technically optional but is preferred and is assumed in the docs below. That said you can probably use "),e("code",null,"npm"),n(" as a drop in replacement for "),e("code",null,"yarn"),n(" below and end up in the same place.")])],-1),k=e("div",{class:"language-bash","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token comment"},"# clone repo"),n(`
`),e("span",{class:"token function"},"git"),n(" clone https://github.com/lando/vuepress-theme-default-plus.git "),e("span",{class:"token operator"},"&&"),n(`
  `),e("span",{class:"token punctuation"},"\\"),n(),e("span",{class:"token builtin class-name"},"cd"),n(` vuepress-theme-default-plus

`),e("span",{class:"token comment"},"# start up app"),n(`
lando start

`),e("span",{class:"token comment"},"# launch dev server"),n(`
lando dev
`)])])],-1),v=e("div",{class:"language-bash","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token comment"},"# clone repo"),n(`
`),e("span",{class:"token function"},"git"),n(" clone https://github.com/lando/vuepress-theme-default-plus.git "),e("span",{class:"token operator"},"&&"),n(`
  `),e("span",{class:"token punctuation"},"\\"),n(),e("span",{class:"token builtin class-name"},"cd"),n(` vuepress-theme-default-plus

`),e("span",{class:"token comment"},"# install deps"),n(`
`),e("span",{class:"token function"},"yarn"),n(`

`),e("span",{class:"token comment"},"# launch dev server"),n(`
`),e("span",{class:"token function"},"yarn"),n(` dev

`),e("span",{class:"token comment"},"# launch dev server in debug mode"),n(`
`),e("span",{class:"token assign-left variable"},"DEBUG"),e("span",{class:"token operator"},"="),e("span",{class:"token string"},'"@lando/*"'),n(),e("span",{class:"token function"},"yarn"),n(` dev
`)])])],-1),y=e("h2",{id:"testing",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#testing","aria-hidden":"true"},"#"),n(" Testing")],-1),x=e("div",{class:"language-bash","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token comment"},"# lint the code"),n(`
lando `),e("span",{class:"token function"},"yarn"),n(),e("span",{class:"token builtin class-name"},"test"),n(`
`)])])],-1),N=e("div",{class:"language-bash","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token comment"},"# lint the code"),n(`
`),e("span",{class:"token function"},"yarn"),n(),e("span",{class:"token builtin class-name"},"test"),n(`
`)])])],-1),A=e("h2",{id:"releasing",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#releasing","aria-hidden":"true"},"#"),n(" Releasing")],-1),w=e("p",null,"Here are some helpful commands to actually deploy a release.",-1),C=e("div",{class:"language-bash","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token comment"},"# build the site"),n(`
lando `),e("span",{class:"token function"},"yarn"),n(` build

`),e("span",{class:"token comment"},"# bump and tag the version the site"),n(`
lando `),e("span",{class:"token function"},"yarn"),n(` release
`)])])],-1),G=e("div",{class:"language-bash","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token comment"},"# build the site"),n(`
`),e("span",{class:"token function"},"yarn"),n(` build

`),e("span",{class:"token comment"},"# bump and tag the version the site"),n(`
`),e("span",{class:"token function"},"yarn"),n(` release
`)])])],-1),L=e("code",null,"npm",-1),R={href:"https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository",target:"_blank",rel:"noopener noreferrer"},D=e("code",null,"@edge",-1);function Y(B,E){const o=c("ExternalLinkIcon"),t=c("CodeGroupItem"),l=c("CodeGroup");return d(),i("div",null,[p,h,e("p",null,[n("("),e("a",m,[n("Lando"),s(o)]),n(") "),_,n(" ("),e("a",g,[n("Node 14+"),s(o)]),n(" and "),e("a",f,[n("Yarn"),s(o)]),n(")")]),b,s(l,null,{default:a(()=>[s(t,{title:"LANDO"},{default:a(()=>[k]),_:1}),s(t,{title:"YARN"},{default:a(()=>[v]),_:1})]),_:1}),y,s(l,null,{default:a(()=>[s(t,{title:"LANDO"},{default:a(()=>[x]),_:1}),s(t,{title:"YARN"},{default:a(()=>[N]),_:1})]),_:1}),A,w,s(l,null,{default:a(()=>[s(t,{title:"LANDO"},{default:a(()=>[C]),_:1}),s(t,{title:"YARN"},{default:a(()=>[G]),_:1})]),_:1}),e("p",null,[n("An actual release to "),L,n(" can be done by "),e("a",R,[n("create a release on GitHub"),s(o)]),n(". Pre-releases will deploy to "),D,n(" tag.")])])}const O=r(u,[["render",Y],["__file","development.html.vue"]]);export{O as default};
