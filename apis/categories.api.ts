import { baseUrl } from './baseUrl';
export interface categoryInterface{
    _id:string,
    name:string,
    image:string
}
export async function getAllCategories(): Promise<categoryInterface[]> {
  try {
    const res = await fetch(`${baseUrl}/categories`);
    if (!res.ok) throw new Error('some error');
    const payload = await res.json();
    
    return payload.data;
  } catch (error: any) {
   
    console.error("Failed to fetch categories:", error);

    throw new Error(`Failed to fetch categories: ${error.message}`);

  
  }

}