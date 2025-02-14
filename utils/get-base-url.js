// @TODO: support other platforms besides netlify?

export default function(landoPlugin) {
  // if VPL_BASE_URL is set then use that
  if (process.env?.VPL_BASE_URL) return process.env?.VPL_BASE_URL;

  // otherwise we can try other stuff if we are on something like netlify
  if (process.env?.NETLIFY && process.env.CONTEXT === 'production' && landoPlugin) return 'https://docs.lando.dev';
  if (process.env?.NETLIFY && process.env.CONTEXT === 'production') return process.env.URL;
  if (process.env?.NETLIFY && process.env.CONTEXT !== 'production') return process.env.DEPLOY_PRIME_URL;

  // if we get here and its a lando plugin we can safely assume https://docs.lando.dev, this is mostly for github actions testing
  if (landoPlugin) return 'https://docs.lando.dev';

  // return nothing
  return undefined;
};
