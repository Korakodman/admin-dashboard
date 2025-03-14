import { connectToDatabase } from "@/lib/mongodb";
import Users from "@/app/models/Users";
import { NextResponse } from "next/server";
// DELETE function สำหรับลบ User ตาม id
export async function DELETE(req, { params }) {
  await connectToDatabase();

  try {
    // ดึง id จาก params โดยไม่ต้อง await
    const { id } = await params;
    // ลบ user ออกจากฐานข้อมูล
    await Users.deleteOne({ id: id });
    return NextResponse.json({ message: "User Deleted Successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  await connectToDatabase();
  try {
    const { name, lastname, role, password } = await req.json();
    const { id } = await params;
    const users = await Users.findOne({ id: String(id) });
    users.name = name;
    users.lastname = lastname;
    users.role = role;
    users.password = password;
    await users.save();
    return NextResponse.json({ message: "Update Successfully" } || users);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
