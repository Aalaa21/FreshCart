




export async function getAllOrders() {

    const res = await fetch(`${process.env.API_BASE_URL}/orders`);
    if (!res.ok) {
        throw new Error(`Failed to fetch orders: ${res.statusText}`);
    }
    console.log("Orders response:", res);
    return res.json();

}