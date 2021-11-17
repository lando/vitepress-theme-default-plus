'use strict';
const _ = require('lodash');

exports.contributors = ({contributorsContent, contributorsData, contributorsPage, contributorsText}) => ({
  path: contributorsPage,
  content: contributorsContent,
  frontmatter: {
    contributors: false,
    contributorsData: _(contributorsData)
      .filter(contributor => contributor.login !== 'dependabot[bot]')
      .value(),
    editLink: false,
    lastUpdated: false,
    title: contributorsText,
    layout: 'Layout',
  },
});
