"use client";
import { useEffect, useRef, useState } from "react";
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
    const fetchData = async () => {
      Setloading(true); // ✅ เริ่มโหลด
      try {
        const res = await fetch(`${apiurl}/api/users`);
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.log("Error fetching users:", error);
        SetmsgeError("Error fetching users");
      } finally {
        Setloading(false); // ✅ โหลดเสร็จ
      }
    };
    fetchData();
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

  async function AddUser(e) {
    e.preventDefault();
    Setloading(true); // ✅ เริ่มโหลด

    if (!AddNewUser.name.trim()) {
      SetmsgeError("ใส่ชื่อด้วยครับ");
      Seterror(true);
      Setloading(false);
      return;
    }
    if (!/^[a-zA-Zก-๙]+$/.test(AddNewUser.name)) {
      SetmsgeError("ชื่อห้ามมีตัวเลขหรืออักขระพิเศษครับ");
      Seterror(true);
      Setloading(false);
      return;
    }
    if (!AddNewUser.lastname.trim()) {
      SetmsgeError("ใส่นามสกุลด้วยครับ");
      Seterror(true);
      Setloading(false);
      return;
    }
    if (!/^[a-zA-Zก-๙]+$/.test(AddNewUser.lastname)) {
      SetmsgeError("นามสกุลห้ามมีตัวเลขหรืออักขระพิเศษครับ");
      Seterror(true);
      Setloading(false);
      return;
    }
    if (!AddNewUser.password.trim()) {
      SetmsgeError("ใส่รหัสด้วยครับ");
      Seterror(true);
      Setloading(false);
      return;
    }
    if (AddNewUser.password.length < 6) {
      SetmsgeError("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
      Seterror(true);
      Setloading(false);
      return;
    }
    if (!/[A-Z]/.test(AddNewUser.password)) {
      SetmsgeError("รหัสผ่านต้องมีตัวพิมพ์ใหญ่");
      Seterror(true);
      Setloading(false);
      return;
    }
    if (!/[0-9]/.test(AddNewUser.password)) {
      SetmsgeError("รหัสผ่านต้องมีตัวเลข");
      Seterror(true);
      Setloading(false);
      return;
    }
    if (!AddNewUser.role) {
      SetmsgeError("ใส่ยศด้วยครับ");
      Seterror(true);
      Setloading(false);
      return;
    }

    try {
      const response = await fetch(`${apiurl}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(AddNewUser),
      });

      if (response.ok) {
        setRefresh((prev) => !prev);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    } finally {
      Setloading(false); // ✅ โหลดเสร็จ
      Closedialog();
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddNewUser((prev) => ({ ...prev, [name]: value }));
    if (name === "role") SetradioCheck(value);
  };

  async function DeleteOption(_id) {
    Setloading(true); // ✅ เริ่มโหลด
    try {
      const response = await fetch(`${apiurl}/api/users/${_id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== _id));
        setRefresh((prev) => !prev);
      }
    } catch (error) {
      console.log("Error deleting user");
    } finally {
      Setloading(false); // ✅ โหลดเสร็จ
    }
  }

  async function EditUser(updatedUser, _id) {
    if (!updatedUser) return;
    Setloading(true); // ✅ เริ่มโหลด

    try {
      const response = await fetch(`${apiurl}/api/users/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        setUsers((prev) =>
          prev.map((user) =>
            user._id === _id ? { ...user, ...updatedUser } : user
          )
        );
        setRefresh((prev) => !prev);
      }
    } catch (error) {
      console.error("Edit error:", error);
    } finally {
      Setloading(false); // ✅ โหลดเสร็จ
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
          disabled={loading} // ✅ ปิดปุ่มเมื่อกำลังโหลด
        >
          {loading ? "Loading..." : "Add User"}
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
}
