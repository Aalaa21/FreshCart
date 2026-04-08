import { productInterface, Root } from '@/interfaces/products.interface';
import { baseUrl } from './baseUrl';

export async function getSingleProduct({id}:{id:string}): Promise<productInterface> {
  try {
    const res = await fetch(`${baseUrl}/products/${id}`);
    if (!res.ok) throw new Error('some error');
    const payload = await res.json();
    
    return payload.data;
  } catch (error) {
    throw new Error('Error happened');
  }
}