---
description: Learn about the VitePress Default Theme + collections components.
---

# Team Pages

You can `import` some helpful `components` from `@lando/vitepress-theme-default-plus` and compose team pages.

This is especially useful when used in tandem with [useTeam](../composables/use-team.md).

It's worth noting that this is a very thin wrapper around the [team page components](https://vitepress.dev/reference/default-theme-team-page) provided by the default VitePress theme.

Here is what we do to create `/team` for this site.


```js
const members = useTeam();
```

```html
<VPLTeamPage>
  <VPLTeamPageTitle>
    <template #title>
      Contributors
    </template>
    <template #lead>
      We are the people who made this thing.
    </template>
  </VPLTeamPageTitle>
  <VPLTeamMembers :members="members" size="small"/>
</VPLTeamPage>

<script setup>
import {VPLTeamPage, VPLTeamPageTitle, VPLTeamMembers} from '@lando/vitepress-theme-default-plus'
import {useTeam} from '@lando/vitepress-theme-default-plus';

const members = useTeam();
</script>
```

## \<VPLTeamPage />

This is more or less just a wrapper to provide structure, styling and the downstream slots so the usage is fairly straightforward:

```html
<VPLTeamPage>
  ...other stuff goes here
</VPLTeamPage>
```

## \<VPLTeamPageTitle />

Provide a title and lead-in for the page.

<VPLTeamPage>
  <VPLTeamPageTitle>
    <template #title>
      Contributors
    </template>
    <template #lead>
      We are the people who made this thing.
    </template>
  </VPLTeamPageTitle>
</VPLTeamPage>

## \<VPLTeamPageSection />

If you'd like to provide distinct sections on a team page. You can do something like:

```html
<VPLTeamPage>
  <VPLTeamPageSection>
    <template #title>
      Contributors
    </template>
    <template #lead>
      We are the people who made this thing.
    </template>
    <template #members>
      <VPLTeamMembers :members="members" size="small"/>
    </template>
  </VPLTeamPageSection>
</VPLTeamPage>
```

## \<VPLTeamMembers />

Or if you just want to directly show team members.

```html
<VPLTeamMembers
  :members="members"
  size="medium"
/>

<script setup>
import {VPLTeamMembers} from '@lando/vitepress-theme-default-plus'
import {useTeam} from '@lando/vitepress-theme-default-plus';

const members = useTeam();
</script>
```

For `size` you can do `icon`, `small` and `medium`.
