// app/users/page.js
"use client";
import { useEffect, useRef, useState } from "react";
import Table from "../../Components/Table";
import AddUserdialog from "@/Components/AddUserdialog";
export default function Users() {
  const [error, Seterror] = useState(false);
  const [msgeEror, SetmsgeError] = useState();
  const [radioCheck, SetradioCheck] = useState("");
  const [AddNewUser, setAddNewUser] = useState({
    id: 0,
    name: "",
    lastname: "",
    role: "",
    password: "",
  });
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    try {
      fetch("http://localhost:3000/api/users/")
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch((err) => console.log(err));
    } catch (error) {}
  }, [AddNewUser]);
  console.log(Users);

  const dialog = useRef();
  function OpenDialog() {
    if (dialog.current) {
      dialog.current.showModal();
    }
  }
  function Closedialog() {
    setAddNewUser({
      name: "",
      lastname: "",
      role: "",
      password: "",
    });
    SetradioCheck("");
    dialog.current.close();
  }
  const clickoutside = (e) => {
    if (e.target === dialog.current) {
      setAddNewUser({
        name: "",
        lastname: "",
        role: "",
        password: "",
      });
      SetradioCheck("");
      Closedialog();
    }
  };
  async function AddUser(e) {
    e.preventDefault();

    if (AddNewUser.name == "") {
      SetmsgeError("ใส่ชื่อด้วยครับ");
      Seterror(true);
    } else if (AddNewUser.lastname == "") {
      SetmsgeError("ใส่นามสกุลด้วยครับ");
      Seterror(true);
    } else if (AddNewUser.password == "") {
      SetmsgeError("ใส่รหัสด้วยครับ");
      Seterror(true);
    } else if (AddNewUser.role == "") {
      SetmsgeError("ใส่ยศด้วยครับ");
      Seterror(true);
    } else {
      const newId = Users.length > 0 ? Users[Users.length - 1].id + 1 : 1;

      const newUser = {
        id: newId,
        ...AddNewUser,
      };
      setUsers((prevNewUser) => [...prevNewUser, newUser]);
      setAddNewUser({
        name: "",
        lastname: "",
        role: "",
        password: "",
      });
      SetradioCheck("");
      Seterror(false);
      Closedialog();
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
    }
  }
  const handleInputFirstName = (e) => {
    setAddNewUser({
      ...AddNewUser,
      name: e.target.value,
    });
  };
  const handleInputLastname = (e) => {
    setAddNewUser({
      ...AddNewUser,
      lastname: e.target.value,
    });
  };
  const handleInputPassword = (e) => {
    setAddNewUser({
      ...AddNewUser,
      password: e.target.value,
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
  async function DeleteOption(id) {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    console.log(id);
    const response = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });
  }
  async function EditUser(user, index) {
    if (!user) {
      return;
    } else {
      const NewUser = user;
      setUsers((prev) =>
        prev.map((item, i) => {
          if (i === index) {
            return {
              name: NewUser.name,
              lastname: NewUser.lastname,
              role: NewUser.role,
              password: NewUser.password,
            };
          }
          return item;
        })
      );
      const response = await fetch(`/api/users/${NewUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: NewUser.name,
          lastname: NewUser.lastname,
          role: NewUser.role,
          password: NewUser.password,
        }),
      });
    }
  }
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
