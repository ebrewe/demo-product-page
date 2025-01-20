<template>
  <nav class="header-menu">
    <ul>
      <li>
        <a href="#settings" aria-label="settings">
          <img :src="SVGSettings" alt="settings icon" />
          <div class="link-text md:hidden">Settings</div>
        </a>
      </li>
      <li>
        <a href="#alerts" aria-label="alerts">
          <img :src="SVGNotifications" alt="alerts icon" />
          <div class="link-text md:hidden">Alerts</div>
        </a>
      </li>
      <li v-if="user !== null">
        <a href="#profile" aria-label="account">
          <img :src="SVGProfile" alt="profile icon" />
          <div class="link-text">{{ user.name}}</div>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth.store';
import SVGSettings from '@/assets/SVG/Gear.svg';
import SVGNotifications from '@/assets/SVG/Notifications.svg';
import SVGProfile from '@/assets/SVG/profile.svg';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

</script>

<style scoped>
.header-menu {
  position: fixed;
  top: 0;
  right:0;
  width: 50vh;
  background-color: var(--color-bg-body);
  padding: var(--base-padding);
}

.header-menu ul {
  list-style: none;
  padding: 0;
}

.header-menu li {
  margin-bottom: 1rem;
}

a {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  color: var(--color-text);
  text-decoration: none;

  &.link-desktop {
    display: none;
  }

  @media(min-width: 768px) {
    &.link-desktop {
      display: flex;
    }

    &.link-mobile {
      display: none;
    }
  }
}
</style>