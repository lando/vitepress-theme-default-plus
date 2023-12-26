// mods
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

import merge from 'lodash/merge';
import Debug from 'debug';

import {defineConfigWithTheme} from 'vitepress';

// utils
import {default as createContainer} from './utils/create-container';
import {default as getContributors} from './utils/get-contributors';
import {default as resolveGitPaths} from './utils/resolve-git-paths';

// parents
import {defineConfig as parentDefineConfig} from '@jcamp/vitepress-blog-theme/config';

// plugins
import {default as allowInternalPlugin} from './vite/allow-internal-plugin';
import {default as linkOverridePlugin} from './markdown/link-override-plugin';
import {default as patchVPMenuColumnsPlugin} from './vite/patch-vp-menu-columns-plugin';
import {tabsMarkdownPlugin} from 'vitepress-plugin-tabs';
import {default as tabsMarkdownOverridePlugin} from './markdown/tabs-override-plugin';

// base config
import {default as baseConfig} from './config/defaults';

export function defineConfig(userConfig = {}) {
  const debug = Debug('@lando/vpltheme'); // eslint-disable-line

  // resolve paths
  const themeDefaultPath = fileURLToPath(new URL('./node_modules/vitepress/dist/client/theme-default', import.meta.url));
  const customVPDFLU = fileURLToPath(new URL('./components/VPLDocFooterLastUpdated.vue', import.meta.url));
  const customVPMG = fileURLToPath(new URL('./components/VPLMenuGroup.vue', import.meta.url));
  const customVPNBMG = fileURLToPath(new URL('./components/VPLNavBarMenuGroup.vue', import.meta.url));
  const customVPTMI = fileURLToPath(new URL('./components/VPLTeamMembersItem.vue', import.meta.url));
  const gitDir = dirname(resolve(fileURLToPath(import.meta.url)));

  // merge config sources
  const config = merge({}, baseConfig, parentDefineConfig(), userConfig);
  const {markdown, themeConfig} = config;
  debug('initial vitepress configuration %O', config);

  // normalize things
  if (typeof themeConfig.internalDomain === 'string') themeConfig.internalDomain = [themeConfig.internalDomain];
  if (typeof themeConfig.internalDomains === 'string') themeConfig.internalDomains = [themeConfig.internalDomains];
  themeConfig.internalDomains = [...themeConfig.internalDomain, ...themeConfig.internalDomains];
  if (themeConfig.contributors === true) themeConfig.contributors = baseConfig.themeConfig.contributors;

  // extract
  const {autometa, containers, ga, hubspot, internalDomains} = themeConfig;
  debug('autometa rolling with %O', autometa);
  debug('containers rolling with %O', containers);
  debug('contributors rolling with %O', themeConfig.contributors);
  debug('internalDomains rolling with %O', internalDomains);
  debug('google analytics rolling with %o', ga);
  debug('hubspot rolling with %o', hubspot);

  // allow our stuff to use default theme stuff
  config.vite.resolve.alias.push({find: '@default-theme', replacement: themeDefaultPath});

  // patch VPMenu to handle columns
  config.vite.plugins.push(patchVPMenuColumnsPlugin);
  debug('patched vitepress/theme VPMenu.vue so VPMenuGroup.vue can handle columns');
  // patch VPLink.vue so it also considers a list of domains as "internal"
  config.vite.plugins.push(allowInternalPlugin(internalDomains));
  debug('patched vitepress/theme VPLink.vue to whitelist %o', internalDomains);

  // swap out VPDocFooterLastUpdated for higer vibes
  config.vite.resolve.alias.push({find: /^.*\/VPDocFooterLastUpdated\.vue$/, replacement: customVPDFLU});
  debug('replaced vitepress/theme VPDocFooterLastUpdated.vue with %o', customVPDFLU);
  // swap out VPMenuGroup for higer vibes
  config.vite.resolve.alias.push({find: /^.*\/VPMenuGroup\.vue$/, replacement: customVPMG});
  debug('replaced vitepress/theme VPMenuGroup.vue with %o', customVPMG);
  // swap out VPNavBarMenuGroup for higer vibes
  config.vite.resolve.alias.push({find: /^.*\/VPNavBarMenuGroup\.vue$/, replacement: customVPNBMG});
  debug('replaced vitepress/theme VPNavBarMenuGroup.vue with %o', customVPNBMG);
  // swap out VPTeamMembersItem for higer vibes
  config.vite.resolve.alias.push({find: /^.*\/VPTeamMembersItem\.vue$/, replacement: customVPTMI});
  debug('replaced vitepress/theme VPTeamMembersItem.vue with %o', customVPTMI);

  // markdown
  markdown.config = md => {
    // add custom markdown containers, including tabs
    for (const [name, opts] of Object.entries(containers)) md.use(...createContainer(name, opts, md));
    // add tabs plugin
    md.use(tabsMarkdownPlugin);
    // override the tabs container so we can inject styling
    md.use(tabsMarkdownOverridePlugin);
    // override the link plugin so it can handle internal domains
    md.use(linkOverridePlugin, {target: '_blank', rel: 'noreferrer', ...markdown.externalLinks}, config.base, internalDomains);
  };

  // debug here so we dont get duplicates
  for (const [name, opts] of Object.entries(containers)) {
    debug('added custom markdown container %o with config %o', name, opts);
  }
  debug('added custom markdown container %o with config %o', 'vitepress-plugin-tabs');
  debug('added custom markdown link_open rule with config %o', internalDomains);

  // add google analytics
  if (ga !== false && ga.id) {
    config.head.push(
      ['script', {async: true, src: `https://www.googletagmanager.com/gtag/js?id=${ga.id}`}],
      ['script', {}, [
        'window.dataLayer = window.dataLayer || [];',
        'function gtag(){dataLayer.push(arguments);}',
        `gtag('js', new Date());`,
        `gtag('config', '${ga.id}');`,
      ].join('\n'),
    ]);
  }

  // add hubspot
  if (hubspot !== false && hubspot.id) {
    config.head.push(
      ['script', {
        async: true,
        defer: true,
        id: 'hs-script-loader',
        src: `//js.hs-scripts.com/${hubspot.id}.js`,
      }],
      ['script', {}, [
        'window.dataLayer = window.dataLayer || [];',
        'window.hubspot = function(){dataLayer.push(arguments);}',
        `hubspot('js', new Date());`,
        `hubspot('config', '${hubspot.id}');`,
      ].join('\n'),
    ]);
  }

  // augment pages with additional data
  config.transformPageData = async (pageData, {siteConfig}) => {
    const {frontmatter, lastUpdated, relativePath} = pageData;
    const {site} = siteConfig;

    // prefer frontmatter if we have it
    const contributors = frontmatter.contributors ?? themeConfig.contributors;
    // ensure frontmatter head is an array
    if (!Array.isArray(frontmatter.head)) frontmatter.head = [];

    // add contributor information
    if (contributors !== false) {
      const gitPaths = resolveGitPaths(relativePath, siteConfig.srcDir.replace(`${gitDir}/`, ''), frontmatter['git-include']);
      try {
        pageData.contributors = await getContributors(gitDir, contributors, {debug, paths: gitPaths});
        // pageData.contributors = await getContributors('/Users/pirog/work/cli', contributors, {debug, paths: []});
        debug('page %o has contributors %o', relativePath, pageData.contributors);
      } catch (error) {
        debug('could not get contributor information, considering this not-fatal but you should investigate and resolve');
        console.error(error);
      }
    }

    // if we have autometa
    if (autometa !== false) {
      const {canonicalUrl, image, twitter, x} = autometa;
      const title = frontmatter.title ?? pageData.title ?? site.title;
      const description = frontmatter.description ?? frontmatter.summary ?? site.description;
      const i = frontmatter.image ?? image ?? site?.logo?.src;
      const xandle = x ?? twitter;

      // generics
      frontmatter.head.push(
        ['meta', {name: 'twitter:card', content: 'summary'}],
        ['meta', {name: 'twitter:title', content: title}],
        ['meta', {name: 'twitter:description', content: description}],
        ['meta', {name: 'twitter:image', content: i}],
        ['meta', {name: 'twitter:image:alt', content: title}],
        ['meta', {property: 'og:type', content: 'article'}],
        ['meta', {property: 'og:title', content: title}],
        ['meta', {property: 'og:description', content: description}],
        ['meta', {property: 'og:site_name', content: site.title}],
        ['meta', {name: 'og:image', content: i}],
        ['meta', {name: 'og:image:alt', content: title}],
        ['meta', {property: 'article:published_time', content: new Date(lastUpdated)}],
        ['meta', {itemprop: 'name', content: title}],
        ['meta', {itemprop: 'description', content: description}],
      );

      // twitter/x
      if (xandle) frontmatter.head.push(['meta', {name: 'twitter:site', content: xandle}]);

      // canonical stuff
      if (canonicalUrl) {
        const pathname = relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, site.cleanUrls ? '' : '.html');
        const url = new URL(resolve(site.base, pathname), canonicalUrl);
        const {href} = url;
        frontmatter.head.unshift(
          ['meta', {name: 'twitter:url', content: href}],
          ['meta', {property: 'og:url', content: href}],
          ['link', {rel: 'canonical', href: href}],
        );
      }
    }
  };

  return defineConfigWithTheme(config);
}
