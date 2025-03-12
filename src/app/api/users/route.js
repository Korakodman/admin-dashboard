import { connectToDatabase } from "@/lib/mongodb";
import Users from "@/app/models/Users";
import Products from "@/app/models/Products";
import { ObjectId } from "mongodb";

import { NextResponse } from "next/server";
// Users
export async function GET(req) {
  await connectToDatabase();
  const users = await Users.find({});
  return Response.json(users, { status: 200 });
}
export async function POST(req) {
  await connectToDatabase();
  const { name, lastname, email, password } = await req.json();
  const NewUser = await Users.create({ name, lastname, email, password });
  return Response.json(NewUser, { status: 201 });
}
