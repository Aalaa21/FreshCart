import { cookies } from 'next/headers'
import { decode } from "next-auth/jwt"


export async function getToken()
{

 
    const cookie= await cookies()
    const nextAuthCookie=cookie.get('next-auth.session-token')?.value
    
    const decodedCookie= await decode({
        token:nextAuthCookie as string,
        secret:process.env.NEXTAUTH_SECRET as string
    })
  
   return decodedCookie?.token
}