import { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";
import {jwtDecode} from 'jwt-decode'
export const nextAuthConfig: NextAuthOptions={
    providers:[
        credentials({
            name:"Login Credentials",
            credentials:{
                email:{label:"Email",type:"email",placeholder:"Enter your email"},
                password:{label:"Password",type:"password",placeholder:"Enter your password"}
            },
            authorize: async (credentials)=>{

            const data= await fetch(`${process.env.API_BASE_URL}/auth/signin`,{
                method:"POST",
                body: JSON.stringify({
                    email:credentials?.email,
                    password:credentials?.password
                }),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if(!data.ok){
                throw new Error(data.statusText);
            }
               const payload= await data.json();
               const {email,name} = payload.user;
               const tokenData = jwtDecode<{ id: string }>(payload.token)
               const tokeninfo={
                    id:tokenData.id,
                    email,
                    name,
                    token:payload.token
                }
                console.log("Decoded token data:", tokeninfo);
                return {
                    id:tokenData.id,
                    email,
                    name,
                    token:payload.token
                }
            }
        })
    ],
    callbacks:{
        jwt: async ({ token, user }) => {
            if (user) {
                
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.token = user.token;
            }
            return token;
        },

        session: async ({ session, token }) => {
            if (token) {
              session.user.name= token.name!;
              session.user.email= token.email!;
              session.user.id= token.id!;
              
            }
            return session;
        }

    },
    pages:{
        signIn:"/Auth/login"
    }
}