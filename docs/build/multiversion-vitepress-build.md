---
description: Learn how to build mulitple versions of the docs
---

# Multiversion Build

The default `vitepress build` is great but sometimes you want your build to generate multiple versions of your docs to keep track of `stable` releases, `edge` releases and the last commit `dev` release.

::: tip GUIDE
Check out [this guide](../guides/multiversion-vitepress-build) for a complete tutorial on setting up multiverion build!
:::

It can also be useful to store older versions of your docs for posterity and other `#devreasons`.

Enter `multiversion-vitepress-build` a node `bin` we ship with that you can invoke with either `multiversion-vitepress-build` or with the `mvb` alias.

```sh
npx mvb
```

## Usage

By default it will look in `docs` for the `<root>` but you can set this as needed.

```sh
Usage: [CI=1] multiversion-vitepress-build <root> \
  [--base <base>] \
  [--build <alias>] \
  [--match "<match>"] \
  [--no-cache] \
  [--out-dir <dir>] \
  [--satisifes "<satisfies>"] \
  [--version-base <dir>] \
  [--debug] \
  [--help]

Options:
  --base             sets site base [default: /]
  --build            uses this version alias for main/root build [default: stable]
  --match            filters versions from git tags [default: "v[0-9].*"]
  --no-cache         builds all versions every build [default: "false"]
  --out-dir          builds into this location [default: docs/.vitepress/dist]
  --satisfies        builds versioned docs in this semantic range [default: "*"]
  --version-base     builds versioned docs in this location [default: /v/]
  --debug            shows debug messages
  -h, --help         displays this message

Environment Variables:
  CI                 installs in CI mode (e.g. does not prompt for user input)
```

To better understand the options we recommend you check out the [mvb config](../config/config.md#multiversion-build) which will also set the default values for the options above.

## Examples

```sh
# run with default options or those set in the siteConfig
npx mvb

# build a narrow range of previous docs and use stable as the primary build
# build from a different directory
npx mvb old_docs --build stable --satisfies ">=1.0.0 <1.0.4"

# build all versions into a separate directory
npx mvb --satisfies "*" --version-base "/all-versions/"

# rebuild all versions from scratch
npx mvb --no-cache

# get usage/help
npx mvb --help
```
