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
    editLink: false,
    edgeVersion,
    lastUpdated: false,
    title,
    versionsData: data,
  },
});

