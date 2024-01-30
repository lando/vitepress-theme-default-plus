---
description: Learn about the VitePress Default Theme + global Sponsors components.
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
---

# Sponsors

### Usage

To populate `<Sponsors>` you will want to set the theme config [here](../config/config.html#sponsors).

You can also customize or disable the sponsors on a per-page basis with [frontmatter](../config/frontmatter.html#sponsors).

```html
<Sponsors
  title="Sponsors"
  text="your logo?"
  link="https://path/to/become/sponsor/"
/>
```

### Example - Defaults

```html
<Sponsors />
```

<Sponsors />

### Example - Customize


```html
<Sponsors
  title="MASSIVE PROPS TO"
  text="Can HaZ ProPs 2?"
  link="https://lando.dev/sponsor"
/>
```

<Sponsors
  title="MASSIVE PROPS TO"
  text="Can HaZ ProPs 2?"
  link="https://lando.dev/sponsor"
/>

### Example - Sponsors Only

```html
<Sponsors
  :title="false"
  :text="false"
  :link="false"
/>
```

<Sponsors
  :title="false"
  :text="false"
  :link="false"
/>

::: tip NOTE
You must use `:prop` e.g. `:title` to parse `"false"` correctly.
:::
