import {useData} from 'vitepress';

const EXTERNAL_URL_RE = /^(?:[a-z]+:|\/\/)/i;
const KNOWN_EXTENSIONS = new Set();

const isExternal = path => EXTERNAL_URL_RE.test(path);

const joinPath = (base, path) => `${base}${path}`.replace(/\/+/g, '/');

const treatAsHtml = filename => {
  if (KNOWN_EXTENSIONS.size === 0) {
    const extraExts =
      (typeof process === 'object' && process.env?.VITE_EXTRA_EXTENSIONS) ||
      (import.meta).env?.VITE_EXTRA_EXTENSIONS ||
      '';

    // md, html? are intentionally omitted
    ;(
      '3g2,3gp,aac,ai,apng,au,avif,bin,bmp,cer,class,conf,crl,css,csv,dll,' +
      'doc,eps,epub,exe,gif,gz,ics,ief,jar,jpe,jpeg,jpg,js,json,jsonld,m4a,' +
      'man,mid,midi,mjs,mov,mp2,mp3,mp4,mpe,mpeg,mpg,mpp,oga,ogg,ogv,ogx,' +
      'opus,otf,p10,p7c,p7m,p7s,pdf,png,ps,qt,roff,rtf,rtx,ser,svg,t,tif,' +
      'tiff,tr,ts,tsv,ttf,txt,vtt,wav,weba,webm,webp,woff,woff2,xhtml,xml,' +
      'yaml,yml,zip' +
      (extraExts && typeof extraExts === 'string' ? ',' + extraExts : '')
    ).split(',').forEach(ext => KNOWN_EXTENSIONS.add(ext));
  }

  const ext = filename.split('.').pop();
  return ext == null || !KNOWN_EXTENSIONS.has(ext.toLowerCase());
};

export default function normalize2Base(url, base = '/') {
  const {pathname, search, hash, protocol} = new URL(url, 'http://lando.dev');

  // return external urls
  if (isExternal(url) || url.startsWith('#') || !protocol.startsWith('http') || !treatAsHtml(pathname)) return url;

  // otherwise do the usual normalization
  const {site} = useData();

  const path =
    pathname.endsWith('/') || pathname.endsWith('.html')
      ? url
      : url.replace(
          /(?:(^\.+)\/)?.*$/,
          `$1${pathname.replace(
            /(\.md)?$/,
            site.value.cleanUrls ? '' : '.html',
          )}${search}${hash}`,
        );

  return EXTERNAL_URL_RE.test(path) || !path.startsWith('/') ? path : joinPath(base, path);
};
