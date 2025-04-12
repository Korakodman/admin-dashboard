import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Users from "@/app/models/Users";

export async function GET() {
  const res = NextResponse.redirect(
    new URL("/", process.env.Next_PUBLIC_BASE_URL || "http://localhost:3000")
  );
  res.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });
  return res;
}
