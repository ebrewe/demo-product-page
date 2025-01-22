<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainHeader from '@/components/Header/Header.vue'
import SkipLink from './components/SkipLink/SkipLink.vue';
</script>

<template>
  <SkipLink />
  <div class="page">
    <MainHeader />
    <main id="main">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.page {
  width: calc(100vw - var(--gap-site-small) * 2);
  padding: 0 var(--gap-site-small) 0;
  /* minimum between 100vh and 100% of the viewport */
  max-width: var(--width-site-max);
  margin: 0 auto;
  min-width: calc(291px + var(--gap-site-small) * 2);

  @media(min-width: 768px) {
    width: calc(100vw - var(--gap-site) * 2);
    padding: 0 var(--gap-site) 100px;
  }
}
</style>
