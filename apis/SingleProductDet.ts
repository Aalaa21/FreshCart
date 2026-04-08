import { productInterface, Root } from '@/interfaces/products.interface';

export async function getSingleProduct({id}:{id:string}): Promise<productInterface> {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error('some error');
    const payload = await res.json();
    
    return payload.data;
  } catch (error) {
    throw new Error('Error happened');
  }
}