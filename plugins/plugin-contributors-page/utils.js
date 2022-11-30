import _ from 'lodash';
import {path} from '@vuepress/utils';

export const getTopLevelPages = items => _(items)
  .map(item => (_.isString(item)) ? item : item.link)
  .compact()
  .map(item => path.basename(item, '.md'))
  .map(item => path.basename(item, '.html'))
  .value();

