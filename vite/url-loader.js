import axios from 'axios';
import matter from 'gray-matter';
import merge from 'lodash-es/merge.js';

import Debug from 'debug';
import {EOL} from 'node:os';

// return updated content
const getContent = (remote, og, config) => {
  switch (config.content) {
    case 'append': return `${og.content}${EOL}${remote.content}`;
    case 'prepend': return `${remote.content}${EOL}${og.content}`;
    case 'replace': return remote.content;
    default: return remote.content;
  }
};

// return updated frontmatter
const getFrontmatter = (remote, og, config) => {
  switch (config.frontmatter) {
    case 'merge': return merge({}, og.data, remote.data);
    case 'rebase': return merge({}, remote.data, og.data);
    case 'replace': return remote.data;
    case 'omit':
    case 'skip':
    case false:
      return og.data;
    default: return remote.data;
  }
};

// return a standard url-loader config object with defaults
const normalize = config => {
  // if config is a string then reset to an object
  if (typeof config === 'string') config = {source: config};
  // return with mixed in defaults
  return merge({}, {content: 'replace', frontmatter: 'replace'}, config);
};

export default function({debug = Debug('@lando/url-loader')}) {  // eslint-disable-line
  return {
    name: 'url-loader',
    enforce: 'pre',
    async transform(code, id) {
      if (id.endsWith('.md')) {
        // get original content stuff
        const og = matter(code);

        // if we have a url-loader then proceed
        if (og?.data?.['url-loader']) {
          // normalize loader
          const config = normalize(og.data['url-loader']);
          debug('fetching content for %o from %o with %o', id, config.source, {config});

          // attempt to get raw remote source code
          try {
            new URL(config.source);
            config.response = await axios.get(config.source);
          } catch (error) {
            error.message = `Fetching ${config.source} for ${id} failed with: ${error.message}`;
            throw error;
          }

          // parse remote content
          const remote = matter(config?.response?.data ?? '');

          // build new content/frontmatter
          const content = getContent(remote, og, config);
          const frontmatter = getFrontmatter(remote, og, config);

          // stringify and retturn
          return matter.stringify(content, frontmatter);
        }
      }

      return null;
    },
  };
};
