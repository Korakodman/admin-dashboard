// /app/Context/UseContextHook.js
"use client";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [Islogin, SetIslogin] = useState(false);
  const [Isregister, Setregister] = useState(false);
  const [DataBaseUser, SetDataBaseUser] = useState([]);
  const [currentUser, SetcurrentUser] = useState(null);
  const [SelectUserLogin, SetSelectUserLogin] = useState({
    username: "",
    password: "",
  });

  return (
    <AuthContext.Provider
      value={{
        Islogin,
        SetIslogin,
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
