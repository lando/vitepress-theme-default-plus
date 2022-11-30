import _ from 'lodash';
import Debug from 'debug';
import url from 'url';

export const makeFauxInternal = (items, baseUrl) => _(items).map(item => {
  const debug = Debug('@lando/plugin-faux-internal'); // eslint-disable-line
  // if its a first level link just normalize and return
  if (item.link) {
    try {
      const pieces = new URL(item.link);
      if (pieces.origin === baseUrl || pieces.host === baseUrl || pieces.hostname === baseUrl) {
        return _.assign(item, {target: '_self', link: url.resolve(baseUrl, item.link)});
      } else {
        return item;
      }
    } catch (error) {
      debug('could not parse %s with error %k, honestly this is probably ok', item.link, error);
      return item;
    }
  }

  // if it has children then recurse and normalize
  if (item.children) {
    item.children = exports.makeFauxInternal(item.children, baseUrl);
    return item;
  }

  // otherwise do nothing i guess
  return item;
})
.value();
