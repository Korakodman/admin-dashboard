"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../Context/UseContextHook";

const Dashboard = () => {
  const {
    Islogin,
    SetIslogin,
    DataBaseUser,
    currentUser,
    SetcurrentUser,
    SelectUserLogin,
  } = useContext(AuthContext);
  const router = useRouter();
  // React.useEffect(() => {
  //   const loginStatus = localStorage.getItem("islogin");
  //   const savedUser = localStorage.getItem("currentUser");
  //   if (loginStatus === "true" && savedUser) {
  //     SetIslogin(true);
  //     SetcurrentUser(JSON.parse(savedUser));
  //   } else {
  //     router.push("/");
  //   }
  // }, []);
  const [date, setDate] = React.useState(new Date());
  return (
    <div className="w-screen">
      <header className=" flex justify-between p-2 border-2 border-gray-300 items-center">
        <div>
          <h1 className="text-3xl p-2">Dashboard</h1>
        </div>
        <div className="mr-4 hover:cursor-pointer"></div>
      </header>
    </div>
  );
};
export default Dashboard;
