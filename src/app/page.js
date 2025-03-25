"use client";
import React, { useContext, useEffect, useState } from "react";
import style from "./page.module.css";
import { AuthContext } from "./Context/UseContextHook";
import LoginUI from "@/Components/LoginUI";
import RegisterUI from "@/Components/RegisterUI";
import { useRouter } from "next/navigation";
export default function Home() {
  const { Islogin, SetIslogin, Isregister, Setregister } =
    useContext(AuthContext);
  const router = useRouter();
  const [DataBaseUser, SetDataBaseUser] = useState([
    {
      username: "Ice",
      password: "1234",
    },
  ]);

  useEffect(() => {
    const LoginStatus = localStorage.getItem("Islogin");
    if (LoginStatus == "true") {
      SetIslogin(true);
    }
  }, []);

  const [SelectUserLogin, SetSelectUserLogin] = useState([{}]);
  const [NewUser, SetNewUser] = useState([{}]);
  const ReisterPage = () => {
    if (Isregister) {
      Setregister(false);
    } else {
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

  const loginStatus = localStorage.getItem("isLogin");
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const formSubmit = (e) => {
    e.preventDefault();
    if (!Isregister) {
      try {
        const FindUser = DataBaseUser.find(
          (user) =>
            user.username === SelectUserLogin.username &&
            user.password === SelectUserLogin.password
        );
        if (FindUser) {
          localStorage.setItem("isLogin", "true");
          SetIslogin(true);
          router.push("/users");
        } else {
          alert("เข้าไม่ได้");
          router.push("/");
        }
      } catch (error) {
        console.log(error, "Something Error");
      }
    } else {
      try {
        const Isexits = users.some(
          (user) => user.username === NewUser.username
        );
        const Checkpass = NewUser.password != NewUser.secondpass;
        if (Isexits) {
          alert("มีผู้ใช้ซ้ำ");
          return;
        }
        if (Checkpass) {
          alert("รหัสผ่านไม่ตรงกัน");
          return;
        }
        users.push(NewUser);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Register Successfully!!");
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <main className="bg-gray-100 md:h-screen md:w-screen">
      <section className="grid justify-center bg-gradient-to-br from-fuchsia-600 to-cyan-500 md:h-screen ">
        <div className="mt-36">
          <form
            className="border border-white p-6 rounded-md bg-white w-[400px] "
            onSubmit={(e) => formSubmit(e)}
          >
            <div className="grid justify-center items-center h-auto">
              <h1 className="md:text-3xl font-bold text-black p-2">
                {Isregister ? "Register Page" : "Login Page"}
              </h1>
            </div>
            {Isregister ? (
              <RegisterUI handleInputRegisChange={handleInputRegisChange} />
            ) : (
              <LoginUI handleInputChange={handleInputChange} />
            )}
            <div className=" flex justify-end ">
              <button
                type="submit"
                className="w-full  text-white font-bold py-2 px-4 bg-gradient-to-br from-fuchsia-600 to-cyan-500 p-2  mt-4"
              >
                {Isregister ? "Login" : "Register"}
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
