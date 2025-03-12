"use client";
import React, { useEffect } from "react";
import { useState } from "react";
// "name": "John Doe",
//         "email": "john@example.com",
//         "age":
export default function Settings() {
  const [user, setuser] = useState([]);

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setuser(data.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Settings Management</h1>
      <p>นี่คือหน้าเครื่องมือ</p>
      {user.map((u, index) => {
        return (
          <div key={index}>
            {u.name}
            {u.email}
            {u.age}
          </div>
        );
      })}
    </div>
  );
}
