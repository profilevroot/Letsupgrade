import { db } from "@/lib/db";
import { hash } from "bcrypt"; 
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const users = await db.users.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong!", message: error },
      { status: 500 }
    ); 
  }
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
