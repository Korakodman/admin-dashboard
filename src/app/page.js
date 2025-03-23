"use client";
import React, { useContext, useState } from "react";
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
  const [SelectUserLogin, SetSelectUserLogin] = useState([{}]);
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

  const UserFormProps = { DataBaseUser, SetDataBaseUser, handleInputChange };

  const formSubmit = (e) => {
    e.preventDefault();
    try {
      const FindUser = DataBaseUser.find(
        (user) =>
          user.username === SelectUserLogin.username &&
          user.password === SelectUserLogin.password
      );
      if (FindUser) {
        SetIslogin(true);
        router.push("/users");
      } else {
        console.log("เข้าไม่ได้");
      }
    } catch (error) {
      console.log(error, "Something Error");
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
                {Isregister ? "Login Page" : "Register Page"}
              </h1>
            </div>
            {Isregister ? <LoginUI {...UserFormProps} /> : <RegisterUI />}
            <div className=" flex justify-end ">
              <button
                type="submit"
                onClick={() => SetIslogin(true)}
                className="w-full  text-white font-bold py-2 px-4 bg-gradient-to-br from-fuchsia-600 to-cyan-500 p-2  mt-4"
              >
                {Isregister ? "Login" : "Register"}
              </button>
            </div>
            <div className=" text-black mt-4 font-bold md:text-lg text-center">
              {Isregister
                ? " Don't Have an Account? "
                : "Already Have an Account? "}
              <button
                type="button"
                className="text-blue-600"
                onClick={ReisterPage}
              >
                {Isregister ? "Sign Up" : "Login"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
