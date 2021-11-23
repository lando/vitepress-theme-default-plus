'use strict';
const _ = require('lodash');
const {path} = require('@vuepress/utils');
const url = require('url');

exports.getTopLevelPages = items => _(items)
  .map(item => (_.isString(item)) ? item : item.link)
  .compact()
  .map(item => path.basename(item, '.md'))
  .map(item => path.basename(item, '.html'))
  .value();

exports.makeFauxInternal = (items, baseUrl) => _(items)
.map(item => _.assign(item, {target: '_self', link: url.resolve(baseUrl, item.link)}))
.value();
