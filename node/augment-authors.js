import Debug from 'debug';

const getContributor = (id, contributors = []) => contributors.find(contributor => contributor.email === id)
  ?? contributors.find(contributor => contributor.name === id);

const getLink = author => {
  if (author.link) return author.link;
  else if (Array.isArray(author?.links) && author.links[0]) return author.links[0].link;
  else if (author.email) return `mailto:${author.email}`;
};

export default async function(pageData, {
  team,
  debug = Debug('@lando/augment-authors'),  // eslint-disable-line
} = {}) {
  debug = debug.extend(`${pageData.relativePath}`);
  const {frontmatter} = pageData;

  // normalize and augment author info
  if (Array.isArray(frontmatter.authors)) {
    frontmatter.authors = frontmatter.authors
      .map(author => typeof author === 'string' ? getContributor(author, team) : author)
      .filter(author => author && author !== false && author !== null)
      .map(author => ({...author, link: getLink(author)}));
  }

  // log
  debug('augmented author information to %o', {authors: frontmatter.authors});
};
