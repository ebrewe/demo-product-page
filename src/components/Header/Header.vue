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
  flex-direction: column;
  position: relative;

  margin: 40px 18px 23px 34px; // so, so lame

  // tablet
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    margin: 40px 26px 18px 26px;
  }

  @media (min-width: 992px) {
    align-items: center;
    margin: 80px 0 76px;
  }
}

.header-logo {
  padding: 0;
  margin-right: auto;
  margin-bottom: var(--gap-large);

  @media (min-width: 992px) {
    margin-bottom: 0;
  }

  img {
    width: 210px;
  }
}
</style>