# VuePress 2 Theme for Lando Docs

## How To Use

Add the theme name to your [theme key](https://v2.vuepress.vuejs.org/guide/theme.html#community-theme) in your VuePress 2 config.js:

```
module.exports = {
  ...
  theme: '@lando/vuepress-theme-lando-docs',
  ...
};
```

## Options

The theme comes with 2 optional components that can be set via the [themeConfig](https://v2.vuepress.vuejs.org/reference/config.html#theme-config) key in your config.js.  They can be set with `showCarbonAds` and / or `showSponsors`.  Both default to `true`.

### showCarbonAds Option

The `showCarbonAds` will display the [Carbon Ads component](https://github.com/lando/vuepress-theme-lando-docs/blob/main/lib/components/CarbonAds.vue).  This component will display in the `#sidebar-top` [slot](https://v2.vuepress.vuejs.org/advanced/cookbook/extending-a-theme.html#extend-default-theme) from the default theme.  Set to `false` to hide this component.

### showSponsors / sponsors Options

The `showSponsors` will display a list of sponsors from a YAML file in your theme.  The value can be either `boolean` or a `string[]`.  If set to `true`, it will display all sponsors from your YAML file. 

If set to a `string[]`, it will match the `id` key in your yaml file and only display that sponsor.  The YAML file needs be set to the option `sponsor` for this to work properly.

**YAML File Example**

Your config.js will need to look like this:

```js
const yaml = require('js-yaml');
const fs = require('fs');

module.exports = {
  ...
  theme: '@lando/vuepress-theme-lando-docs'
  themeConfig: {
    sponsors: yaml.load(fs.readFileSync(path.resolve(__dirname, 'public') + '/api/sponsors.yml', 'utf8')),
    showSponsors: ['platformsh'],
  },
};
 ...
```

The sponsors.yml file in your theme's public directory needs to look like this:

```yaml
- name: Platform.sh
  id: platformsh
  url: https://platform.sh
  logo: https://lando.dev/images/platform_sh_logo.png
- name: amazee.io
  id: amazeeio
  url: https://www.amazee.io/
  logo: https://lando.dev/images/amazee_io_logo.png
- name: Pantheon
  id: pantheon
  url: https://pantheon.io/
  logo: https://lando.dev/images/pantheon_logo.png
- name: Blackmesh by Contegix
  id: blackmesh
  url: https://www.blackmesh.com/
  logo: https://lando.dev/images/blackmesh_logo.png
```