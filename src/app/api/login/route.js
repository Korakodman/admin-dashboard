import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Users from "@/app/models/Users";
export async function POST(req) {
  const { username, password } = await req.json();
  await connectToDatabase();
  const user = await Users.findOne({ username });
  console.log(username, password);
  if (!user || user.password !== password) {
    return NextResponse.json(
      { success: false, message: "something Wrong" },
      { status: 401 }
    );
  }
  const res = NextResponse.json({ success: true });
  res.cookies.set("token", "mock-login-token", {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60,
  });
  return res;
}
