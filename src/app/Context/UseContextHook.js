"use client";
import { createContext, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [Islogin, SetIslogin] = useState(false);
  const [Isregister, Setregister] = useState(true);

  return (
    <AuthContext.Provider
      value={{ Islogin, SetIslogin, Isregister, Setregister }}
    >
      {children}
    </AuthContext.Provider>
  );
};
