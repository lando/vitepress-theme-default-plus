

import {basename, join, sep} from 'node:path';
import dropRight from 'lodash/dropRight.js';
import range from 'lodash/range.js';

export default function(files, startsFrom) {
  return range(startsFrom.split(sep).length)
  .map(end => dropRight(startsFrom.split(sep), end).join(sep))
  .map(dir => files.map(file => join(dir, basename(file))))
  .flat(Number.POSITIVE_INFINITY);
};
