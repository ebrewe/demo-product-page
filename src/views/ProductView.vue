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
import {ref,  onMounted} from 'vue';
import { storeToRefs } from 'pinia';
import { useProductStore } from '@/stores/products.store';

const productStore = useProductStore();
const {products, productError} = storeToRefs(productStore);

const loading = ref(true);

onMounted(async () => {
  await productStore.fetchProducts();
  loading.value = false;
});
</script>

<style scoped>

</style>