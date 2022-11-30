
import {isLinkExternal} from '@vuepress/shared';
import url from 'url';

export const customLinksPlugin = (md, options = {}) => {
  const resolvePaths = (rawPath, base, filePathRelative) => {
    let absolutePath;
    let relativePath;
    if (rawPath.startsWith('/')) {
      if (rawPath.endsWith('.md')) {
        absolutePath = path4.join(base, rawPath);
        relativePath = removeLeadingSlash(rawPath);
      } else {
        absolutePath = rawPath;
        relativePath = path4.relative(base, absolutePath);
      }
    } else {
      if (filePathRelative) {
        relativePath = path4.join(
          path4.dirname(encodeURI(filePathRelative)),
          rawPath,
        );
        absolutePath = path4.join(base, relativePath);
      } else {
        relativePath = rawPath.replace(/^(?:\.\/)?(.*)$/, '$1');
        absolutePath = relativePath;
      }
    }
    return {
      absolutePath,
      relativePath,
    };
  };

  // tag of internal links
  const internalTag = options.internalTag || 'RouterLink';
  let hasOpenInternalLink = false;
  let hasOpenExternalLink = false;

  const handleLinkOpen = (tokens, idx, env) => {
    // Set some defaults
    let _a;
    let externalAttrs = {
      target: '_blank',
      rel: 'noopener noreferrer',
      ...options.externalAttrs,
    };
    let externalIcon = (_a = options.externalIcon) !== null && _a !== void 0 ? _a : true;

    // get current token
    const token = tokens[idx];
    // get `href` attr index
    const hrefIndex = token.attrIndex('href');
    // if `href` attr does not exist, skip
    /* istanbul ignore if */
    if (hrefIndex < 0) {
      return;
    }
    // if `href` attr exists, `token.attrs` is not `null`
    const hrefAttr = token.attrs[hrefIndex];
    const hrefLink = hrefAttr[1];

    // Modify externally things if baseurl is set
    if (options.baseUrl) {
      const hostname = url.parse(options.baseUrl).hostname;
      const parsedLink = url.parse(hrefLink);
      if (hostname === parsedLink.hostname ) {
        externalAttrs.target = '_self';
        externalAttrs.rel = '';
        externalIcon = false;
      }
    }

    // get `base` and `filePathRelative` from `env`
    const {base = '/', filePathRelative = null, frontmatter = {}} = env;
    // check if a link is an external link
    if ((0, isLinkExternal)(hrefLink, base)) {
      // set `externalAttrs` to current token
      Object.entries(externalAttrs).forEach(([key, val]) => token.attrSet(key, val));
      // check if we should render external icon
      if (
      // frontmatter should override plugin option
      ((_a = frontmatter.externalIcon) !== null && _a !== void 0 ? _a : externalIcon) &&
        // only when an external link has `target="_blank"`
        // should we render external icon
        externalAttrs.target === '_blank') {
        hasOpenExternalLink = true;
      }
      return;
    }
    // check if a link is an internal link
    const internalLinkMatch = hrefLink.match(/^((?:.*)(?:\/|\.md|\.html))(#.*)?$/);
    if (internalLinkMatch) {
      // convert
      // <a href="hrefLink">
      // to
      // <RouterLink to="toProp">
      // notice that the path and hash are encoded by markdown-it
      const rawPath = internalLinkMatch[1];
      const rawHash = internalLinkMatch[2] || '';
      // resolve relative and absolute path
      const {relativePath, absolutePath} = (0, resolvePaths.resolvePaths)(rawPath, base, filePathRelative);
      // normalize markdown file path to route path
      //
      // we are removing the `base` from absolute path because it should not be
      // passed to `<RouterLink>`
      //
      // '/foo/index.md' => '/foo/'
      // '/foo/bar.md' => '/foo/bar.html'
      const normalizedPath = absolutePath
        .replace(new RegExp(`^${base}`), '/')
        .replace(/(^|\/)(README|index).md$/i, '$1')
        .replace(/\.md$/, '.html');
      if (internalTag === 'RouterLink') {
        // convert starting tag of internal link to `<RouterLink>`
        token.tag = internalTag;
        // replace the original `href` attr with `to` attr
        hrefAttr[0] = 'to';
        // set `hasOpenInternalLink` to modify the ending tag
        hasOpenInternalLink = true;
      }
      hrefAttr[1] = `${normalizedPath}${rawHash}`;
      // extract internal links for file / page existence check
      const links = env.links || (env.links = []);
      links.push({
        raw: hrefLink,
        relative: relativePath,
        absolute: absolutePath,
      });
    }
  };
  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    handleLinkOpen(tokens, idx, env);
    return self.renderToken(tokens, idx, options);
  };
  md.renderer.rules.link_close = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    // add external icon before ending tag of external link
    if (hasOpenExternalLink) {
      hasOpenExternalLink = false;
      return '<ExternalLinkIcon/>' + self.renderToken(tokens, idx, options);
    }
    // convert ending tag of internal link
    if (hasOpenInternalLink) {
      hasOpenInternalLink = false;
      token.tag = internalTag;
    }
    return self.renderToken(tokens, idx, options);
  };
};
