export default function({
  base = '/v/',
  build = 'stable',
  cache = true,
  match = 'v[0-9].*',
  mvbase = undefined,
  satisfies = '*',
  siteBase = '/',
} = {}) {
  // if no mvbase then combine it with sitebase as usual, this is probabyl base reality
  if (!mvbase) mvbase = `/${siteBase}/${base}/`.replace(/\/{2,}/g, '/');

  // if we are in a MVB then the OG base can get lost so rebase on that
  if (process.env.VPL_MVB_BUILD) mvbase = `/${process.env.VPL_MVB_BASE}/${base}/`.replace(/\/{2,}/g, '/');
  if (process.env.LANDO_MVB_BUILD) mvbase = `/${process.env.LANDO_MVB_BASE}/${base}/`.replace(/\/{2,}/g, '/');

  // return
  return {base, build, cache, match, mvbase, satisfies};
};
