---
description: Learn the frontmatter options for VitePress Default Theme Plus.
---

# Frontmatter

Note that the below are _in addition_ to the [options](https://vitepress.dev/reference/frontmatter-config) from the default theme.

## alert

* Type: `Boolean || Object`

* Default:

  ```yaml
  alert: false
  ```

* Example

  ```yaml
  alert:
    content: VIBES RISING
    type: 'success'
    closeable: false
  ```

* Details:

  Configure the visibility or content of the `<Alert>` component on a given page.

  You can also configure this globally with [config](./config.md#alert).

## backLink

* Type: `Boolean || Object`

* Default: `false`

* Example

  ```yaml
  backLink:
    text: '<- Back to blog'
    link: '/blog'
  ```

* Details:

  Sets a `backLink` in the document footer.

## contributors

* Type: `Boolean || Object`

* Default:

  ```yaml
  contributors: true
  ```

* Example

  ```yaml
  contributors: false
  ```

* Details:

  Configure the visibility or content of the `<Contributors>` component on a given page.

  This thing has a lot of options so check out [this](./config.md#contributors) for more info or to just set global contributors.

## jobs

* Type: `Boolean ||  Array[Object]`

* Default:

  ```yaml
  jobs: true
  ```

* Example

  ```yaml
  jobs:
    - title: Batman
      logo: https://seeklogo.com/images/B/Batman-logo-F8295E46F2-seeklogo.com.png
      link: https://docs.google.com/forms/d/e/1FAIpQLSc2vkesq59BblKo8ZX-R1hKTrHphh1kmsg4FgWV1WH5BKEjHQ/viewform
      company: Wayne Enterprises
      aux: Gotham, Remote
  ```

* Details:

  Configure the visibility or content of the `<Jobs>` component on a given page.

  You can also configure this globally with [config](./config.md#jobs).

## mailchimp

* See [Adding page metadata](./../guides/guide-signup)

## sponsors

* Type: `Boolean || Object`

* Default:

  ```yaml
  sponsors: true
  ```

* Example

  ```yaml
  sponsors:
    text: your logo?
    link: https://lando.dev/sponsor
    data:
      - name: stark
        id: stark
        url: https://en.wikipedia.org/wiki/Stark_Industries
        logo: https://upload.wikimedia.org/wikipedia/commons/7/7d/Stark_Industries.png
        type: half
      - name: wayne
        id: wayne
        url: https://en.wikipedia.org/wiki/Wayne_Enterprises
        logo: https://upload.wikimedia.org/wikipedia/commons/3/32/Wayne_Enterprises_%28DC_Comics_fictional_logo%29.png
        type: half
  ```

* Details:

  Configure the visibility or content of the `<Sponsors>` component on a given page.

  You can also configure this globally with [config](./config.md#sponsors).

## tags

* Type: `String ||  Array[String]`

* Default:

  ```yaml
  tags:
  ```

* Example

  ```yaml
  tags:
    - this is a test tag
    - so is this
  ```

* Details:

  Note that this only works for content that is in a [collection](./config.md#collections).

## url-loader

* Type: `String ||  Object`

* Default:

  ```yaml
  url-loader:
    source:
    content: replace
    frontmatter: replace
  ```

* Examples

  **shorthand**
  ```yaml
  url-loader: https://raw.githubusercontent.com/lando/setup-lando/refs/heads/main/docs/macos.md
  ```

  **long form**

  ```yaml
  url-loader:
    source: https://raw.githubusercontent.com/lando/setup-lando/refs/heads/main/docs/macos.md
    frontmatter: rebase
    content: append
  ```

* Details:

  You can set `url-loader` to a string and it will populate `url-loader.source` using the `replace` default values for `url-loader.content` and `url-loader.frontmatter`.

  By default `frontmatter` and `content` will `replace` the current `.md` file's frontmatter and content with the frontmatter and content from `source`.

  You can alter the behavior for both `frontmatter` and `content` though.

  For `content` you can `append` the content from `source` to the content in the markdown file. `prepend` will, [you guessed it](https://www.youtube.com/watch?v=Fb6KH7GRAY4&t=47s), prepend the remote content to the markdown file.

  For `frontmatter` you can deeply `merge` the remote frontmatter over the markdown files or you can `rebase` which will merge the markdown files frontmatter over the remotes. You can also `skip`, `omit` or `false` to do nothing with the remote frontmatter.

## Guides

* See [Making a guide 1](./../guides/making-a-guide)
* See [Making a guide 2](./../guides/making-a-guide-2)

## Blog Posts

* See [Making a blog post](./../blog/making-a-blog-post)

## Metadata

* See [Adding page metadata](./../guides/adding-page-metadata)
