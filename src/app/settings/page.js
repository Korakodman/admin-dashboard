"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
// "name": "John Doe",
//         "email": "john@example.com",
//         "age":
export default function Settings() {
  const [user, setuser] = useState([]);
  const Route = useRouter();
  useEffect(() => {
    const loginStatus = localStorage.getItem("isLogin");
    if (loginStatus === "true") {
      Route.push("/settings");
    } else {
      alert("กรุณาเข้าระบบ");
      Route.push("/");
    }
  }, []);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Settings Management</h1>
      <p>นี่คือหน้าเครื่องมือ</p>
    </div>
  );
}
