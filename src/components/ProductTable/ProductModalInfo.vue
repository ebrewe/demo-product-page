<template>
  <div class="product-info">
      <div class="product-image">
        <img :src="productImage" :alt="product.product" />
      </div>
      <div class="features">
        <h3>Key Features</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur maxime aliquam dicta quaerat eius suscipit ullam consequatur, modi illo, veritatis esse aspernatur dignissimos nisi neque iste a? Quibusdam, iusto beatae.</p>
      </div>
  </div>
</template>

<script setup lang="ts">
import { type Product } from '@/types/Product';
import { computed, toRef } from 'vue';
import NoImageImage from '@/assets/images/noImage.jpeg';

const props = defineProps({
  product: {
    type: Object as () => Product,
    required: true,
  },
});

const product = toRef(props, 'product');

const productImage = computed(() => {
  return product.value.image || NoImageImage;
});
</script>

<style scoped>
.product-info {
  display:grid;
  grid-template-columns: 1fr;
  gap: var(--gap-large);
  width: 100%;

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
}

.product-image {
  display:flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  justify-self: center;

  img {
    width: 100%;
  }
}

.key-features {
  display: flex;
  flex-direction: column;
  gap: var(--gap-large);
  width: 100%;

  @media (min-width: 992px) {
    width: 50%;
  }
}
</style>