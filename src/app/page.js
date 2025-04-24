"use client";
import React, { useContext, useEffect, useState } from "react";
import style from "./page.module.css";
import { AuthContext } from "./Context/UseContextHook";
import LoginUI from "@/Components/LoginUI";
import RegisterUI from "@/Components/RegisterUI";
import { useRouter } from "next/navigation";
export default function Home() {
  const {
    isLoggedIn,
    SetisLoggedIn,
    Isregister,
    Setregister,
    DataBaseUser,
    SetDataBaseUser,
    currentUser,
    SetcurrentUser,
    SelectUserLogin,
    SetSelectUserLogin,
  } = useContext(AuthContext);
  const router = useRouter();
  const [error, seterror] = useState();
  const [succes, setsucces] = useState();
  const [loadingdata, Setloadingdata] = useState();
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    // Setloadingdata(true);
    // async function FetchApi() {
    //   try {
    //     const res = await fetch(`${apiurl}/api/users`);
    //     const data = await res.json();
    //     SetDataBaseUser(data);
    //     Setloadingdata(false);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // FetchApi();

    if (typeof window !== "undefined") {
      const loginStatus = localStorage.getItem("islogin");
      const savedUser = localStorage.getItem("currentUser");
      if (loginStatus === "true" && savedUser) {
        try {
          SetisLoggedIn(true);
          SetcurrentUser(JSON.parse(savedUser));
          router.push("/dashboard");
        } catch (error) {
          console.error("Error parsing savedUser:", error);
          router.push("/");
        }
      } else {
        router.push("/");
      }
    }
  }, []);

  const [NewUser, SetNewUser] = useState([{}]);
  const ReisterPage = () => {
    if (Isregister) {
      seterror("");
      Setregister(false);
    } else {
      seterror("");
      Setregister(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    SetSelectUserLogin((prev) => ({ ...prev, [name]: value }));
  };
  const handleInputRegisChange = (e) => {
    const { name, value } = e.target;
    SetNewUser((prev) => ({ ...prev, [name]: value }));
  };

  async function formSubmit(e) {
    e.preventDefault();
    if (!Isregister) {
      try {
        const response = await fetch(`${apiurl}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: SelectUserLogin.username,
            password: SelectUserLogin.password,
          }),
        });

        // เช็คว่า response เป็น OK ก่อน
        if (!response.ok) {
          seterror("ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูก");
          router.push("/");
          return;
        }

        // ตรวจสอบว่า response เป็น JSON
        const data = await response.json();

        // ตรวจสอบผลจาก API
        if (data.success) {
          if (typeof window !== "undefined") {
            const loginStatus = localStorage.getItem("islogin");
            localStorage.setItem("islogin", "true");
            localStorage.setItem("currentUser", JSON.stringify(data.user));
            SetisLoggedIn(true);
            SetcurrentUser(data.user);
            router.push("/dashboard");
            seterror("");
          }
        } else {
          seterror("ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูก");
          router.push("/");
        }
      } catch (error) {
        console.log(error, "Something Error");
        seterror("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
      }
    } else {
      try {
        const formData = new FormData(e.target);
        const username = formData.get("username");
        const lastname = formData.get("lastname");
        const password = formData.get("password");
        const secondpass = formData.get("secondpass");

        const Isexits = DataBaseUser.some(
          (user) => user.username === NewUser.username
        );

        if (Isexits) {
          seterror("มีผู้ใช้ซ้ำ");
          return;
        }
        if (!username) return seterror("ใส่ชื่อด้วย");
        if (!lastname) return seterror("ใส่นามสกุลด้วย");
        if (!password) return seterror("ใส่รหัสด้วย");
        if (!secondpass) return seterror("ใส่รหัสยืนยันด้วย");
        const newUser = { username, lastname, password, role: "User" };
        const response = await fetch(`${apiurl}/api/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });
        const result = response.json();
        if (response.ok) {
          if (typeof window !== "undefined") {
            const loginStatus = localStorage.getItem("islogin");
            localStorage.setItem("islogin", "true");
            localStorage.setItem("currentUser", JSON.stringify(newUser));
            alert("Register Successfully!!");
            SetcurrentUser(newUser);
            SetisLoggedIn(true);
            router.push("/users");
          }
        } else if (!response.ok) {
          seterror("มีชื่อผู้ใช้ซ้ำ");
        } else {
          setsucces("สมัครสมาชิกสำเร็จ");
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
  return (
    <main className="bg-gray-100 h-screen md:w-screen w-full ">
      <section className="grid justify-center bg-gradient-to-br from-fuchsia-600 to-cyan-500 h-screen  ">
        <div className="mt-36">
          <form
            className="border border-white p-6 rounded-md bg-white md:w-[400px] w-[325px]"
            onSubmit={(e) => formSubmit(e)}
          >
            <div className="grid justify-center items-center h-auto">
              <h1 className="md:text-3xl font-bold text-black p-2">
                {Isregister ? "Register Page" : "Login Page"}
              </h1>
            </div>
            {Isregister ? (
              <RegisterUI
                handleInputRegisChange={handleInputRegisChange}
                error={error}
              />
            ) : (
              <LoginUI handleInputChange={handleInputChange} error={error} />
            )}
            <div className=" text-red-500 ">{error}</div>
            <div className=" text-green-500">{succes}</div>
            <div className=" flex justify-end ">
              <button
                type="submit"
                className="w-full  text-white font-bold md:py-2 md:px-4 p-1 bg-gradient-to-br from-fuchsia-600 to-cyan-500   mt-4"
              >
                {Isregister ? "Register" : "Login"}
              </button>
            </div>
            <div className=" text-black mt-4 font-bold md:text-lg text-center">
              {Isregister
                ? "Already Have an Account? "
                : " Don't Have an Account? "}
              <button
                type="button"
                className="text-blue-600"
                onClick={ReisterPage}
              >
                {Isregister ? "Login" : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
