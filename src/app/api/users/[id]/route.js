import { connectToDatabase } from "@/lib/mongodb";
import Users from "@/app/models/Users";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb"; // ✅ นำเข้า ObjectId

// DELETE function สำหรับลบ User ตาม _id
export async function DELETE(req, context) {
  await connectToDatabase();
  try {
    const { params } = context; // ✅ ใช้ context เพื่อเข้าถึง params
    const id = params.id; // ✅ ต้องใช้ await

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const deletedUser = await Users.findByIdAndDelete(new ObjectId(id));

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

export async function PUT(req, { params }) {
  await connectToDatabase();
  try {
    const _id = params.id; // รับ id จาก params
    const { name, lastname, role, password } = await req.json(); // รับข้อมูลใหม่จาก body ของ request

    if (!ObjectId.isValid(_id)) {
      // ตรวจสอบว่า id เป็นรูปแบบที่ถูกต้องของ ObjectId หรือไม่
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const updatedUser = await Users.findByIdAndUpdate(
      new ObjectId(_id), // แปลง id จาก string เป็น ObjectId
      { name, lastname, role, password }, // ข้อมูลที่ต้องการอัปเดต
      { new: true } // ส่งค่าใหม่หลังจากการอัปเดต
    );

    if (!updatedUser) {
      // ถ้าไม่พบผู้ใช้
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Update Successfully",
      user: updatedUser, // ส่งข้อมูลผู้ใช้ที่อัปเดตกลับ
    });
  } catch (error) {
    console.error("Error updating User:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
