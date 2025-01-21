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
  width: 100%;
  max-width: var(--width-site-max);
  padding: 0 var(--gap-large);
  margin: 0 auto;
}
</style>
