import { connectToDatabase } from "@/lib/mongodb";
import Users from "@/app/models/Users";
import Products from "@/app/models/Products";
import { ObjectId } from "mongodb";

import { NextResponse } from "next/server";
// Users
export async function GET(req) {
  await connectToDatabase();
  try {
    const users = await Users.find({}).lean();
    users.forEach((user) => {
      user._id = user._id.toString();
    });
    return Response.json(users, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
export async function POST(req) {
  await connectToDatabase();
  try {
    const { id, name, lastname, role, password } = await req.json();
    const NewUser = await Users.create({ id, name, lastname, role, password });
    return Response.json(NewUser, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
