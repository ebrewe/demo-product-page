// src/composables/useProducts.ts
import { ProductService } from '@/services/productService';
import { ref } from 'vue';
import { type Product } from '@/types/Product';

export function useProducts() {
  const products = ref<Product[]>([]);
  const productError = ref<string | null>(null);

  const productService = new ProductService();

  const fetchProducts = async () => {
    try {
      products.value = await productService.getProducts();
      productError.value = null;
    } catch (error: any) {
      products.value = [];
      productError.value = error.message;
    }
  };


  return {
    products,
    productError,
    fetchProducts,
  };
}
