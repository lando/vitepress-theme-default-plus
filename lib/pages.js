'use strict';
const _ = require('lodash');

exports.contributors = ({content, data, link, title}) => ({
  path: link,
  content,
  frontmatter: {
    contributors: false,
    contributorsData: _(data)
      .filter(contributor => contributor.name !== 'dependabot[bot]')
      .value(),
    description: 'Check out all the awesome people who contributed to this project!',
    editLink: false,
    lastUpdated: false,
    title,
  },
});

exports.versions = ({content, data, edgeVersion, link, title}) => ({
  path: link,
  content,
  frontmatter: {
    contributors: false,
    description: 'Check out previous versions of this documentation.',
    editLink: false,
    edgeVersion,
    lastUpdated: false,
    title,
    versionsData: data,
  },
});

