


import { baseUrl } from "./baseUrl";


export async function getAllOrders() {

    const res = await fetch(`${baseUrl}/orders`);
    if (!res.ok) {
        throw new Error(`Failed to fetch orders: ${res.statusText}`);
    }
    console.log("Orders response:", res);
    return res.json();

}