import { connectToDatabase } from "@/lib/mongodb";
import Users from "@/app/models/Users";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
// DELETE function สำหรับลบ User ตาม id
export async function DELETE(req, { params }) {
  await connectToDatabase();
  try {
    // ✅ ดึง id จาก params
    const { id } = params; // ไม่ต้องใช้ await

    // ✅ ใช้ _id ใน MongoDB ต้องใช้ `new ObjectId(id)`
    const deletedUser = await Users.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User Deleted Successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PUT function สำหรับอัปเดต User ตาม id
export async function PUT(req, { params }) {
  await connectToDatabase();
  try {
    const { name, lastname, role, password } = await req.json();
    const { id } = params;

    // ✅ ใช้ `findByIdAndUpdate` แทน `findOne` และ `save`
    const updatedUser = await Users.findByIdAndUpdate(
      id,
      { name, lastname, role, password },
      { new: true } // คืนค่าที่อัปเดตแล้ว
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Update Successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating User:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
