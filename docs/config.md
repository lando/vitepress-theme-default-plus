# Configuration

This theme _extends_ the [Vuepress2 Default Theme](https://v2.vuepress.vuejs.org/reference/default-theme/config.html#basic-config) but sets [slightly different defaults]((https://github.com/lando/vuepress-theme-default-plus/blob/main/lib/defaults.js)). _Theoretically_ all the options supported in the default theme should also be available in this one.

Here are the additional configuration options that we've added.

## Generic Config

#### autoPopulate

* Type: `Boolean`

* Default: `false`

* Details:

This will attempt to grab information about your project using `repo`. Currently only GitHub repos are supported.

* Requirements:

This requires you also set `repo`.

#### baseUrl

* Type: `String`

* Default: `null`

* Example: `baseUrl: 'https://docs.lando.dev'`

* Details:

This allows URLs to the specified external domain to be experentially treated like internal links. This is useful if you have multiple docs sites that are all tied together into a single domain a la Netlify. If you don't understand what that is or you only have a single docs site then its best to just ignore this one.
