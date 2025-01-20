<template>
  <div class="header-search">
    <TCInput id="search-input" placeholder="Search" v-model="searchString" >
      <template #icon-before>
        <img :src="SVGSearch" alt="search icon" />
      </template>
    </TCInput>
    <TCButton @click="searchString = ''">Search</TCButton>
  </div>
</template>

<script setup lang="ts">
import TCInput from '@/components/Input/TCInput.vue';
import SVGSearch from '@/assets/SVG/search.svg';
import TCButton from '@/components/Button/TCButton.vue';
import { ref } from 'vue';
 
const searchString = ref('');
</script>

<style scoped>
.header-search {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-large);
}
</style>