---
description: Learn the frontmatter options for VuePress2 Default Theme Plus.
---

# Frontmatter

Note that the below are _in addition_ to the [options](https://vitepress.dev/reference/frontmatter-config) from the default theme.

## alert

* Type: `Boolean || Object`

* Default:

  ```yaml
  alert: false
  ```

* Details:

  Configure the visibility or content of the `<Alert>` component on a given page.

* Example

  ```yaml
  alert:
    content: VIBES RISING
    type: 'success'
    closeable: false
  ```

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

  This thing has a lot of options so check out [this](./config.md#contributors) for more info.


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


## rightbar

* Type: `Boolean`

* Default:

  ```yaml
  rightbar: true
  ```

* Details:

  Configure the visibility of the rightbar on a given page.

* See [Disabling the rightbar](./../guides/disabling-rightbar.md)


## readMode

* Type: `Boolean`

* Default:

  ```yaml
  readMode: true
  ```

  Configure the visibility of the read mode link on a given page.

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
    link: http://lando.dev/sponsor
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

## tags

* Type: `Array`

* Default:

  ```yaml
  tags:
    - awesomeness
    - some other tag
  ```

  Sets the given tags for the page. Each tag will also get it's own page that lists all the content tagged with the given tag. You can also set `tags: false` but usually its best to just omit `tags` altogether.

## Guides

* See [Making a guide 1](./../guides/making-a-guide)
* See [Making a guide 2](./../guides/making-a-guide-2)


## Blog Posts

* See [Making a blog post](./../blog/making-a-blog-post)

## Metadata

* See [Adding page metadata](./../guides/adding-page-metadata)
