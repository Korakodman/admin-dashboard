"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { FaHome, FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";

import { AuthContext } from "../app/Context/UseContextHook";
import { useRouter } from "next/navigation";
function MySidebar() {
  const {
    isLoggedIn,
    SetisLoggedIn,
    DataBaseUser,
    currentUser,
    SetcurrentUser,
    SelectUserLogin,
  } = useContext(AuthContext);
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const route = useRouter();
  const [isAdmin, SetisAdmin] = useState(false);
  useEffect(() => {
    if (!currentUser) {
      const savedUser = localStorage.getItem("currentUser");
      if (savedUser) {
        try {
          // ตรวจสอบว่า savedUser เป็น JSON ที่สามารถ parse ได้
          SetcurrentUser(JSON.parse(savedUser));
        } catch (error) {
          console.error("Error parsing savedUser:", error); // หาก parsing ผิดพลาด จะแสดง error
        }
      }
    }
  }, []);

  const SidebarItem = ({ href, icon, text }) => {
    return (
      <Link
        href={href}
        className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-lg md:text-xl text-xs"
      >
        {icon} <span className={open ? "" : "hidden"}>{text}</span>
      </Link>
    );
  };

  const [open, Setopen] = useState(true);

  return (
    <aside
      className={
        open
          ? "h-screen md:w-64 w-44 bg-gray-900 text-white grid justify-between "
          : "h-screen md:w-20 w-20 bg-gray-900 text-white grid justify-between"
      }
    >
      <div className="flex flex-col p-4">
        {/* โลโก้ */}
        <RxHamburgerMenu
          className=" w-[35px] h-[40px] hover:cursor-pointer"
          onClick={() => Setopen(!open)}
        />

        <h2
          className={
            open ? "md:text-xl text-[12px] font-bold mb-6 mt-2" : "hidden"
          }
        >
          Admin Dashboard
        </h2>

        {/* เมนู */}
        <nav className="flex flex-col gap-4 mt-2">
          {isLoggedIn ? (
            ""
          ) : (
            <SidebarItem href="/" icon={<FaHome />} text="Dashboard" />
          )}

          <SidebarItem href="/dashboard" icon={<FaHome />} text="Dashboard" />
          {currentUser.role === "Admin" && (
            <SidebarItem href="/users" icon={<FaUser />} text="Users" />
          )}
          <SidebarItem
            href="/settings"
            icon={<IoMdSettings />}
            text="Settings"
          />
        </nav>
      </div>
      {isLoggedIn && currentUser && (
        <div
          className={`p-2 grid font-bold border h-28 mt-auto md:ml-3 text-[12px] border-white rounded-lg bg-gray-700 md:text-lg ${
            open ? "" : "hidden"
          }`}
        >
          <div className="flex items-center gap-2">
            <FaUser /> User: <span>{currentUser.username}</span>
          </div>
          <button
            className="text-black bg-red-300 md:p-2 hover:bg-red-500 rounded-md"
            onClick={async () => {
              localStorage.removeItem("islogin");
              localStorage.removeItem("currentUser");
              SetisLoggedIn(false);
              SetcurrentUser(null);
              await fetch(`${apiurl}/api/logout`, { method: "GET" });
              route.push("/");
            }}
          >
            Logout
          </button>
        </div>
      )}
    </aside>
  );
}

export default MySidebar;
