// @TODO: support other platforms besides netlify?

export default function(landoPlugin) {
  // if VPL_BASE_URL is set then use that
  if (process.env?.VPL_BASE_URL) return process.env?.VPL_BASE_URL;

  // if lando plugin and netlify prod then set to docs.lando.dev
  if (landoPlugin && process.env?.NETLIFY && process.env.CONTEXT === 'production') return 'docs.lando.dev';

  // otherwise we can try other stuff if we are on something like netlify
  if (process.env?.NETLIFY && process.env.CONTEXT === 'production') return process.env.URL;
  if (process.env?.NETLIFY && process.env.CONTEXT !== 'production') return process.env.DEPLOY_PRIME_URL;

  // return nothing
  return undefined;
};
