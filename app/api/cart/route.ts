

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";




export async function GET(req:NextRequest){
    const token= await getToken({req})
    console.log('token in route handler:', token)
    if(!token){
        return NextResponse.json({error:'User is not authenticated'},{status:401})
    }

    const data= await fetch(`${process.env.API_BASE_URL}/cart`,{
      
            headers:{
               token:token.token,
                'Content-Type':'application/json'
            }
            })
            const res= await data.json()
            console.log("Cart data from handler:", res);
            if(!data.ok){
                return NextResponse.json({error:data.statusText},{status:data.status})
            }
            return NextResponse.json(res)

        }