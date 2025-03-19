import { Geist, Geist_Mono } from "next/font/google";
import MySidebar from "@/Components/Sidebar";
import "@./styles/globals.css";
export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen">
        <MySidebar />
        <main className="flex">{children}</main>
      </body>
    </html>
  );
}
