import container from 'markdown-it-container';
import Debug from 'debug';

const parseTabsParams = input => {
  const match = input.match(/key:(\S+)/);
  return {shareStateKey: match?.[1]};
};

export default function(md, {debug = Debug('@lando/markdown-plugin')}) { // eslint-disable-line
  md.use(container, 'tabs', {
    render(tokens, index, _options, env) {
      const token = tokens[index];
      const style = token.info.trim().slice(4).trim();

      if (token.nesting === 1) {
        const params = parseTabsParams(token.info);
        const shareStateKeyProp = params.shareStateKey
          ? `sharedStateKey="${md.utils.escapeHtml(params.shareStateKey)}"`
          : '';
        return `<PluginTabs class="${style}" ${shareStateKeyProp}>\n`;
      } else {
        return `</PluginTabs>\n`;
      }
    },
  });
  debug('override custom markdown container %o with styling support', 'vitepress-plugin-tabs');
};
