
'use server'

import { getToken } from "@/utilities/getTokenFn";



export async function deleteFromCart(productId:string){


   const token= await getToken()

     if(!token){
            throw new Error('User is not authenticated')
        }
try{
    
    const data= await fetch(`${process.env.API_BASE_URL}/cart/${productId}`,{
        method:'DELETE',
        headers:{
           token,
            'Content-Type':'application/json'
        }
        })

       
        const res= await data.json()
        return res
}catch(err){
    console.error("Error deleting from cart:", err)
    throw new Error("Failed to delete product from cart")
}

}