'use server'



import { RegisterSchemaType } from "../schema/register.schema";


export async function registerFormAction(formData: RegisterSchemaType){
    const data= await fetch(`${process.env.API_BASE_URL}/auth/signup`,{
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