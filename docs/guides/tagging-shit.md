---
description: Some basic information around tagging stuff
tags:
  - obscure
  - this is a test tag
  - tag 2
  - secret tag
---

# Tagging shit

There are a few different tagging related things in these docs so this guide tries to [tie the room together](https://www.youtube.com/watch?v=_vGK008c_rA) on it.

## What can I tag?

Any [collections](../config/config.md#collections) based content can be tagged via [frontmatter](../config/frontmatter.md#tags) as below:

```md
---
description: Some basic information around tagging stuff
tags:
  - obscure
  - this is a test tag
  - tag 2
---
```

## Whats tags are available?

By default you can "free tag" which means there is not a centralized or finite set of acceptable tags. You can, however, [customize the appearance](../config/config.md#tags) of the tags. For example you can change the styling, add an icon or change the `tagLink` for a specific tag.

Look at the TAGS section in the aside for this page. The customization of those tags is provided by the below theme config:

```js
tags: {
  'obscure': {
    color: 'var(--vp-c-purple-1)',
    styles: {
      color: 'var(--vp-c-white)',
    },
    icon: '',
  },
  'secret tag': {
    color: '#C0FFEE',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-6 3.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM7.293 5.293a1 1 0 1 1 .99 1.667c-.459.134-1.033.566-1.033 1.29v.25a.75.75 0 1 0 1.5 0v-.115a2.5 2.5 0 1 0-2.518-4.153.75.75 0 1 0 1.061 1.06Z" clip-rule="evenodd" /></svg>',
    link: 'https://www.youtube.com/watch?v=HU2ftCitvyQ',
    styles: {
      color: '#BA11AD',
    },
  },
  'tag 2': {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M11.5 8a3.5 3.5 0 0 0 3.362-4.476c-.094-.325-.497-.39-.736-.15L12.099 5.4a.48.48 0 0 1-.653.033 8.554 8.554 0 0 1-.879-.879.48.48 0 0 1 .033-.653l2.027-2.028c.24-.239.175-.642-.15-.736a3.502 3.502 0 0 0-4.476 3.427c.018.99-.133 2.093-.914 2.7l-5.31 4.13a2.015 2.015 0 1 0 2.828 2.827l4.13-5.309c.607-.78 1.71-.932 2.7-.914L11.5 8ZM3 13.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" /></svg>',
  },
},
```

## Where do the tags link to?

You can provide a URL default pattern with [tagLink](../config/config.md#tag-link). This can then be overriden on a per-tag basis using `tags[tag].link`.

In the [above section](#whats-tags-are-available) the `secret tag` has been customized to link externally to this [helpful rock climbing tutorial](https://www.youtube.com/watch?v=HU2ftCitvyQ).

## Can I add tags to a page?

You can add a [filter](../pages/collections.md#vplcollectionpagetags) to a [Collections Page](../pages/collections.md). You can also get a list of a given pages Tags with the below:

```html
import {VPLCollectionItemTags} from '@lando/vitepress-theme-default-plus

<VPLCollectionItemTags />
```

## Can I set tags with a URL?

Yes! Here is a way to look at all the collections content on this page with the "obscure" tag:

https://vitepress-theme-default-plus.lando.dev/all?tag=obscure
