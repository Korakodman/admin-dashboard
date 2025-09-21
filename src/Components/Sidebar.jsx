"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { FaHome, FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { TbLogout } from "react-icons/tb";

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
  const route = useRouter();
  const [isAdmin, SetisAdmin] = useState(false);
  useEffect(() => {
   const mock = localStorage.getItem("currentUser");
   const changeobj = JSON.parse(mock)
   SetcurrentUser(changeobj)
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
        
        <div className="  h-fit p-2 rounded-md mt-[450px] flex justify-center">
          <div
          className={` border-white rounded-md bg-gray-700 p-2 grid w-[200px] ${
            open ? "" : "hidden"
          }`}
        >
          <div className="flex items-center gap-2 mr-2 mb-2">
            <FaUser /> User: <span className="w-10">{currentUser.username}</span>
          </div>
          <button
            className="text-black bg-red-300 md:p-2 hover:bg-red-500 rounded-md"
            onClick={async () => {
              localStorage.removeItem("islogin");
              localStorage.removeItem("currentUser");
              SetisLoggedIn(false);
            
              await fetch(`/api/logout`, { method: "GET" });
              route.push("/");
            }}
          >
            Logout
          </button>
        </div>
        <div
          className={` border-white rounded-md bg-gray-700 p-2 grid  ${open ? "hidden" : " mt-[180px]"} `}
        >
          <div className={`flex items-center gap-2 ${open ? "" : "hidden"} `}>
            <FaUser /> User: <span>{currentUser.username}</span>
          </div>
          <button
            className="text-black bg-red-300 md:p-2 hover:bg-red-500 rounded-md "
            onClick={async () => {
              localStorage.removeItem("islogin");
              localStorage.removeItem("currentUser");
              SetisLoggedIn(false);
            
              await fetch(`/api/logout`, { method: "GET" });
              route.push("/");
            }}
          >
           <TbLogout />

          </button>
        </div>
        </div>
     
     )}
    </aside>
  );
}

export default MySidebar;
