"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ แก้ให้ใช้ next/navigation
import Table from "../../Components/Table";
import AddUserdialog from "@/Components/AddUserdialog";

export default function Users() {
  const [error, Seterror] = useState(false);
  const [msgeEror, SetmsgeError] = useState("");
  const [radioCheck, SetradioCheck] = useState("");
  const [loading, Setloading] = useState(false);
  const [AddNewUser, setAddNewUser] = useState({
    name: "",
    lastname: "",
    role: "",
    password: "",
  });
  const [Users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      Setloading(true);
      try {
        const res = await fetch(`${apiurl}/api/users/`);
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.log("Error fetching users:", error);
      } finally {
        Setloading(false);
      }
    };

    fetchUsers();
  }, [refresh]);

  const dialog = useRef();
  function OpenDialog() {
    dialog.current?.showModal();
  }
  function Closedialog() {
    setAddNewUser({ name: "", lastname: "", role: "", password: "" });
    SetradioCheck("");
    dialog.current?.close();
  }

  const clickoutside = (e) => {
    if (e.target === dialog.current) {
      Closedialog();
    }
  };
  function AddUser(e) {
    e.preventDefault();

    if (!AddNewUser.name.trim()) {
      SetmsgeError("ใส่ชื่อด้วยครับ");
      Seterror(true);
      return;
    }
    if (!/^[a-zA-Zก-๙]+$/.test(AddNewUser.name)) {
      SetmsgeError("ชื่อห้ามมีตัวเลขหรืออักขระพิเศษครับ");
      Seterror(true);
      return;
    }
    if (!AddNewUser.lastname.trim()) {
      SetmsgeError("ใส่นามสกุลด้วยครับ");
      Seterror(true);
      return;
    }
    if (!/^[a-zA-Zก-๙]+$/.test(AddNewUser.lastname)) {
      SetmsgeError("นามสกุลห้ามมีตัวเลขหรืออักขระพิเศษครับ");
      Seterror(true);
      return;
    }
    if (!AddNewUser.password.trim()) {
      SetmsgeError("ใส่รหัสด้วยครับ");
      Seterror(true);
      return;
    }
    if (AddNewUser.password.length < 6) {
      SetmsgeError("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
      Seterror(true);
      return;
    }
    if (!/[A-Z]/.test(AddNewUser.password)) {
      SetmsgeError("รหัสผ่านต้องมีตัวพิมพ์ใหญ่");
      Seterror(true);
      return;
    }
    if (!/[0-9]/.test(AddNewUser.password)) {
      SetmsgeError("รหัสผ่านต้องมีตัวเลข");
      Seterror(true);
      return;
    }
    if (!AddNewUser.role) {
      SetmsgeError("ใส่ยศด้วยครับ");
      Seterror(true);
      return;
    }

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
    const response = fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(AddNewUser),
    });
  }
}
// วิธีทำให้เพิ่มผู้ใช้สั้นลง คือรับ event มาแล้ว destuctoring{name,value} ซึ่ง name ต้องกำหนดมาจากใน
// input เช่น name:"name" lastname:"lastname" ต่อๆกันไป หลังจากนั้น มันจะแทนที่ค่าเก่าตาม name และค่าที่รับมาเป็น value
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setAddNewUser((prev) => ({ ...prev, [name]: value }));
  if (name === "role") SetradioCheck(value);
};

// console.log(Users);
function DeleteOption(id) {
  const response = fetch(`/api/users/${id}`, { method: "DELETE" });
  try {
    if (response.ok) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
      if (response.ok) setRefresh((prev) => !prev);
    }
  } catch (error) {
    console.log("Error deleting user");
  }
}
// วิธีทำให้โค้ดสั้นคือ ส่งค่าที่จะอัพเดตมาเช่น updatedUser และ id คือ index จากนั้นให้เรียกใช้ ฟังชั้น setส่งค่าเก่า
// prev มา map(user,i) เช็คว่า id ตรงกับ indexที่รับมามั้ย ถ้าตรง ให้ แทนที่ users อันเก่า แทนที่อันใหม่ updatedUser
// ถ้าไม่ให้คงค่าเดิม user
function EditUser(updatedUser, index) {
  if (!updatedUser) return;
  setUsers((prev) =>
    prev.map((user, i) => (i === index ? { ...user, ...updatedUser } : user))
  );

  const response = fetch(`/api/users/${updatedUser.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedUser),
  });

  try {
    if (response.ok) {
      setRefresh((prev) => !prev);
    }
  } catch (error) {
    console.error("Edit error:", error);
  }
}

const userFormProps = {
  Closedialog,
  clickoutside,
  AddUser,
  AddNewUser,
  msgeEror,
  error,
  handleInputChange,
  radioCheck,
};

return (
  <main className="p-6 bg-gray-100 md:w-[1320px]">
    <div className="text-black font-serif flex">
      <h1 className="md:text-3xl font-bold">จัดการบัญชีผู้ใช้งาน</h1>
      <button
        className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white ml-4"
        onClick={OpenDialog}
      >
        Add User
      </button>
    </div>
    <AddUserdialog ref={dialog} {...userFormProps} />
    <Table
      Users={Users}
      DeleteOption={DeleteOption}
      EditUser={EditUser}
      loading={loading}
    />
  </main>
);
