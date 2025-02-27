import React from "react";
import { forwardRef } from "react";
import style from "./OptionDialog.module.css";
const OptionDialog = forwardRef(
  (
    {
      DialogOption,
      SelectUser,
      SelectIndexID,
      CloseDialog,
      clickoutside,
      FormOption,
    },
    ref
  ) => {
    return (
      <dialog
        className="w-[400px] h-fit rounded-md p-4 border-black bg-gray-200 shadow-md "
        onClick={(e) => clickoutside(e)}
        ref={ref}
      >
        <form onSubmit={(e) => FormOption(e)} className=" p-2">
          <div className=" text-2xl font-bold">
            {DialogOption ? "ลบผู้ใช้งาน" : "แก้ไขชื่อผู้ใช้งาน"}
          </div>
          <div>
            {DialogOption ? (
              "ยืนยันจะลบข้อมูลผู้ใช้?"
            ) : (
              <div className=" grid p-2 mb-2">
                <input
                  className={style.EditUser}
                  placeholder="ชื่อผู้ใช้"
                ></input>
                <input className={style.EditUser} placeholder="นามสกุล"></input>
                <input
                  className={style.EditUser}
                  placeholder="รหัสผ่าน"
                  type="password"
                ></input>
              </div>
            )}
          </div>
          <div className=" flex justify-end font-bold">
            <button
              type="submit"
              className={
                DialogOption
                  ? "mr-2 px-2 py-2 bg-red-500 hover:bg-red-600 rounded-md"
                  : "mr-2 px-2 py-2 bg-blue-500 hover:bg-blue-600 rounded-md "
              }
            >
              {DialogOption ? "Delete" : "Edit"}
            </button>
            <button
              className=" bg-gray-400 px-2 py-2 hover:bg-gray-500 rounded-md text-black"
              onClick={CloseDialog}
              type="button"
            >
              Close
            </button>
          </div>
        </form>
      </dialog>
    );
  }
);

export default OptionDialog;
