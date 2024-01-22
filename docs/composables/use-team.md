---
description: Learn about the VitePress Default Theme + useTeam composable.
---

# useTeam

You can `import` the `useTeam()` composable from `@lando/vitepress-theme-default-plus` and use it to create a team or contributors page.

```js
const members = useTeam();
```

Here is how we generate our `/team` page:

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
