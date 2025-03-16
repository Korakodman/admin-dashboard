import { connectToDatabase } from "@/lib/mongodb";
import Users from "@/app/models/Users";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  try {
    const users = await Users.find({});
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  await connectToDatabase();
  try {
    const body = await req.json();
    console.log("Received Data:", body);
    const lastUser = await Users.findOne().sort({ _id: -1 });
    const newId = lastUser ? lastUser._id + 1 : 1; //

    const newUser = new Users({ ...body, id: newId });
    await newUser.save();

    return NextResponse.json(newUser, { status: 201 }); // ✅ แก้ไขการคืนค่าให้ถูกต้อง
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 }); // ✅ แก้ไข error handling
  }
}
