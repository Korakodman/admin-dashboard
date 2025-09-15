import { connectToDatabase } from "@/lib/mongodb";
import Users from "@/app/models/Users";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb"; // ✅ นำเข้า ObjectId

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // หรือใส่ URL ที่ต้องการอนุญาต
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// OPTIONS method
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

// DELETE method
export async function DELETE(req, context) {
  await connectToDatabase(process.env.NEXT_PUBLIC_API_URL);
  try {
    const { params } = await context;
    const id = await params.id;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid ID" },
        { status: 400, headers: corsHeaders }
      );
    }

    const deletedUser = await Users.findByIdAndDelete(new ObjectId(id));

    if (!deletedUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json({
      message: "User Deleted Successfully",
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// PUT method
export async function PUT(req, { params }) {
  await connectToDatabase(process.env.NEXT_PUBLIC_API_URL);
  try {
    const _id = params.id; // รับ id จาก params
    const { username, lastname, role, password } = await req.json(); // รับข้อมูลใหม่จาก body ของ request

    if (!ObjectId.isValid(_id)) {
      // ตรวจสอบว่า id เป็นรูปแบบที่ถูกต้องของ ObjectId หรือไม่
      return NextResponse.json(
        { message: "Invalid ID" },
        { status: 400, headers: corsHeaders }
      );
    }

    const updatedUser = await Users.findByIdAndUpdate(
      new ObjectId(_id), // แปลง id จาก string เป็น ObjectId
      { username, lastname, role, password }, // ข้อมูลที่ต้องการอัปเดต
      { new: true } // ส่งค่าใหม่หลังจากการอัปเดต
    );

    if (!updatedUser) {
      // ถ้าไม่พบผู้ใช้
      return NextResponse.json(
        { message: "User not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json({
      message: "Update Successfully",
      user: updatedUser,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("Error updating User:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
