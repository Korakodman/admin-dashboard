"use client";
import React, { useState } from "react";
import style from "./LoginAndRegister.module.css";
export default function LoginUI({ handleInputChange, error }) {
  return (
    <div className="grid">
      <div className="text-black font-bold text-1xl mb-4">
        <input
          placeholder="Username"
          className={error ? style.error : style.inputuser}
          type="text"
          name="username"
          onChange={handleInputChange}
        />
      </div>
      <div className="text-black font-bold text-1xl mb-4">
        <input
          placeholder="Password"
          className={error ? style.error : style.inputuser}
          type="password"
          name="password"
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
