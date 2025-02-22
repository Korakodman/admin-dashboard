// app/users/page.js
"use client";
import { useRef, useState } from "react";
import Table from "../../Components/Table";
import AddUserdialog from "@/Components/AddUserdialog";
export default function Users() {
  const [error, Seterror] = useState(false);
  const [Users, setUsers] = useState([]);
  const [AddNewUser, setAddNewUser] = useState({
    UserName: "",
    LastName: "",
    role: "",
    PassWord: "",
  });
  const dialog = useRef();
  function OpenDialog() {
    if (dialog.current) {
      dialog.current.showModal();
    }
  }
  function Closedialog() {
    dialog.current.close();
  }
  const clickoutside = (e) => {
    if (e.target === dialog.current) {
      Closedialog();
    }
  };
  const AddUser = (e) => {
    e.preventDefault();
    console.log(AddNewUser);
    setUsers((prevNewUser) => [...prevNewUser, AddNewUser]);
    setAddNewUser({ UserName: "", LastName: "", role: "", PassWord: "" });
    Closedialog();
  };
  const handleInputFirstName = (e) => {
    setAddNewUser({
      ...AddNewUser,
      UserName: e.target.value,
    });
  };
  const handleInputLastname = (e) => {
    setAddNewUser({
      ...AddNewUser,
      LastName: e.target.value,
    });
  };
  const handleInputPassword = (e) => {
    setAddNewUser({
      ...AddNewUser,
      PassWord: e.target.value,
    });
  };
  const handleInputrole = (e) => {
    setAddNewUser({
      ...AddNewUser,
      role: e.target.value,
    });
  };
  // console.log(Users);
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
      {/* <AddUserdialog
        ref={dialog}
        Closedialog={Closedialog}
        clickoutside={clickoutside}
      /> */}
      <dialog
        ref={dialog}
        className="w-[400px] h-fit rounded-md p-4 border-black bg-gray-200"
        onClick={clickoutside} // ใช้ฟังก์ชันที่แก้ไขแล้ว
      >
        <form className="p-4 rounded-md" onSubmit={(e) => AddUser(e)}>
          <div className="grid p-2 mb-2">
            <div className="text-2xl mb-2 text-center">
              <h1>Add User</h1>
            </div>
            <input
              placeholder="FirstName"
              onChange={(e) => handleInputFirstName(e)}
              value={AddNewUser.UserName}
            />
            <input
              placeholder="LastName"
              onChange={(e) => handleInputLastname(e)}
              value={AddNewUser.LastName}
            />
            <input
              placeholder="Password"
              type="password"
              onChange={(e) => handleInputPassword(e)}
              value={AddNewUser.PassWord}
            />
            <div className="flex ">
              <input
                type="radio"
                id="Admin"
                value="Admin"
                name="role"
                className="mr-2"
                onChange={handleInputrole}
              />
              <label htmlFor="Admin" className="mr-2">
                Admin
              </label>
              <input
                type="radio"
                id="User"
                value="User"
                name="role"
                className="mr-2"
                onChange={handleInputrole}
              />
              <label htmlFor="User">User</label>
            </div>
          </div>
          <div>
            <button
              className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-white ml-4"
              type="submit"
            >
              Add New User
            </button>
            <button
              className="bg-slate-600 hover:bg-slate-700 px-3 py-2 rounded text-white ml-4"
              type="button"
              onClick={Closedialog}
            >
              Close
            </button>
          </div>
          <div>{error ? "Please Insert all" : ""}</div>
        </form>
      </dialog>

      <Table Users={Users} />
    </main>
  );
}
