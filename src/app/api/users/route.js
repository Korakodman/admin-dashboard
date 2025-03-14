import { connectToDatabase } from "@/lib/mongodb";
import Users from "@/app/models/Users";
import Products from "@/app/models/Products";
import { ObjectId } from "mongodb";
export const dynamic = "force-static";
export const revalidate = 60;
import { NextResponse } from "next/server";
// Users
export async function GET(req) {
  await connectToDatabase();
  const users = await Users.find({});
  return Response.json(users, { status: 200 });
}
export async function POST(req) {
  await connectToDatabase();
  const { id, name, lastname, role, password } = await req.json();
  const NewUser = await Users.create({ id, name, lastname, role, password });
  return Response.json(NewUser, { status: 201 });
}
