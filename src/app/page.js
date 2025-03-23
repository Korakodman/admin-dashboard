"use client";
import React, { useContext } from "react";
import style from "./page.module.css";
import { AuthContext } from "./Context/UseContextHook";

export default function Home() {
  const { Islogin, SetIslogin, Isregister, Setregister } =
    useContext(AuthContext);
  const ReisterPage = () => {
    if (Isregister) {
      Setregister(false);
    } else {
      Setregister(true);
    }
  };
  return (
    <main className="bg-gray-100 md:h-screen md:w-screen">
      <section className="grid justify-center bg-gradient-to-br from-fuchsia-600 to-cyan-500 md:h-screen ">
        <div className="grid justify-center items-center h-auto">
          <h1 className="md:text-3xl font-bold text-white p-2">
            {Isregister ? "Login Page" : "Register Page"}
          </h1>
        </div>
        <div className="mb-40 ">
          <form className="border border-white p-6 rounded-md bg-white ">
            <div className="grid">
              <div className="text-black font-bold text-1xl mb-4">
                <label className="">Username*</label>
                <input
                  placeholder="Username"
                  className={style.inputuser}
                  type="text"
                />
              </div>
              <div className="text-black font-bold text-1xl mb-4">
                <label>Password*</label>
                <input
                  placeholder="Password"
                  className={style.inputuser}
                  type="password"
                />
              </div>
            </div>
            <div className=" flex justify-end ">
              <button
                type="button"
                onClick={() => SetIslogin(true)}
                className="w-full  text-white font-bold py-2 px-4 bg-gradient-to-br from-fuchsia-600 to-cyan-500 p-2  mt-4"
              >
                Login
              </button>
            </div>
            <div className=" text-black mt-4 font-bold md:text-lg">
              Don't Have an Account?
              <button
                type="button"
                className="text-blue-600"
                onClick={ReisterPage}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
