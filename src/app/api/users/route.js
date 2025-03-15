import { connectToDatabase } from "@/lib/mongodb";
import Users from "@/app/models/Users";

// Users
export async function GET(req) {
  await connectToDatabase();
  const users = await Users.find({});
  return Response.json(users, { status: 200 });
}
export async function POST(req) {
  await connectToDatabase();
  const { name, lastname, role, password } = await req.json();

  // หา id สูงสุดและเพิ่มค่าใหม่
  const lastUser = await Users.findOne().sort({ id: -1 });
  const newId = lastUser ? lastUser.id + 1 : 1;

  const NewUser = await Users.create({
    id: newId,
    name,
    lastname,
    role,
    password,
  });

  return Response.json(NewUser, { status: 201 });
}
