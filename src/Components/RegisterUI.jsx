import React from "react";
import style from "./LoginAndRegister.module.css";
export default function RegisterUI({ handleInputRegisChange, error }) {
  return (
    <div className="grid">
      <div className="text-black font-bold text-1xl mb-4">
        <input
          placeholder="Username"
          className={error ? style.error : style.inputuser}
          type="text"
          name="username"
          onChange={handleInputRegisChange}
        />
      </div>
      <div className="text-black font-bold text-1xl mb-4">
        <input
          placeholder="Lastname"
          className={error ? style.error : style.inputuser}
          type="text"
          name="lastname"
          onChange={handleInputRegisChange}
        />
      </div>
      <div className="text-black font-bold text-1xl mb-4">
        <input
          placeholder="Password"
          className={error ? style.error : style.inputuser}
          type="password"
          name="password"
          onChange={handleInputRegisChange}
        />
      </div>
      <div className="text-black font-bold text-1xl mb-4">
        <input
          placeholder="Repeat Password"
          className={error ? style.error : style.inputuser}
          type="password"
          name="secondpass"
          onChange={handleInputRegisChange}
        />
      </div>
    </div>
  );
}
