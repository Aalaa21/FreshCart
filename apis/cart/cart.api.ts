

import { getToken } from "@/utilities/getTokenFn";
import { cartDataInterface } from "@/interfaces/cart.interface";


export async function getCart():Promise<cartDataInterface>{


   const token= await getToken()

     if(!token){
            throw new Error('User is not authenticated')
        }
try{
    
    const data= await fetch(`${process.env.API_BASE_URL}/cart`,{
  
        headers:{
           token,
            'Content-Type':'application/json'
        }
        })
        const res= await data.json()
        // console.log("Cart data:", res);
        return res
}catch(err){
    console.error("Error fetching cart:", err)
    throw new Error("Failed to fetch cart")
}

}