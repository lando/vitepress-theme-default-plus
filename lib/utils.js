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
  .map(item => {
    // if its a first level link just normalize and return
    if (item.link) return _.assign(item, {target: '_self', link: url.resolve(baseUrl, item.link)});
    // if it has children then recurse and normalize
    if (item.children) {
      item.children = exports.makeFauxInternal(item.children, baseUrl);
      return item;
    }
    // otherwise do nothing i guess
    return item;
  })
  .value();
