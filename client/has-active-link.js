
import {default as getItemNormalizedLink} from './get-item-nl.js';
import {default as isActive} from './is-active.js';

export default function hasActiveLink(path, items) {
  if (Array.isArray(items)) {
    return items.some(item => hasActiveLink(path, item));
  }

  return isActive(path, getItemNormalizedLink(items))
    ? true
    : items.items
      ? hasActiveLink(path, items.items)
      : false;
};
