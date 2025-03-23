import React from "react";
import style from "./LoginAndRegister.module.css";
export default function RegisterUI() {
  return (
    <div className="grid">
      <div className="text-black font-bold text-1xl mb-4">
        <input
          placeholder="Username"
          className={style.inputuser}
          type="text"
          name="username"
        />
      </div>
      <div className="text-black font-bold text-1xl mb-4">
        <input
          placeholder="Lastname"
          className={style.inputuser}
          type="text"
          name="lastname"
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
  );
}
