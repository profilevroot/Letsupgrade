import { db } from "@/lib/db";
import { Session } from "inspector";
// import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

 export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name }  = data;
    const newUser = await db.actions.create({
      data: {
        name,
        status:true,
        createdAt:new Date(),
        createdBy:1, 
        
         org_id:1  
      },
    });
    return NextResponse.json(newUser);
  } catch (error) {
     return NextResponse.json(
      { error: "Error creating user:", message: error },
      { status: 500 }
    ); 
  }
}


export async function GET() {
  try {
    const users = await db.actions.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong!", message: error },
      { status: 500 }
    ); 
  }
}
