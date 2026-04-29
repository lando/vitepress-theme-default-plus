// Resolve a contributor's primary link with the same priority everywhere
// the theme renders bylines/avatars:
//   - blog-post bylines (server-side, via `node/augment-authors.js`)
//   - team cards        (client-side, via `components/VPLTeamMembersItem.vue`)
//
// Priority:
//   1. an explicit `link` field (configured override)
//   2. the first entry in a `links` array (first configured social link)
//   3. a `github` username       → https://github.com/<github>
//   4. `email` + mailtoFallback  → mailto:<email>
//   5. otherwise undefined (renders as a non-link <span> in VPLLink)
//
// Pure function: works in both Node (build-time) and browser (SFC) contexts,
// so both render paths stay in sync when the rules change.
export default function getAuthorLink(member, mailtoFallback) {
  if (member.link) return member.link;
  if (Array.isArray(member?.links) && member.links[0]) return member.links[0].link;
  if (member.github) return `https://github.com/${member.github}`;
  if (member.email && mailtoFallback) return `mailto:${member.email}`;
  return undefined;
};
