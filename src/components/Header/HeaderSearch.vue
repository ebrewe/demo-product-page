<template>
  <div class="header-search">
    <TCInput id="search-input" placeholder="Search" v-model="searchString" >
      <template #icon-before>
        <img :src="SVGSearch" alt="search icon" />
      </template>
      <template #icon-after>
        <TCButton variant="secondary" size="small" @click="clearSearch" aria-label="clear search">&times;</TCButton>
      </template>
    </TCInput>
    <TCButton @click="handleSearch">Search</TCButton>
  </div>
</template>

<script setup lang="ts">
import TCInput from '@/components/Input/TCInput.vue';
import SVGSearch from '@/assets/SVG/search.svg';
import TCButton from '@/components/Button/TCButton.vue';
import { ref, watch } from 'vue';

const emit = defineEmits(['search']);
 
const searchString = ref('');

const clearSearch = () => {
  searchString.value = '';
  emit('search', searchString.value);
}

function handleSearch() {
  emit('search', searchString.value);
}

</script>

<style scoped>
.header-search {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 44px;
  gap: var(--gap-large);
}
</style>