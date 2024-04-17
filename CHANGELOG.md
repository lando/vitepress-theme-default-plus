## v1.0.2 - [April 17, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.2)

## Bug Fixes

* Updated `lando` config sets
* Updated to `vitepress@1.1.0`

## v1.0.1 - [April 4, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.1)

## Bug Fixes

* Fixed bug causing auto population of `authors` from `contributors` when `authors` is empty

## v1.0.0 - [April 4, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0)

## New Features

* Added `maintainer` key to `contributors`
* Added `rtfm47` to the `debotify` protocol
* Updated to `vitepress@1.0.2`

## v1.0.0-beta.42 - [April 2, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.42)

## New Features

* Improved `sponsors.data` to accept a URL that returns `json` or `yaml`

## v1.0.0-beta.41 - [March 28, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.41)

## Fixes

* Checked if `authors` is defined by @mtdvlpr in https://github.com/lando/vitepress-theme-default-plus/pull/32
* Converted `undefined` `authors` to empty array by @mtdvlpr in https://github.com/lando/vitepress-theme-default-plus/pull/30
* Falled back to empty array for `authors` by @mtdvlpr in https://github.com/lando/vitepress-theme-default-plus/pull/31

## v1.0.0-beta.40 - [March 5, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.40)

## New Features

* Added `mergeWith` for more explicit contrubutor merging
* Updated to `vitepress@1.0.0-rc.44`

## Fixes

* Changed member data to only render if available [#27](https://github.com/lando/vitepress-theme-default-plus/pull/27)
* Fixed Algolia search from displaying contrib information in source text, requires reindexing on Algolia end
* Fixed Algolia search from attempting to route to internal pages that are actually external

## Internal

* Changed `VPLTeamMembersItem.vue` to wrap name in `div` instead of `h1`

## v1.0.0-beta.39 - [February 17, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.39)

## Fixes

* Fixed: don't enable `carbonAds` by default by @mtdvlpr in https://github.com/lando/vitepress-theme-default-plus/pull/26
* Fixed: correctly compute `hlocation` by @mtdvlpr in https://github.com/lando/vitepress-theme-default-plus/pull/24

## New Contributors

* @mtdvlpr made their first contribution in https://github.com/lando/vitepress-theme-default-plus/pull/26

**Full Changelog**: https://github.com/lando/vitepress-theme-default-plus/compare/v1.0.0-beta.38...v1.0.0-beta.39

## v1.0.0-beta.38 - [February 15, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.38)

* Fixed `layouts` resolution when ingesting theme

## v1.0.0-beta.37 - [February 15, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.37)

* Added `color`, `icon`, `styles` and `tagClass` properties to `<VPLCollectionTag>`
* Fixed some styling bugs in `<VPLCollectionTag>`
* Simplified `useCollection` tagging to an all purpose `tags` export

## v1.0.0-beta.36 - [February 14, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.36)

* Improved exportability of non-essentials

## v1.0.0-beta.35 - [February 14, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.35)

* Switched `lodash` to `lodash-es` because 🤦

## v1.0.0-beta.34 - [February 14, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.34)

* Improved design of `tagging` and related components and composables ❤️

## v1.0.0-beta.33 - [February 13, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.33)

* Updated `lando` config sets

## v1.0.0-beta.32 - [February 12, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.32)

* Added `tagging` as [a thing](https://vitepress-theme-default-plus.lando.dev/guides/tagging-shit.html)
* Improved `createContentLoader` so it returns additional optional `frontmatter` but removes unneeded props for performance reasons

## v1.0.0-beta.31 - [February 9, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.31)

* AUTO DEPLOY FIX 2

## v1.0.0-beta.30 - [February 9, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.30)

* AUTO DEPLOY FIX 1

## v1.0.0-beta.29 - [February 8, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.29)

* Fixed broken `internalDomains` handling to force `target=_self`

## v1.0.0-beta.28 - [February 7, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.28)

* Update sponsor linx

## v1.0.0-beta.27 - [February 7, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.27)

* Fixed bug causing `vitepress build` failures on non-file `git log` locations
* Fixed bug causing `VPLCollectionIcon.vue` to not render correctly on a hard refresh

## v1.0.0-beta.26 - [February 7, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.26)

* Updated to `vitepress@1.0.0-rc.42`

## v1.0.0-beta.25 - [February 7, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.25)

* Guard `prev.id` and `next.id` in `useCollection` like it's nobodies biznizz

## v1.0.0-beta.24 - [February 2, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.24)

* Updated to `vitepress@1.0.0-rc.41`
* Updated `sponsors.yaml`

## v1.0.0-beta.23 - [February 1, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.23)

* Fixed collection `WSOD` in some `undefined` id situations

## v1.0.0-beta.22 - [January 31, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.22)

* Fixed default `sidebarEnder` for `lando` config sets

## v1.0.0-beta.21 - [January 30, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.21)

* Added an `export` for our `createContentLoader`
* Removed reliance on `vite/normalizePath`
* TOMLize netlify plugin settings

## v1.0.0-beta.20 - [January 25, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.20)

* Fixed broken `base` in Lando config sets
* Updated `twitter` to `x`

## v1.0.0-beta.19 - [January 25, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.19)

* Improved `vite` configuration for better portability part 2

## v1.0.0-beta.18 - [January 25, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.18)

* Improved `vite` configuration for better portability

## v1.0.0-beta.17 - [January 25, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.17)

* Dealias all `vitepress` components for better portability

## v1.0.0-beta.16 - [January 25, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.16)

* Updated to latest `vitepress` take 2

## v1.0.0-beta.15 - [January 25, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.15)

* Updated to latest `vitepress`

## v1.0.0-beta.14 - [January 25, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.14)

* Fixed more extension chaos

## v1.0.0-beta.13 - [January 25, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.13)

* Fixed `Cannot find module` on `enhance-app-with-layouts`

## v1.0.0-beta.12 - [January 24, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.12)

* Fixed `<Jobs>` and `<Sponsors>` dark mode background color to be more consistent with `<CarbonAds>`

## v1.0.0-beta.11 - [January 24, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.11)

* Casing matters

## v1.0.0-beta.10 - [January 24, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.10)

* Added ability to append a *single* menu item to the end of the sidebar with the `sidebarEnder` config key

## v1.0.0-beta.9 - [January 24, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.9)

* Fixed `dependency` resolution

## v1.0.0-beta.8 - [January 24, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.8)

* Fixed `dependency` resolution

## v1.0.0-beta.7 - [January 24, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.7)

* Fixed `dependency` resolution

## v1.0.0-beta.6 - [January 24, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.6)

* Fixed automatic `gitRoot` discovery when used outside itself
* Improved `base` usage
* Migrated `lando` config sets to VitePress

## v1.0.0-beta.5 - [January 23, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.5)

* Fixed internal `import` resolutions so theme can be used externally
* Improved install docs to reflect the need to also install `vitepress`

## v1.0.0-beta.4 - [January 23, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.4)

* Fixed bug causing `VPLDocFooter` to not show when toggling between a `collection` and normal doc
* Fixed `netlify` form input text in dark mode so it is visible
* Fixed broken GitHub support link

## v1.0.0-beta.3 - [January 23, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.3)

* First deploy to `npm` part 2

## v1.0.0-beta.2 - [January 23, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.2)

* First deploy to `npm`

## v1.0.0-beta.1 - [January 23, 2024](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.0.0-beta.1)

* Migrated [@lando/vuepress-theme-default-plus](https://github.com/lando/vuepress-theme-default-plus) to [VitePress](https://vitepress.dev/)
