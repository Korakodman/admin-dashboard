import { connectToDatabase } from "@/lib/mongodb";
import Users from "@/app/models/Users";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
// DELETE function สำหรับลบ User ตาม id
export async function DELETE(req, { params }) {
  await connectToDatabase();

  try {
    // ดึง id จาก params โดยไม่ต้อง await
    const { id } = await params;

    // // ตรวจสอบว่า id เป็น ObjectId ที่ถูกต้องหรือไม่
    // if (!id || !ObjectId.isValid(id)) {
    //   return NextResponse.json(
    //     { message: "Invalid or Missing ID" },
    //     { status: 400 }
    //   );
    // }

    // ค้นหา user ตาม _id
    // const user = await Users.findOne({ _id: new ObjectId(id) });

    // if (!user) {
    //   return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    // }

    // ลบ user ออกจากฐานข้อมูล
    await Users.deleteOne({ id: id });

    return NextResponse.json({ message: "User Deleted Successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
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
    console.log("Error update User", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
