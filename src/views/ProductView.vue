<template>
  <div>
    <p v-if="loading">Loading...</p>
    <ProductTable v-else :products="products" :total-products="products.length" :search-query="getQuery"/>
  </div>
</template>

<script setup lang="ts">
import {ref,  onMounted} from 'vue';
import { storeToRefs } from 'pinia';
import { useProductStore } from '@/stores/products.store';
import ProductTable from '@/components/ProductTable/ProductTable.vue';
import { useSearchStore } from '@/stores/search.store';

const productStore = useProductStore();
const searchStore = useSearchStore();

const {products, productError} = storeToRefs(productStore);
const { getQuery } = storeToRefs(searchStore);

const loading = ref(true);

onMounted(async () => {
  await productStore.fetchProducts();
  loading.value = false;
});
</script>

<style scoped>

</style>