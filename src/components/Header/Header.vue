<template>
  <header>
    <div class="header-logo">
      <img :src="LogoImg" alt="Storm logo" />
    </div>
    <HeaderSearch v-if="authPassed" @search="handleSearch"/>
    <HeaderMenu v-if="authPassed"/>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue';
import HeaderSearch from './HeaderSearch.vue';
import HeaderMenu from './HeaderMenu.vue';
import LogoImg from '@/assets/PNG/Logo.png';
import { useSearchStore } from '@/stores/search.store';

const searchStore = useSearchStore();

const route = useRoute();
const authPassed = computed(() => route.meta.requiresAuth);

const searchString = ref('');

const handleSearch = (search: string) => {
  searchString.value = search;

  searchStore.setQuery(search);
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  position: relative;

  margin: 40px 0 23px; // so, so lame

  // tablet
  @media (min-width: 768px) {
    flex-direction: column;
    margin: 40px 0 18px;
  }

  @media (min-width: 992px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 80px 0 76px;
  }
}

.header-logo {
  padding: 0;
  margin-right: auto;
  margin-left: 19px; // ...
  margin-bottom: var(--gap-large);

  @media (min-width: 768px) {
    margin-left: 1px;
    margin-bottom: 0;
    
  }

  @media (min-width: 992px) {
    margin-left: 0;
    margin-bottom: 0;
  }

  img {
    width: 210px;
  }
}
</style>