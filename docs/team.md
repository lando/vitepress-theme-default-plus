---
description: Learn about the team that made VitePress Default Theme Plus.
layout: page
title: Team
---

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
