---
description: Learn the frontmatter options for VuePress2 Default Theme Plus.
---

# Frontmatter

Note that the below are _in addition_ to the [options](https://v2.vuepress.vuejs.org/reference/default-theme/frontmatter.html#all-pages) from the default theme.

## All Pages

#### jobs

* Type: `Boolean`

* Default:

  ```yaml
  jobs: true
  ```

  Configure the visibility of the jobs block on a given page.


#### rightbar

* Type: `Boolean`

* Default:

  ```yaml
  rightbar: true
  ```

* Details:

  Configure the visibility of the rightbar on a given page.

* See [Disabling the rightbar](./disabling-rightbar.html)


#### readMode

* Type: `Boolean`

* Default:

  ```yaml
  readMode: true
  ```

  Configure the visibility of the read mode link on a given page.

#### sponsors

* Type: `Boolean`

* Default:

  ```yaml
  sponsors: true
  ```

  Configure the visibility of the sponsors on a given page.

#### tags

* Type: `Array`

* Default:

  ```yaml
  tags:
    - awesomeness
    - some other tag
  ```

  Sets the given tags for the page. Each tag will also get it's own page that lists all the content tagged with the given tag. You can also set `tags: false` but usually its best to just omit `tags` altogether.

#### toc

* Type: `Boolean`

* Default:

  ```yaml
  toc: true
  ```

  Configure the visibility of the table of contents on a given page.

## Guides

* See [Making a guide 1](./making-a-guide.html)
* See [Making a guide 2](./making-a-guide-2.html)


## Blog Posts

* See [Making a blog post](./making-a-blog-post.html)

## Metadata

* See [Adding page metadata](./adding-page-metadata.html)
