
'use server'


import { baseUrl } from "@/apis/baseUrl";
import { LoginSchemaType } from '../schema/loginSchema';
import { cookies } from "next/headers";

export async function LoginFormAction(formData: LoginSchemaType){
    const data= await fetch(`${baseUrl}/auth/signin`,{
        method:"POST",
        body: JSON.stringify(formData),
        headers:{
            "Content-Type":"application/json"
        }
        })
        if(!data.ok){
            throw new Error(data.statusText);
        }
       const payload= await data.json();
       const cookie= await cookies();
       cookie.set('token',payload?.token,{
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires in 7 days
        httpOnly: true,
       })
       return data.ok;
}