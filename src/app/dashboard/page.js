"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../Context/UseContextHook";

const Dashboard = () => {
  const {
    Islogin,
    SetIslogin,
    DataBaseUser,
    currentUser,
    SetcurrentUser,
    SelectUserLogin,
  } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    const loginStatus = localStorage.getItem("islogin");
    const savedUser = localStorage.getItem("currentUser");
    if (loginStatus === "true" && savedUser) {
      SetIslogin(true);
      SetcurrentUser(JSON.parse(savedUser));
    } else {
      router.push("/");
    }
  }, []);
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};
export default Dashboard;
