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
      handleInputFirstName,
      handleInputLastname,
      handleInputPassword,
      handleInputrole,
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
          <form className="p-4 rounded-md" onSubmit={(e) => AddUser(e)}>
            <div className="grid p-2 mb-2">
              <div className="text-2xl mb-2 text-center">
                <h1>Add User</h1>
              </div>
              <input
                placeholder="FirstName"
                onChange={(e) => handleInputFirstName(e)}
                value={AddNewUser.UserName || ""}
                className={style.UserInput}
              />
              <input
                placeholder="LastName"
                onChange={(e) => handleInputLastname(e)}
                value={AddNewUser.LastName || ""}
                className={style.UserInput}
              />
              <input
                placeholder="Password"
                type="password"
                onChange={(e) => handleInputPassword(e)}
                value={AddNewUser.PassWord || ""}
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
