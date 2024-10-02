export default function({
  absoluteBase = undefined,
  base = '/v/',
  cache = true,
  match = 'v[0-9].*',
  satisfies = '*',
  siteBase = '/',
} = {}) {
  // if no absolute abse then combine it with sitebase
  if (!absoluteBase) absoluteBase = `/${siteBase}/${base}/`.replace(/\/{2,}/g, '/');

  // if we are in a MVB then the OG base can get lost so rebase on that
  if (process.env.LANDO_MVB_BUILD) absoluteBase = `/${process.env.LANDO_MVB_BASE}/${base}/`.replace(/\/{2,}/g, '/');

  // return
  return {absoluteBase, base, cache, match, satisfies};
};

