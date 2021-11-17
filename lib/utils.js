'use strict';
const _ = require('lodash');
const {isLinkHttp} = require('@vuepress/shared');
const {path} = require('@vuepress/utils');
const url = require('url');

exports.canGenerateContribPage = ({contributorPage, sourceRepo}) => {
  // If we dont have a repo then its not going to work
  if (!sourceRepo) return false;
  // Only works for internal paths
  if (isLinkHttp(contributorPage)) return false;
  // Only works for GitHub repos for now
  if (!isLinkHttp(sourceRepo) || /github\.com/.test(sourceRepo)) return true;
  // Or false
  return false;
};

exports.getTopLevelPages = items => _(items)
  .map(item => (_.isString(item)) ? item : item.link)
  .compact()
  .map(item => path.basename(item, '.md'))
  .map(item => path.basename(item, '.html'))
  .value();

exports.makeFauxInternal = (items, baseUrl) => _(items)
.map(item => _.assign(item, {target: '_self', link: url.resolve(baseUrl, item.link)}))
.value();
