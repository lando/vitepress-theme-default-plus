---
description: Learn about the team that made VuePress 2 Default Theme Plus.
layout: page
title: Team
---

<script setup>
import {
  VPLTeamPage,
  VPLTeamPageTitle,
  VPLTeamMembers
} from '@lando/vitepress-theme-default-plus'
</script>

<VPLTeamPage>
  <VPLTeamPageTitle>
    <template #title>
      Our Team
    </template>
    <template #lead>
      The development of VitePress is guided by an international
      team, some of whom have chosen to be featured below.
    </template>
  </VPLTeamPageTitle>
  <VPLTeamMembers size="small"/>
</VPLTeamPage>
