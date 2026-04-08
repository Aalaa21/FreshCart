import { Root } from '@/interfaces/products.interface';


export async function getProducts(): Promise<Root> {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/products`);
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