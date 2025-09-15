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
export async function GET() {
  const res = NextResponse.redirect(
    new URL("/", process.env.URLMONGODB),{status : 302 , headers:corsHeaders}
  );
  res.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });
  return res;
}
