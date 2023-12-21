
export default function(domains = []) {
  return {
    name: 'allow-internal',
    enforce: 'pre',
    transform: (code, id) => {
      if (id.endsWith('VPLink.vue')) {
        const replacee = 'EXTERNAL_URL_RE.test(props.href)';
        const domainlist = domains.map(domain => `!props.href.startsWith('${domain}')`).join(' && ');
        const okdomain = domains.length > 0 ? ` && ${domainlist}` : '';
        return code.replace(replacee, `(${replacee}${okdomain})`);
      }
    },
  };
};
