"use client";
import React, { useState } from "react";
import style from "./LoginAndRegister.module.css";
export default function LoginUI({ handleInputChange }) {
  return (
    <div className="grid">
      <div className="text-black font-bold text-1xl mb-4">
        <input
          placeholder="Username"
          className={style.inputuser}
          type="text"
          name="username"
          onChange={handleInputChange}
        />
      </div>
      <div className="text-black font-bold text-1xl mb-4">
        <input
          placeholder="Password"
          className={style.inputuser}
          type="text"
          name="password"
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
