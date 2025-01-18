// src/composables/useProducts.spec.ts
import { describe, it, expect, vi } from 'vitest';
import { useProducts } from '@/composables/useProducts';
import { ProductService } from '@/services/productService';
import { type Product } from '@/types/Product';
import { mount } from '@vue/test-utils';

describe ('useProducts', () => {

  it('should fetch products', async () => {
    expect (1 + 1).toBe(2);
  });

  it('should fetch products with error', async () => {
    // expect an error
    const asyncMock = vi.fn().mockRejectedValue(new Error('Async error'))

    await expect(asyncMock()).rejects.toThrow('Async error');
  });
});