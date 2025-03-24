"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
const Dashboard = () => {
  const Route = useRouter();
  useEffect(() => {
    const loginStatus = localStorage.getItem("isLogin");
    if (loginStatus === "true") {
      Route.push("/dashboard");
    } else {
      alert("กรุณาเข้าระบบ");
      Route.push("/");
    }
  }, []);
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};
export default Dashboard;
