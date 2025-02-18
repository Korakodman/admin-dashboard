import React from "react";
import Link from "next/link";
import { FaHome, FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

function MySidebar() {
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
    <aside>
      <div className="h-screen md:w-64 bg-gray-900 text-white flex flex-col p-4">
        {/* โลโก้ */}
        <h2 className="md:text-xl font-bold mb-6">Admin Dashboard</h2>

        {/* เมนู */}
        <nav className="flex flex-col gap-4">
          <SidebarItem href="/" icon={<FaHome />} text="Dashboard" />
          <SidebarItem href="/users" icon={<FaUser />} text="Users" />
          <SidebarItem
            href="/settings"
            icon={<IoMdSettings />}
            text="Settings"
          />
        </nav>
      </div>
    </aside>
  );
}

export default MySidebar;
