v1.0.0-beta.40 - [December 2, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.40)
-----------------------------------

* Added support for `columns` in `NavbarDropdown` subitems
* Added `satisfies` to `plugin-sidebar-header` to target specific releases

v1.0.0-beta.39 - [November 29, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.39)
------------------------------------

* Reverted requirement to `node >= 14`
* Updated to `vuepress@2.0.0-beta.53`
* Updated docs to reflect new usage

v1.0.0-beta.38 - [November 29, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.38)
------------------------------------

* Fixed bug loading `ReadMode.vue` when `readmode: false`

v1.0.0-beta.37 - [November 29, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.37)
------------------------------------

* Downstream deploy test

v1.0.0-beta.36 - [November 29, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.36)
------------------------------------

* Downstream deploy test

v1.0.0-beta.35 - [November 29, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.35)
------------------------------------

* Updated requirement to `node >= 16`
* Updated to `vuepress@2.0.0-beta.49`

v1.0.0-beta.34 - [May 5, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.34)
------------------------------

* Fixed bug with default search plugin not using correct package name

v1.0.0-beta.33 - [May 5, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.33)
------------------------------

* Bumped to stable release
* Reset devops

v1.0.0-beta.32 - [May 4, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.32)
------------------------------

* Fixed bug with new `docsearch` package causing WSOD

v1.0.0-beta.31 - [May 4, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.31)
------------------------------

* Updated to handle upsteam breaking changes in [vuepress@2.0.0-beta.40](https://github.com/vuepress/vuepress-next/blob/main/CHANGELOG.md#200-beta40-2022-04-25)
* Bubbled up some parent `slots` for `Sidebar` and `Navbar` so they work correctly [#41](https://github.com/lando/vuepress-theme-default-plus/issues/41)

v1.0.0-beta.30 - [March 28, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.30)
---------------------------------

* Added `footer` and `page footer` slots to `Layout`
* Added custom containers for `thumbnail` and `caption`
* Made all core components swappable
* Fixed bug causing unified Algolia Docsearch to 404 when search item shares a path component with `base`
* Fixed styling of main content area when both `sidebar` and `rightbar` are disabled

v1.0.0-beta.29 [March 17, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.29)
-------------------------------

* Added toggleable "Reading Mode" feature
* Added `BlogPost` as a new page type
* Added ability to easily add more "page types"
* Added new "highlight" custom container
* Added a simple "tagging" mechanism
* Added a job posting mechansim
* Improved `contributorsPage` and `contributors` so they can exclude items like bots
* Improved global and page-by-page component disabling so its more consistent
* Improved consistency of `border-radius`
* Fixed bug in `sitemp.xml` generation
* Fixed bug in `404` page causing a bad home link to show up

v1.0.0-beta.27 [March 13, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.27)
-------------------------------

* Changed default `sidebarDepth` to `0` since `TOC` does the work now
* Fixed `lang` bug in `sitemp.xml` generation
* Improved edge handling of `TOC` marker

v1.0.0-beta.26 [March 12, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.26)
-------------------------------

* Added fallback support for `frontmatter.description` with `frontmatter.summary`
* Added `toc` component to `rightbar`
* Added `robots.txt` support
* Added `sitemap.xml` support
* Elevated `Frontmatter` and `Custom Container` docs to the top level

v1.0.0-beta.24 [March 10, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.24)
-------------------------------

* Refactored so things are less shitty PART 3

v1.0.0-beta.23 [March 10, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.23)
-------------------------------

* Refactored so things are less shitty PART 2

v1.0.0-beta.22 [March 10, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.22)
-------------------------------

* Refactored so things are less shitty

v1.0.0-beta.21 [March 7, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.21)
------------------------------

* Empty release for deploy testing purposes

v1.0.0-beta.20 [March 7, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.20)
------------------------------

* Empty release for deploy testing purposes

v1.0.0-beta.19 [March 7, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.19)
------------------------------

* Empty release for deploy testing purposes

v1.0.0-beta.18 [February 28, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.18)
----------------------------------

* Added support for Hubspot tracking code [#21](https://github.com/lando/vuepress-theme-default-plus/issues/21)

v1.0.0-beta.17 [February 26, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.17)
----------------------------------

* Fixed bug causing `home` to `404` when deployed in `baseUrl` subsite configuration

v1.0.0-beta.16 [February 26, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.16)
----------------------------------

* Added `half`, `third`, `center`, `left`, `right` and `card` custom containers
* Added `rightbar` option to `frontmatter`, works like `sidebar` but can disable `rightbar`
* Made `form` styling elements more consistent
* Fixed various styling bugs

v1.0.0-beta.15 [February 25, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.15)
----------------------------------

* Removed unused components
* Updated the branding

v1.0.0-beta.14 [February 25, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.14)
----------------------------------

* Added ability to override downstream `alias` in `themeConfig`
* Improved default `home` setting when running in `baseUrl` mode [#18](https://github.com/lando/vuepress-theme-default-plus/issues/18)

v1.0.0-beta.12 [February 23, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.12)
----------------------------------

* Improved centering on `SidebarHeader`
* Removed background on `SocialLinks` for better dark mode transition
* Updated `lando` navbar defaults

v1.0.0-beta.11 [February 23, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.11)
----------------------------------

* Improved centering on `SidebarHeader`
* Removed background on `SocialLinks` for better dark mode transition
* Updated `lando` navbar defaults

v1.0.0-beta.10 [February 23, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.10)
----------------------------------

* Improved centering on `SidebarHeader`
* Removed background on `SocialLinks` for better dark mode transition
* Updated `lando` navbar defaults

v1.0.0-beta.9 [February 23, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.9)
---------------------------------

* Improved centering on `SidebarHeader`
* Removed background on `SocialLinks` for better dark mode transition
* Updated `lando` navbar defaults

v1.0.0-beta.8 [February 23, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.8)
---------------------------------

* Improved centering on `SidebarHeader`
* Removed background on `SocialLinks` for better dark mode transition
* Updated `lando` navbar defaults

v1.0.0-beta.7 [February 23, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.7)
---------------------------------

* Improved centering on `SidebarHeader`
* Removed background on `SocialLinks` for better dark mode transition
* Updated `lando` navbar defaults

v1.0.0-beta.6 [February 23, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.6)
---------------------------------

* Improved centering on `SidebarHeader`
* Removed background on `SocialLinks` for better dark mode transition
* Updated `lando` navbar defaults

v1.0.0-beta.5 [February 23, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.5)
---------------------------------

* Improved centering on `SidebarHeader`
* Removed background on `SocialLinks` for better dark mode transition
* Updated `lando` navbar defaults

v1.0.0-beta.4 [February 23, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.4)
---------------------------------

* Improved centering on `SidebarHeader`
* Removed background on `SocialLinks` for better dark mode transition
* Updated `lando` navbar defaults

v1.0.0-beta.3 [February 17, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.3)
---------------------------------

* Improved `sidebarHeader.icon` so it honors `base`
* Improved `social` and `sidebarHeader` styling for mobile
* Improved `<form>` stylings
* Fixed bug causing `lastUpdated` to not show up in `GuideHeader`
* Fixed bug causing Docsearch to not work correctly

v1.0.0-beta.2 [February 16, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.2)
---------------------------------

* Added undocumented setting to toggle on Lando docs "easy mode"
* Fixed bug causing `MailChimp` component to be offset in some contexts
* Fixed bug where `Help and Support` was named `Making a Guide 1`
* Fixed bug where theme defaults were not being merged into `themeConfig` correctly
* Fixed other bugs that are not even worth mentioning

v1.0.0-beta.1 [February 15, 2022](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v1.0.0-beta.1)
---------------------------------

* First beta with feature completeness (we think?). See [docs on docs](https://vuepress-theme-default-plus.lando.dev/).

v0.2.3 [November 8, 2021](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v0.2.3)
-------------------------

* Adjust VuePress Dependencies

v0.2.2 [November 8, 2021](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v0.2.2)
-------------------------

* Adjust VuePress Dependencies

v0.2.1 [November 8, 2021](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v0.2.1)
-------------------------

* Move some VuePress plugins into prod dependencies

v0.2.0 [November 8, 2021](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v0.2.0)
-------------------------

* Rename package

v0.1.2 [November 8, 2021](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v0.1.2)
-------------------------

* Update Docs

v0.1.1 [November 8, 2021](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v0.1.1)
-------------------------

* Fix Linting

v0.1.0 [November 5, 2021](https://github.com/lando/vuepress-theme-default-plus/releases/tag/v0.1.0)
-------------------------

* Initial Release
