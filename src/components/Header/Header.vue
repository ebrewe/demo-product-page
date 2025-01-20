<template>
  <header>
    <div class="header-logo">
      <img :src="LogoImg" alt="Storm logo" />
    </div>
    <HeaderSearch v-if="authPassed"/>
    <HeaderMenu v-if="authPassed"/>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import HeaderSearch from './HeaderSearch.vue';
import HeaderMenu from './HeaderMenu.vue';
import LogoImg from '@/assets/PNG/Logo.png';

const route = useRoute();
const authPassed = computed(() => route.meta.requiresAuth);
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
}

.header-logo {
  padding: 0;
  margin-right: auto;

  img {
    width: 210px;
  }
}
</style>