import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Users from "@/app/models/Users";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // หรือใส่ URL ที่ต้องการอนุญาต
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}
export async function POST(req) {
  const { username, password } = await req.json();
  await connectToDatabase(process.env.NEXT_PUBLIC_API_URL);
  const user = await Users.findOne({ username });
  if (!user || user.password !== password) {
    return NextResponse.json(
      { success: false, message: "something Wrong" },
      { status: 401, headers: corsHeaders }
    );
  }
  const res = NextResponse.json({
    success: true,
    user: {
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });

  res.cookies.set("token", "mock-login-token", {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60,
  });
  return res;
}
