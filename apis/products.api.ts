import { Root } from '@/interfaces/products.interface';
import { baseUrl } from './baseUrl';

export async function getProducts(): Promise<Root> {
  try {
    const res = await fetch(`${baseUrl}/products`);
     if (!res.ok) {
    const errorBody = await res.text(); // optional: capture server’s error message
    throw new Error(
      `getProducts failed: ${res.status} ${res.statusText} - ${errorBody}`
    );
  }

    const payload: Root = await res.json();
    return payload;
  } catch (error) {
  console.error('getProducts error:', error);
  throw error; // keep the original error
}

}