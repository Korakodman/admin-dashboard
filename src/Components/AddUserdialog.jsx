import React from "react";
import { forwardRef } from "react";
import style from "./AddUserdialog.module.css";
const AddUserdialog = forwardRef(({ clickoutside, Closedialog }, ref) => {
  return (
    <div>
      <dialog
        ref={ref}
        className="w-[400px] h-fit rounded-md p-4 border-black bg-gray-200"
        onClick={clickoutside} // ใช้ฟังก์ชันที่แก้ไขแล้ว
      >
        <form className="p-4 rounded-md">
          <div className="grid p-2 mb-2">
            <div className="text-2xl mb-2 text-center">
              <h1>Add User</h1>
            </div>
            <input placeholder="FirstName" className={style.UserInput} />
            <input placeholder="LastName" className={style.UserInput} />
            <input placeholder="Password" className={style.UserInput} />
            <div className="flex ">
              <input
                type="radio"
                id="Admin"
                name="role"
                value="Admin"
                className="mr-2"
              />
              <label htmlFor="Admin" className="mr-2">
                Admin
              </label>
              <input
                type="radio"
                id="User"
                name="role"
                value="User"
                className="mr-2"
              />
              <label htmlFor="User">User</label>
            </div>
          </div>
          <div>
            <button
              className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-white ml-4"
              type="button"
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
        </form>
      </dialog>
    </div>
  );
});
export default AddUserdialog;
