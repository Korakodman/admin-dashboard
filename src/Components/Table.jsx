import React from "react";

function Table({ Users }) {
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
                  onClick={() => alert(`ดูรายละเอียดของ ${user.UserName}`)}
                >
                  ดูรายละเอียด
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 ml-2 rounded text-white"
                  onClick={() => alert(`ลบข้อมูลของ ${user.UserName}`)}
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
