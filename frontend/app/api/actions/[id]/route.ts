import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { spawn } from "child_process";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // Execute the Python script
  const pythonProcess = spawn("python", [
    "app/api/user/script.py",
    "sum_of_digits",
  ]);
  // console.log(pythonProcess);

  // Handle standard output from the Python script
  let result = 0;

  await pythonProcess.stdout.on("data", (data) => {
    console.log(`stdouts: ${data}`);
    result = data;
    //return NextResponse.json({ success: "test", output: data.toString() });
  });

  // Handle error output from the Python script
  await pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
    return NextResponse.json({ error: data.toString() });
  });

  // Handle the close event of the Python process
  await pythonProcess.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });

  return await NextResponse.json({ success: "test", data: result });
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
