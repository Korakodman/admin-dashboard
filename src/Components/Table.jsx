import React, { useRef, useState } from "react";
import OptionDialog from "./OptionDialog";

function Table({ Users, DeleteOption, EditUser, loading }) {
  const FormDialog = useRef();
  const [DialogOption, SetDialogOption] = useState(false);
  const [SelectUser, SetSelectUser] = useState({
    username: "",
    lastname: "",
    role: "",
    password: "",
  });
  const [SelectIndexID, SetSelectIndexID] = useState(null);

  const OpenDialog = (user, _id) => {
    FormDialog.current?.showModal();
    SetSelectUser({
      username: user.username,
      lastname: user.lastname,
      role: user.role,
      password: user.password,
    });
    SetSelectIndexID(_id);
  };

  const CloseDialog = () => {
    FormDialog.current?.close();
  };

  const clickoutside = (e) => {
    if (e.target === FormDialog.current) {
      CloseDialog();
    }
  };

  const FormOption = (e) => {
    e.preventDefault();
    if (DialogOption) {
      DeleteOption(SelectIndexID);
    } else {
      EditUser(SelectUser, SelectIndexID);
    }
    CloseDialog();
  };

  return (
    <div className="p-4 font-serif">
      <table className="md:min-w-full  bg-gray-800 text-white border border-gray-600">
        <thead>
          <tr className="border-b border-gray-600 md:text-lg text-[12px]">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">LastName</th>
            <th className="p-2">Role</th>
            <th className="p-2">Password</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {Users.map((user, index) => (
            <tr
              key={index}
              className="border-b border-gray-600 md:text-lg text-sm"
            >
              <td className="p-2 text-center">{index}</td>
              <td className="p-2">{user.username}</td>
              <td className="p-2">{user.lastname}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2">{user.password}</td>
              <td className="p-2 md:text-center text-nowrap">
                <button
                  className="bg-blue-600 hover:bg-blue-700 md:px-3 md:py-1 rounded px-1 text-white md:text-xl text-xs"
                  onClick={() => {
                    OpenDialog(user, user._id);
                    SetDialogOption(false);
                  }}
                >
                  ดูรายละเอียด
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 md:px-3 md:py-1 md:ml-2 px-1 rounded text-white md:text-xl text-xs"
                  onClick={() => {
                    OpenDialog(user, user._id);
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
      <div className="text-center text-black mt-5 font-bold text-xl">
        {loading && "Loading..."}
      </div>
      <OptionDialog
        ref={FormDialog}
        DialogOption={DialogOption}
        SelectUser={SelectUser}
        SelectIndexID={SelectIndexID}
        CloseDialog={CloseDialog}
        clickoutside={clickoutside}
        FormOption={FormOption}
        SetSelectUser={SetSelectUser}
      />
    </div>
  );
}

export default Table;
