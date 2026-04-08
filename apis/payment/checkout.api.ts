'use server'

import { getToken } from "@/utilities/getTokenFn";



interface shippingAddressInterface{
    details: string,
    phone: number,
    city: string,

}


export async function onlinePayment(cartId: string, shippingAddress: shippingAddressInterface): Promise<any>{
const token= await getToken()
 if(!token){
            throw new Error('User is not authenticated')
        }
   
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`,{
        method: 'POST',
        body: JSON.stringify({cartId, shippingAddress}),
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    })
    if(!res){
        throw new Error('Failed to create checkout session')
    }
   const data = await res.json()
    return data
}