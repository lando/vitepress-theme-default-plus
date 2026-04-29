import Debug from 'debug';

import {default as getAuthorLink} from '../utils/get-author-link.js';

const getContributor = (id, contributors = []) => contributors.find(contributor => contributor.email === id)
  ?? contributors.find(contributor => contributor.name === id);

export default async function(pageData, {
  team,
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
      .map(author => ({...author, link: getAuthorLink(author, mailtoFallback)}));
  }

  // log
  debug('augmented author information to %o', {authors: frontmatter.authors});
};
