import Debug from 'debug';
import getContributorLink from '../utils/get-contributor-link.js';

const getContributor = (id, contributors = []) => contributors.find(contributor => contributor.email === id)
  ?? contributors.find(contributor => contributor.name === id);

export default async function(pageData, {
  team,
  // when false (the default with github resolution enabled), unresolved
  // authors get no link at all rather than exposing a mailto: in the
  // rendered byline. caller resolves themeConfig.contributors.mailtoFallback
  // to a boolean once and passes it through.
  mailtoFallback = false,
  debug = Debug('@lando/augment-authors'),  // eslint-disable-line
} = {}) {
  debug = debug.extend(`${pageData.relativePath}`);
  const {frontmatter} = pageData;

  // normalize and augment author info
  if (Array.isArray(frontmatter.authors)) {
    frontmatter.authors = frontmatter.authors
      .map(author => typeof author === 'string' ? getContributor(author, team) : author)
      .filter(author => author && author !== false && author !== null)
      .map(author => ({...author, link: getContributorLink(author, mailtoFallback)}));
  }

  // log
  debug('augmented author information to %o', {authors: frontmatter.authors});
};
