"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { FaHome, FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { AuthContext } from "../app/Context/UseContextHook";
import { useRouter } from "next/navigation";
function MySidebar() {
  const { Islogin, SetIslogin } = useContext(AuthContext);
  const route = useRouter();
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
  const UserInterface = ({ name, role }) => {
    return (
      <div className="p-2 grid end font-bold mt-80 border border-white rounded-lg bg-gray-700 text-lg">
        <div className="flex items-center gap-2">
          <FaUser /> Name: {name}
        </div>
        <button
          className="text-black bg-red-300 p-2 hover:bg-red-500 rounded-md "
          onClick={() => {
            localStorage.removeItem("isLogin");
            SetIslogin(false);
            route.push("/");
          }}
        >
          Logout
        </button>
      </div>
    );
  };
  return (
    <aside className="h-screen md:w-64 bg-gray-900 text-white grid justify-between ">
      <div className="flex flex-col p-4">
        {/* โลโก้ */}
        <h2 className="md:text-xl font-bold mb-6">Admin Dashboard</h2>

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
      <div className="px-4">
        {Islogin && <UserInterface name="Korakod" role="Admin" />}
      </div>
    </aside>
  );
}

export default MySidebar;
