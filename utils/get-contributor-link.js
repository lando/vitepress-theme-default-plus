/**
 * Resolves the primary link URL for a contributor/team member.
 * Priority order:
 * 1. Explicit `link` property
 * 2. First entry in `links` array
 * 3. GitHub profile URL from `github` field
 * 4. mailto: fallback if enabled
 * 5. undefined
 *
 * @param {Object} contributor - The contributor/member object
 * @param {boolean} mailtoFallback - Whether to fallback to mailto: links
 * @return {string|undefined} The resolved link URL
 */
export default function getContributorLink(contributor, mailtoFallback = false) {
  if (contributor.link) return contributor.link;
  else if (Array.isArray(contributor?.links) && contributor.links[0]) return contributor.links[0].link;
  else if (contributor.github) return `https://github.com/${contributor.github}`;
  else if (contributor.email && mailtoFallback) return `mailto:${contributor.email}`;
  return undefined;
}
