import {join} from 'node:path';

export default function(page, base, extras = []) {
  return [page, ...extras.map(item => join(page, '..', item))].map(page => join(base, page));
};
