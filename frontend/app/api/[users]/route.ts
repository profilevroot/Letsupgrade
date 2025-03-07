import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req, context: { params: { users: number } }) {
  const id = context?.params?.users;

  try {
    const roles = await db.permissions.findMany({
      select:{
        id:true,
        actions:{
          select:{
            name:true
          }
        },
        routes:{
          select:{
            name:true,
            path:true
          }
        } 
      },
      where: { role_id: parseInt(id) },
     });
 

     const result = {}
     const routes: string[] = []
     roles?.map((val)=>{
      const action= val?.actions?.name;
      const path= val?.routes?.path;
      result[path]?result[path].push(action):result[path]=[action];
      if(!routes.includes(path)){
        routes.push(path);
      }
    

     })
 


    return NextResponse.json({
      data: {
        routesActions:result,
        routes:routes
      },
      message: "User created successfully",
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Something went wrong!", message: e },
      { status: 400 }
    );
  }

  return await NextResponse.json({ success: "test", data: [] });
}

export async function POST(req: Request) {
  try {
    const { username, email, password, role } = await req.json();
    const existingEmail = await db.user.findUnique({
      where: { email },
    });
    if (existingEmail) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }
    const hashedPassword = await hash(password, 10);
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        role,
      },
    });
    const { password: test, ...rest } = user;
    return NextResponse.json({
      data: rest,
      message: "User created successfully",
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Something went wrong!", message: e },
      { status: 400 }
    );
  }
}
