import container from 'markdown-it-container';

export default function(name, opts = {}, md) {
  return [container, name, {
    render(tokens, index, _options, env) {
      const token = tokens[index];
      const info = token.info.trim().slice(name.length).trim() || opts.defaultTitle;
      const attrs = md.renderer.renderAttrs(token);

      // opening tag
      if (token.nesting === 1) {
        const title = info ? md.renderInline(info, {references: env.references}) : undefined;
        const titleMarkdown = title ? `<p class="custom-block-title">${title ? title : ''}</p>` : '';

        // special handling for details
        if (name === 'details') return `<details class="${name} custom-block"${attrs}><summary>${title}</summary>\n`;
        // otherwise
        return `<div class="${name} custom-block"${attrs}>${titleMarkdown}\n`;

      // closing tag
      } else return name === 'details' ? `</details>\n` : `</div>\n`;
    }},
  ];
};
