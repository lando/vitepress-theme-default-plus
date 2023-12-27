import Debug from 'debug';

export default function(domains = [], {debug = Debug('@lando/vite-plugin')}) {  // eslint-disable-line
  return {
    name: 'allow-internal',
    enforce: 'pre',
    transform: (code, id) => {
      const linkfile = 'VPLink.vue';
      if (id.endsWith(linkfile)) {
        const replacee = 'EXTERNAL_URL_RE.test(props.href)';
        const domainlist = domains.map(domain => `!props.href.startsWith('${domain}')`).join(' && ');
        const okdomain = domains.length > 0 ? ` && ${domainlist}` : '';
        debug('patched %o to treat %o as internal links', linkfile, domains);
        return code.replace(replacee, `(${replacee}${okdomain})`);
      }
    },
  };
};
