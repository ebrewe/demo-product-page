<template>
  <ul>
    <li>
      <a href="#settings" aria-label="settings">
        <img :src="SVGSettings" alt="settings icon" />
        <div class="link-text md-lg-hidden">Settings</div>
      </a>
    </li>
    <li>
      <a href="#alerts" aria-label="alerts">
        <img :src="SVGNotifications" alt="alerts icon" />
        <div class="link-text md-lg-hidden">Alerts</div>
      </a>
    </li>
    <li v-if="user !== null">
      <a href="#profile" aria-label="account">
        <img :src="SVGProfile" alt="profile icon" />
        <div class="link-text">{{ user.name}}</div>
      </a>
    </li>
  </ul>
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
ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 1rem;
  display:flex; 
  justify-content: flex-start;
}

a {
  display: flex;
  align-items: center;
  padding-right: var(--base-padding-x);
}

</style>