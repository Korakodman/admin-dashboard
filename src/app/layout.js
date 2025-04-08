"use client";
import { Geist, Geist_Mono } from "next/font/google";
import MySidebar from "@/Components/Sidebar";
import "./globals.css";
import { useContext, useState } from "react";
import { AuthProvider, AuthContext } from "./Context/UseContextHook";
export default function Layout({ children }) {
  return (
    <html lang="en" class="dark">
      <body>
        <AuthProvider>
          <Content>{children}</Content>
        </AuthProvider>
      </body>
    </html>
  );
}
const Content = ({ children }) => {
  const { Islogin, DataBaseUser } = useContext(AuthContext);

  return (
    <div className="flex">
      {Islogin && <MySidebar />}
      {children}
    </div>
  );
};
