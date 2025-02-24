import React, { useRef, useState } from "react";

function Table({ Users }) {
  const FormDialog = useRef();
  const [DialogOption, SetDialogOption] = useState();
  const [SelectUser, SetSelectUser] = useState([]);
  const OpenDialog = (user) => {
    FormDialog.current.showModal();
    console.log(user);
    SetSelectUser(user);
  };
  const CloseDialog = () => {
    FormDialog.current.close();
  };
  const clickoutside = (e) => {
    if (e.target === FormDialog.current) {
      CloseDialog();
    }
  };
  const FormOption = (e) => {
    e.preventDefault();
  };
  return (
    <div className="p-4 font-serif">
      <table className="min-w-full bg-gray-800 text-white border border-gray-600">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">LastName</th>
            <th className="p-2">role</th>
            <th className="p-2">Password</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {Users.map((user, index) => (
            <tr key={index} className="border-b border-gray-600">
              <td className="p-2 text-center">{index}</td>
              <td className="p-2">{user.UserName}</td>
              <td className="p-2">{user.LastName}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2">{user.PassWord}</td>
              <td className="p-2 text-center">
                <button
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
                  onClick={() => {
                    OpenDialog(user);
                    SetDialogOption(false);
                  }}
                >
                  ดูรายละเอียด
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 ml-2 rounded text-white"
                  onClick={() => {
                    OpenDialog(user);
                    SetDialogOption(true);
                  }}
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <dialog
          className="w-[400px] h-fit rounded-md p-4 border-black bg-gray-200 shadow-md "
          onClick={(e) => clickoutside(e)}
          ref={FormDialog}
        >
          <form onSubmit={(e) => FormOption(e)}>
            <div>{DialogOption ? "Delete User" : "Edit User"}</div>
            <div>Name{DialogOption ? "" : SelectUser.UserName}</div>
            <div className=" flex justify-end">
              <button
                className=" bg-gray-400 p-2 hover:bg-gray-500 rounded-md"
                onClick={CloseDialog}
              >
                Close
              </button>
            </div>
          </form>
        </dialog>
      </div>
    </div>
  );
}

export default Table;
