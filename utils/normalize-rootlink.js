import {default as normalize} from './normalize-2base.js';

export default function normalizerootLink(url, site) {
  return normalize(url, '/', site);
};
