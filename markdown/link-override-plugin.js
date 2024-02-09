import Debug from 'debug';
import {URL} from 'url';

const indexRE = /(^|.*\/)index.md(#?.*)$/i;
const EXTERNAL_URL_RE = /^(?:[a-z]+:|\/\/)/i;

function isFauxInternal(path, domains = []) {
  return domains.find(domain => path.startsWith(domain)) !== undefined;
}

function isExternal(path) {
  return EXTERNAL_URL_RE.test(path);
}

function normalizeHref(hrefAttr, env) {
  let url = hrefAttr[1];

  const indexMatch = url.match(indexRE);
  if (indexMatch) {
    const [, path, hash] = indexMatch;
    url = path + hash;
  } else {
    let cleanUrl = url.replace(/[?#].*$/, '');
    // transform foo.md -> foo[.html]
    if (cleanUrl.endsWith('.md')) {
      cleanUrl = cleanUrl.replace(/\.md$/, env.cleanUrls ? '' : '.html');
    }
    // transform ./foo -> ./foo[.html]
    if (
      !env.cleanUrls &&
      !cleanUrl.endsWith('.html') &&
      !cleanUrl.endsWith('/')
    ) {
      cleanUrl += '.html';
    }
    const parsed = new URL(url, 'http://a.com');
    url = cleanUrl + parsed.search + parsed.hash;
  }

  // ensure leading . for relative paths
  if (!url.startsWith('/') && !/^\.\//.test(url)) {
    url = './' + url;
  }

  // export it for existence check
  pushLink(url.replace(/\.html$/, ''), env);

  // markdown-it encodes the uri
  hrefAttr[1] = decodeURI(url);
}

function pushLink(link, env) {
  const links = env.links || (env.links = []);
  links.push(link);
}

export default function(md, externalAttrs, base, domains, debug = Debug('@lando/markdown-plugin')) { // eslint-disable-line
  md.renderer.rules.link_open = (
    tokens,
    idx,
    options,
    env,
    self,
  ) => {
    const token = tokens[idx];
    const hrefIndex = token.attrIndex('href');
    if (hrefIndex >= 0) {
      const hrefAttr = token.attrs[hrefIndex];
      const url = hrefAttr[1];
      if (isExternal(url)) {
        // set external attributes unless faux internal
        if (!isFauxInternal(url, domains)) {
          Object.entries(externalAttrs).forEach(([key, val]) => {
            token.attrSet(key, val);
          });
        // we need to for _self for fauxinternals
        } else {
          token.attrSet('target', '_self');
        }

        // catch localhost links as dead link
        if (url.replace(EXTERNAL_URL_RE, '').startsWith('//localhost:')) {
          pushLink(url, env);
        }
        hrefAttr[1] = url;
      } else {
        if (
          // internal anchor links
          !url.startsWith('#') &&
          // mail/custom protocol links
          new URL(url, 'http://a.com').protocol.startsWith('http') &&
          // links to files (other than html/md)
          !/\.(?!html|md)\w+($|\?)/i.test(url)
        ) {
          normalizeHref(hrefAttr, env);
        } else if (url.startsWith('#')) {
          hrefAttr[1] = decodeURI(hrefAttr[1]);
        }

        // append base to internal (non-relative) urls
        if (hrefAttr[1].startsWith('/')) {
          hrefAttr[1] = `${base}${hrefAttr[1]}`.replace(/\/+/g, '/');
        }
      }

      // encode vite-specific replace strings in case they appear in URLs
      // this also excludes them from build-time replacements (which injects
      // <wbr/> and will break URLs)
      hrefAttr[1] = hrefAttr[1]
        .replace(/\bimport\.meta/g, 'import%2Emeta')
        .replace(/\bprocess\.env/g, 'process%2Eenv');
    }
    return self.renderToken(tokens, idx, options);
  };
  debug('added custom markdown %o rule with config %o', 'link_open', {base, domains});
};
