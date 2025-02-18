// app/users/page.js
"use client";
import { useRef, useState } from "react";
import Table from "../../Components/Table";
export default function Users() {
  const [Users, setUsers] = useState([
    {
      UserName: "Korakod",
      LastName: "Manakuilssara",
      role: "Admin",
      PassWord: "1234",
    },
    {
      UserName: "Sahapham",
      LastName: "Thamma",
      role: "Admin",
      PassWord: "1234",
    },
    {
      UserName: "Passon",
      LastName: "Punna",
      role: "Admin",
      PassWord: "1234",
    },
    {
      UserName: "Rachani",
      LastName: "Paladate",
      role: "User",
      PassWord: "1234",
    },
  ]);
  const dialog = useRef();
  function OpenDialog() {
    dialog.current.show();
  }
  function Closedialog() {
    dialog.current.close();
  }
  function Clickoutside(e) {
    if (e.target === dialog.current) {
      Closedialog();
    }
  }
  console.log(Users);
  return (
    <main className=" p-6 bg-gray-100 md:w-[1320px]">
      <div className="text-black font-serif flex">
        <h1 className="md:text-3xl font-bold ">จัดการบัญชีผู้ใช้งาน</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white ml-4"
          onClick={() => OpenDialog()}
        >
          Add User
        </button>
      </div>
      <dialog
        ref={dialog}
        className=" w-[240px] h-[240px] bg-gray-200 p-2 "
        onClick={(e) => Clickoutside(e)}
      >
        <div>
          <h1>Add User</h1>
        </div>
        <button
          className="bg-slate-600 hover:bg-slate-700 px-3 py-1 rounded text-white ml-4"
          onClick={() => Closedialog()}
        >
          Close
        </button>
      </dialog>
      <Table Users={Users} />
    </main>
  );
}
