
'use server'

import { baseUrl } from "@/apis/baseUrl";
import { getToken } from "@/utilities/getTokenFn";



export async function addToCart(productId:string){


   const token= await getToken()

     if(!token){
            throw new Error('User is not authenticated')
        }
try{
    
    const data= await fetch(`${baseUrl}/cart`,{
        method:'POST',
        body:JSON.stringify({
            productId:productId
        }),


        headers:{
           token,
            'Content-Type':'application/json'
        }
        })
        const res= await data.json()
        return res
}catch(err){
    console.error("Error adding to cart:", err)
    throw new Error("Failed to add product to cart")
}

}