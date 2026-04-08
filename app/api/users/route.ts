import { NextRequest, NextResponse } from "next/server";



export function GET(req:NextRequest){
    const users=[
        {
            id:1,
            name:"John Doe",
            
        },
        {
            id:2,
            name:"Jane Smith",
            
        }
    ]
     return NextResponse.json({ users }, { status: 200 });

}