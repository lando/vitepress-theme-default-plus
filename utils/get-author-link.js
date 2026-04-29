// shared by node/augment-authors.js and components/VPLTeamMembersItem.vue
// priority: link → links[0] → github → mailto (if mailtoFallback) → undefined
export default function getAuthorLink(member, mailtoFallback) {
  if (member.link) return member.link;
  if (Array.isArray(member?.links) && member.links[0]) return member.links[0].link;
  if (member.github) return `https://github.com/${member.github}`;
  if (member.email && mailtoFallback) return `mailto:${member.email}`;
  return undefined;
};
