// app/users/page.js
"use client";
import { useRef, useState } from "react";
import Table from "../../Components/Table";
import AddUserdialog from "@/Components/AddUserdialog";
export default function Users() {
  const [error, Seterror] = useState(false);
  const [msgeEror, SetmsgeError] = useState();
  const [Users, setUsers] = useState([
    {
      UserName: "Korakod",
      LastName: "Manakuilssara",
      role: "Admin",
      PassWord: "123456789",
    },
    {
      UserName: "Sahapham",
      LastName: "thamma",
      role: "Admin",
      PassWord: "123456789",
    },
    {
      UserName: "Pusson",
      LastName: "panna",
      role: "Admin",
      PassWord: "123456789",
    },
    {
      UserName: "Rachani",
      LastName: "paradate",
      role: "User",
      PassWord: "123456789",
    },
  ]);
  const [radioCheck, SetradioCheck] = useState("");
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
    setAddNewUser({
      UserName: "",
      LastName: "",
      role: "",
      PassWord: "",
    });
    SetradioCheck("");
    dialog.current.close();
  }
  const clickoutside = (e) => {
    if (e.target === dialog.current) {
      setAddNewUser({
        UserName: "",
        LastName: "",
        role: "",
        PassWord: "",
      });
      SetradioCheck("");
      Closedialog();
    }
  };
  const AddUser = (e) => {
    e.preventDefault();

    if (AddNewUser.UserName == "") {
      SetmsgeError("ใส่ชื่อด้วยครับ");
      Seterror(true);
    } else if (AddNewUser.LastName == "") {
      SetmsgeError("ใส่นามสกุลด้วยครับ");
      Seterror(true);
    } else if (AddNewUser.PassWord == "") {
      SetmsgeError("ใส่รหัสด้วยครับ");
      Seterror(true);
    } else if (AddNewUser.role == "") {
      SetmsgeError("ใส่ยศด้วยครับ");
      Seterror(true);
    } else {
      setUsers((prevNewUser) => [...prevNewUser, AddNewUser]);
      setAddNewUser({
        UserName: "",
        LastName: "",
        role: "",
        PassWord: "",
      });
      SetradioCheck("");
      Seterror(false);
      Closedialog();
    }
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
    SetradioCheck(e.target.value);
  };
  // console.log(Users);
  const DeleteOption = (id) => {
    console.log(id);
    setUsers((prev) => prev.filter((task, index) => index !== id));
  };
  const EditUser = (user, index) => {
    if (!user) {
      return;
    } else {
      const NewUser = user;
      setUsers((prev) =>
        prev.map((item, i) => {
          if (i === index) {
            return {
              UserName: NewUser.UserName,
              LastName: NewUser.LastName,
              role: NewUser.role,
              PassWord: NewUser.PassWord,
            };
          }
          return item;
        })
      );
    }
  };
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
      <AddUserdialog
        ref={dialog}
        Closedialog={Closedialog}
        clickoutside={clickoutside}
        AddUser={AddUser}
        AddNewUser={AddNewUser}
        msgeEror={msgeEror}
        error={error}
        handleInputFirstName={handleInputFirstName}
        handleInputLastname={handleInputLastname}
        handleInputPassword={handleInputPassword}
        handleInputrole={handleInputrole}
        radioCheck={radioCheck}
      />

      <Table Users={Users} DeleteOption={DeleteOption} EditUser={EditUser} />
    </main>
  );
}
