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
        <div className="mt-36">
          <form className="border border-white p-6 rounded-md bg-white w-[400px] ">
            <div className="grid justify-center items-center h-auto">
              <h1 className="md:text-3xl font-bold text-black p-2">
                {Isregister ? "Login Page" : "Register Page"}
              </h1>
            </div>
            {Isregister ? (
              <div className="grid">
                <div className="text-black font-bold text-1xl mb-4">
                  <input
                    placeholder="Username"
                    className={style.inputuser}
                    type="text"
                  />
                </div>
                <div className="text-black font-bold text-1xl mb-4">
                  <input
                    placeholder="Password"
                    className={style.inputuser}
                    type="password"
                  />
                </div>
              </div>
            ) : (
              <div className="grid">
                <div className="text-black font-bold text-1xl mb-4">
                  <input
                    placeholder="Username"
                    className={style.inputuser}
                    type="text"
                  />
                </div>
                <div className="text-black font-bold text-1xl mb-4">
                  <input
                    placeholder="Lastname"
                    className={style.inputuser}
                    type="text"
                  />
                </div>
                <div className="text-black font-bold text-1xl mb-4">
                  <input
                    placeholder="Password"
                    className={style.inputuser}
                    type="password"
                  />
                </div>
                <div className="text-black font-bold text-1xl mb-4">
                  <input
                    placeholder="Repeat Password"
                    className={style.inputuser}
                    type="password"
                  />
                </div>
              </div>
            )}
            <div className=" flex justify-end ">
              <button
                type="button"
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
