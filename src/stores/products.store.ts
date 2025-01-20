import { defineStore } from 'pinia';
import { ProductService } from '@/services/productService';
import { type Product } from '@/types/Product';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as Product[],
    productError: null as string | null,
  }),
  actions: {
    async fetchProducts() {
      const productService = new ProductService();
      try {
        this.products = await productService.getProducts();
        this.productError = null;
      } catch (error: any) {
        this.products = [];
        this.productError = error.message;
      }
    },
  },
});
