
import {EOL} from 'node:os';

const pivot = 'export default function(app) {';

export default function(layouts = []) {
  return {
    name: 'inject-layouts',
    enforce: 'pre',
    transform: (code, id) => {
      if (id.endsWith('enhance-app-with-layouts.js') && layouts.length > 0) {
        // get lines and pindex
        const lines = code.split(EOL);
        // get pivot line
        let pindex = lines.findIndex(line => line.startsWith(pivot));
        // loop through and add imports
        for (const layout of layouts.reverse()) lines.splice(pindex, 0, layout.import);
        // get pivot again
        pindex = lines.findIndex(line => line.startsWith(pivot)) + 1;
        // loop through again and add components
        for (const layout of layouts.reverse()) lines.splice(pindex, 0, layout.add);

        return lines.join(EOL);
      }
    },
  };
};
