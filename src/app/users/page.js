// app/users/page.js
"use client";
import { useState } from "react";
import Table from "./Table";
export default function Users() {
  const [Users, setUsers] = useState([
    {
      UserName: "Korakod",
      LastName: "Manakuilssara",
      role: "Admin",
      PassWord: "1234",
    },
    {
      UserName: "Sahapham",
      LastName: "Thamma",
      role: "Admin",
      PassWord: "1234",
    },
    {
      UserName: "Passon",
      LastName: "Punna",
      role: "Admin",
      PassWord: "1234",
    },
    {
      UserName: "Rachani",
      LastName: "Paladate",
      role: "User",
      PassWord: "1234",
    },
  ]);
  console.log(Users);
  return (
    <main className=" p-6 bg-gray-100 md:w-[1320px]">
      <div className="text-black font-serif flex">
        <h1 className="md:text-3xl font-bold ">จัดการบัญชีผู้ใช้งาน</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white ml-4"
          onClick={() => alert("เพิ่มผู้ใช้")}
        >
          Add User
        </button>
      </div>

      <Table Users={Users} />
    </main>
  );
}
