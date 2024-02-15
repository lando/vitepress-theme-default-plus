import {resolve, basename} from 'node:path';

export default function(layouts = {}) {
  return Object.entries(layouts)
    .map(([name, layout]) => ({
      name,
      var: basename(layout, '.vue'),
      from: layout,
    }))
    .map((layout, index) => ({
      ...layout,
      add: `  app.component('${layout.name}', ${layout.var});`,
      index,
      import: `import ${layout.var} from '${resolve(layout.from)}';`,
    }));
}
