<template>
  <article
    class="VPTeamMembersItem"
    :class="[size, maintainerClass]"
  >
    <div class="profile">
      <div
        v-if="(member.commits || member.maintainer) && size !== icon"
        class="top-hat"
      >
        <div class="maintainer-role">
          {{ member.maintainer ? 'Maintainer' : '' }}
        </div>
        <div class="commits">
          {{ member.commits ? member.commits : '' }}
        </div>
      </div>
      <figure class="avatar">
        <Link
          :href="getLink(member)"
          no-icon
        >
          <img
            class="avatar-img"
            :src="avatar"
            :alt="`Picture of ${member.name}`"
            :title="getAvatarTitle(member)"
          >
        </Link>
      </figure>
      <div class="data">
        <div class="name">
          {{ member.name }}
        </div>
        <p
          v-if="member.title || member.org"
          class="affiliation"
        >
          <span
            v-if="member.title"
            class="title"
          >
            {{ member.title }}
          </span>
          <span
            v-if="member.title && member.org"
            class="at"
          >
            @
          </span>
          <Link
            v-if="member.org"
            class="org"
            :class="{ link: member.orgLink }"
            :href="member.orgLink"
            no-icon
          >
            {{ member.org }}
          </Link>
        </p>
        <p
          v-if="member.desc"
          class="desc"
          v-html="member.desc"
        />
        <div
          v-if="member.links"
          class="links"
        >
          <VPSocialLinks :links="member.links" />
        </div>
      </div>
    </div>
    <div
      v-if="member.sponsor"
      class="sp"
    >
      <Link
        class="sp-link"
        :href="member.sponsor"
        no-icon
      >
        <VPIconHeart class="sp-icon" /> Sponsor
      </Link>
    </div>
  </article>
</template>

<script setup>
import {computed} from 'vue';
import VPIconHeart from 'vitepress/dist/client/theme-default/components/icons/VPIconHeart.vue';
import VPSocialLinks from 'vitepress/dist/client/theme-default/components/VPSocialLinks.vue';
import Link from './VPLLink.vue';

const {member, size} = defineProps({
  size: {
    type: String,
    default: 'medium',
  },
  member: {
    type: Object,
    default: () => ({}),
  },
});

// compute avatar url with correct size
const avatar = computed(() => {
  const src = member.avatar ?? member.pic;
  switch (size) {
    case 'icon':
      return `${src}?size=24`;
    case 'small':
      return `${src}?size=64`;
    case 'medium':
      return `${src}?size=120`;
    case 'large':
      return `${src}?size=256`;
    default:
      return src;
  };
});

const maintainerClass = computed(() => member.maintainer ? 'maintainer' : '');

const getLink = member => {
  if (member.link) return member.link;
  else if (Array.isArray(member?.links) && member.links[0]) return member.links[0].link;
  else if (member.email) return `mailto:${member.email}`;
};

const getAvatarTitle = member => {
  let avatarTitle = `${member.name}`;
  if (member.email) avatarTitle += ` <${member.email}>`;
  if (member.commits) avatarTitle += ` - ${Number.parseInt(member.commits, 10)} commits`;
  return avatarTitle;
};

</script>

<style scoped>
.VPTeamMembersItem {
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-radius: 12px;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.VPTeamMembersItem.icon {
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-radius: 12px;
  width: 30px;
  height: 30px;
  overflow: hidden;
}

.VPTeamMembersItem.icon .profile {
  padding: 0px;
  background-color: transparent;
}

.VPTeamMembersItem.icon .top-hat {
  display: none;
}

.VPTeamMembersItem.icon .maintainer-role {
  display: none;
}

.VPTeamMembersItem.icon .commits {
  display: none;
}

.VPTeamMembersItem.icon .data {
  display: none;
}

.VPTeamMembersItem.icon .avatar {
  width: 24px;
  height: 24px;
  box-shadow: none;
}

.VPTeamMembersItem.icon .sp {
  display: none;
}

.VPTeamMembersItem.small .profile {
  padding: 32px;
}

.VPTeamMembersItem.small .data {
  padding-top: 20px;
}

.VPTeamMembersItem.small .avatar {
  width: 64px;
  height: 64px;
}

.VPTeamMembersItem.small .name {
  line-height: 24px;
  font-size: 16px;
}

.VPTeamMembersItem.small .affiliation {
  padding-top: 4px;
  line-height: 20px;
  font-size: 12px;
}

.VPTeamMembersItem.small .desc {
  padding-top: 12px;
  line-height: 20px;
  font-size: 14px;
  display: none;
}

.VPTeamMembersItem.small .links {
  margin: 0 -16px -20px;
  padding: 10px 0 0;
}

.VPTeamMembersItem.medium .profile {
  padding: 48px 32px;
}

.VPTeamMembersItem.medium .data {
  padding-top: 24px;
  text-align: center;
}

.VPTeamMembersItem.medium .avatar {
  width: 96px;
  height: 96px;
}

.VPTeamMembersItem.medium .name {
  letter-spacing: 0.15px;
  line-height: 28px;
  font-size: 20px;
}

.VPTeamMembersItem.medium .affiliation {
  padding-top: 4px;
  font-size: 14px;
}

.VPTeamMembersItem.medium .desc {
  padding-top: 16px;
  max-width: 288px;
  font-size: 16px;
}

.VPTeamMembersItem.medium .links {
  margin: 0 -16px -12px;
  padding: 16px 12px 0;
}

.profile {
  flex-grow: 1;
  background-color: var(--vpl-c-bg-contributor);
}

.maintainer .profile {
  background-color: var(--vpl-c-bg-maintainer);
}
.maintainer .sp-link {
  background-color: var(--vpl-c-bg-maintainer);
}


.data {
  text-align: center;
}

.avatar {
  position: relative;
  flex-shrink: 0;
  margin: 0 auto;
  border-radius: 50%;
  box-shadow: var(--vp-shadow-3);
}

.avatar-img {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 50%;
  object-fit: cover;
}

.name {
  margin: 0;
  font-weight: 600;
}

.affiliation {
  margin: 0;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--vp-c-text-3);
}

.at {
  color: var(--vp-c-text-2);
}

.top-hat {
  position: relative;
  top: -30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.commits {
  color: var(--vp-c-text-3);
  position: relative;
  right: -25px;
  font-size: 10px
}

.maintainer-role {
  color: var(--vp-c-text-3);
  position: relative;
  font-size: 10px;
  left: -25px;
  text-transform: uppercase;
  font-weight: 700;
}

.org.link {
  color: var(--vp-c-text-3);
  transition: color 0.25s;
}

.org.link:hover {
  color: var(--vp-c-brand-1);
}

.desc {
  margin: 0 auto;
}

.desc :deep(a) {
  font-weight: 500;
  color: var(--vp-c-brand-1);
  text-decoration-style: dotted;
  transition: color 0.25s;
}

.links {
  display: flex;
  justify-content: center;
  height: 56px;
}

.sp-link {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-sponsor);
  background-color: var(--vp-c-bg-soft);
  transition: color 0.25s, background-color 0.25s;
}

.sp .sp-link.link:hover,
.sp .sp-link.link:focus {
  outline: none;
  color: var(--vp-c-white);
  background-color: var(--vp-c-sponsor);
}

.sp-icon {
  margin-right: 8px;
  width: 16px;
  height: 16px;
  fill: currentColor;
}
</style>
