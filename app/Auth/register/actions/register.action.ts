'use server'


import { baseUrl } from "@/apis/baseUrl";
import { RegisterSchemaType } from "../schema/register.schema";


export async function registerFormAction(formData: RegisterSchemaType){
    const data= await fetch(`${baseUrl}/auth/signup`,{
        method:"POST",
        body: JSON.stringify(formData),
        headers:{
            "Content-Type":"application/json"
        }
        })
        if(!data.ok){
            throw new Error(data.statusText);
        }
       
       return data.ok;
}