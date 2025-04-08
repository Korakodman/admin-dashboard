"use client";
import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { FaHome, FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { AuthContext } from "../app/Context/UseContextHook";
import { useRouter } from "next/navigation";
function MySidebar() {
  const {
    Islogin,
    SetIslogin,
    DataBaseUser,
    currentUser,
    SetcurrentUser,
    SelectUserLogin,
  } = useContext(AuthContext);
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const route = useRouter();

  useEffect(() => {
    if (currentUser) {
      console.log("คุณคือ:", currentUser.username);
    } else {
      console.log("คุณคือใคร");
    }
  }, [currentUser]);

  const SidebarItem = ({ href, icon, text }) => {
    return (
      <Link
        href={href}
        className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-lg md:text-xl text-xs"
      >
        {icon} <span>{text}</span>
      </Link>
    );
  };

  return (
    <aside className="h-screen md:w-64 w-44 bg-gray-900 text-white grid justify-between ">
      <div className="flex flex-col p-4">
        {/* โลโก้ */}
        <h2 className="md:text-xl text-[12px] font-bold mb-6">
          Admin Dashboard
        </h2>

        {/* เมนู */}
        <nav className="flex flex-col gap-4">
          {Islogin ? (
            ""
          ) : (
            <SidebarItem href="/" icon={<FaHome />} text="Dashboard" />
          )}

          <SidebarItem href="/dashboard" icon={<FaHome />} text="Dashboard" />
          <SidebarItem href="/users" icon={<FaUser />} text="Users" />
          <SidebarItem
            href="/settings"
            icon={<IoMdSettings />}
            text="Settings"
          />
        </nav>
      </div>
      {Islogin && currentUser && (
        <div className="p-2 grid font-bold  border h-28 mt-[350px] md:ml-3 text-[12px]  border-white rounded-lg bg-gray-700 md:text-lg">
          <div className="flex items-center gap-2">
            <FaUser /> User: <span>{currentUser.username}</span>
          </div>
          <button
            className="text-black bg-red-300 md:p-2 hover:bg-red-500 rounded-md  "
            onClick={() => {
              if (typeof window !== "undefined") {
                localStorage.removeItem("islogin");
                localStorage.removeItem("currentUser");
                SetIslogin(false);
                SetcurrentUser(null);
                route.push("/");
              }
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
