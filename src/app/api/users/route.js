import { connectToDatabase } from "@/lib/mongodb";
import Users from "@/app/models/Users";
import { NextResponse } from "next/server";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // หรือใส่ URL ที่ต้องการอนุญาต
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}
export async function GET() {
  await connectToDatabase();
  try {
    const users = await Users.find({});
    return NextResponse.json(users, { status: 200, headers: corsHeaders });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(req) {
  await connectToDatabase();
  try {
    const body = await req.json();
    console.log("Received Data:", body);

    const lastUser = await Users.findOne().sort({ id: -1 });
    const newId = lastUser ? lastUser.id + 1 : 1; //

    const newUser = new Users({ ...body, id: newId });
    await newUser.save();
    return NextResponse.json(newUser, { status: 201, headers: corsHeaders });
  } catch (error) {
    return NextResponse.json(
      { status: 400, headers: corsHeaders },
      console.log(error)
    ); // ✅ แก้ไข error handling
  }
}
