// /app/Context/UseContextHook.js
"use client";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, SetisLoggedIn] = useState(false);
  const [Isregister, Setregister] = useState(false);
  const [DataBaseUser, SetDataBaseUser] = useState([]);
  const [currentUser, SetcurrentUser] = useState(null);
  const [SelectUserLogin, SetSelectUserLogin] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("isLoggedIn");
    const currentuser = localStorage.getItem("currentUser");
    if (stored === "true") {
      SetisLoggedIn(true);
      SetcurrentUser(currentuser);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);
  return (
    <AuthContext.Provider
      value={{
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
