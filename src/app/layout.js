"use client";
import { Geist, Geist_Mono } from "next/font/google";
import MySidebar from "@/Components/Sidebar";
import "./globals.css";
import { useContext, useState } from "react";
import { AuthProvider, AuthContext } from "./Context/UseContextHook";
import { HeroUIProvider } from "@heroui/react";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <HeroUIProvider>
          <AuthProvider>
            <Content>{children}</Content>
          </AuthProvider>
        </HeroUIProvider>
      </body>
    </html>
  );
}
const Content = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div className="flex">
      {isLoggedIn && <MySidebar />}
      {children}
    </div>
  );
};
