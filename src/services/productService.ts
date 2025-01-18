
import mockProducts from '@/assets/productMockData.json';
import { type Product } from '@/types/Product';


export class ProductService {
  async getProducts(): Promise<Product[]> {
    // Simulate fetching data from a local JSON file
    const fakeLatency = 500 + Math.random() * 1000;
    return new Promise<Product[]>((resolve) => {
      setTimeout(() => {
        resolve(mockProducts as Product[]);
      }, fakeLatency);
    });
  }
}
