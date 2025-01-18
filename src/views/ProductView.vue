<template>
  <div>
    <p v-if="loading">Loading...</p>
    <ul v-if="products.length && !productError">
      <li v-for="product in products" :key="product.id">
        {{ product.product }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import { useProducts } from '@/composables/useProducts';
const {products, productError, fetchProducts} = useProducts();

const loading = ref(true);

onMounted(async () => {
  await fetchProducts();
  loading.value = false;
});
</script>

<style scoped>

</style>