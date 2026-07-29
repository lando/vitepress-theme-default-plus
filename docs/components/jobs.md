---
description: Learn about the VitePress Default Theme + global Jobs components.
jobs:
  - title: 'Lando Developer'
    logo: 'https://docs.lando.dev/images/icon.svg'
    link: 'https://docs.google.com/forms/d/e/1FAIpQLSc2vkesq59BblKo8ZX-R1hKTrHphh1kmsg4FgWV1WH5BKEjHQ/viewform'
    company: 'Lando Alliance'
    aux: 'DC, Remote'
---

# Jobs

### Usage

To populate `<Jobs>` you will want to set the theme config [here](../config/config.html#jobs).

You can also customize or disable the jobs on a per-page basis with [frontmatter](../config/frontmatter.html#jobs).

```html
<Jobs title="Jobs" />
```

### Example - Defaults

```html
<Jobs />
```

<Jobs />

### Example - Custom Title


```html
<Jobs title="LOOKING FOR A NEW JOB?"/>
```

<Jobs title="LOOKING FOR A NEW JOB?"/>

### Example - No Title

```html
<Jobs :title="false"/>
```

<Jobs :title="false"/>

::: tip NOTE
You must use `:title` and not `title` to parse `"false"` correctly.
:::
