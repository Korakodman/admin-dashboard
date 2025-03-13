import React from "react";
import { forwardRef } from "react";
import style from "./AddUserdialog.module.css";
const AddUserdialog = forwardRef(
  (
    {
      clickoutside,
      Closedialog,
      AddNewUser,
      msgeEror,
      error,
      handleInputChange,
      radioCheck,
      AddUser,
    },
    ref
  ) => {
    return (
      <div>
        <dialog
          ref={ref}
          className="w-[400px] h-fit rounded-md p-4 border-black bg-gray-200 shadow-md"
          onClick={clickoutside} // ใช้ฟังก์ชันที่แก้ไขแล้ว
        >
          <form
            className="p-4 rounded-md"
            onSubmit={(e) => AddUser(e)}
            method="POST"
            action={"http://localhost:3000/api/users"}
          >
            <div className="grid p-2 mb-2">
              <div className="text-2xl mb-2 text-center">
                <h1>Add User</h1>
              </div>
              <input
                name="name"
                placeholder="FirstName"
                onChange={handleInputChange}
                value={AddNewUser.name || ""}
                className={style.UserInput}
              />
              <input
                name="lastname"
                placeholder="LastName"
                onChange={handleInputChange}
                value={AddNewUser.lastname || ""}
                className={style.UserInput}
              />
              <input
                name="password"
                placeholder="Password"
                type="password"
                onChange={handleInputChange}
                value={AddNewUser.password || ""}
                className={style.UserInput}
              />
              <div className="flex ">
                <input
                  type="radio"
                  id="Admin"
                  value="Admin"
                  name="role"
                  className="mr-2"
                  checked={radioCheck === "Admin"}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  checked={radioCheck === "User"}
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
            <div className=" text-red-500 mt-2 ml-4 font-bold text-xl">
              {error ? <span>{msgeEror}</span> : ""}
            </div>
          </form>
        </dialog>
      </div>
    );
  }
);
export default AddUserdialog;
