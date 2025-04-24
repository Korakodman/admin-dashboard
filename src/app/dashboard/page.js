"use client";
import * as React from "react";

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../Context/UseContextHook";
import { Avatar } from "@heroui/react";
import CalenderHeroUI from "@/Components/CalanderHeroUI";
import CardHeroUI from "@/Components/CardHeroUI";
import MyChart from "@/Components/Chart";
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
        <div className="mr-4 ">
          <Avatar
            showFallback
            src="https://i.pinimg.com/474x/0f/7b/3b/0f7b3b95aefae264fcbfc0c9eddd1c3d.jpg"
            className=" w-20 h-20 mx-auto "
          />
        </div>
      </header>
      <main>
        <section className=" container grid">
          <section className="p-2 flex justify-around mt-5">
            <CardHeroUI
              header={"Total Users"}
              description={"12"}
              footer={"+3 Today"}
              bgcolor="bg-orange-400"
            />
            <CardHeroUI
              header={"Total Commits"}
              description={"101"}
              footer={"+7 Today"}
              bgcolor="bg-blue-400"
            />
            <CardHeroUI
              header={"Active Sessions"}
              description={"4"}
              footer={"+1"}
              bgcolor="bg-red-400"
            />
            <CardHeroUI
              header={"Pending Tasks"}
              description={"8"}
              footer={"-2 done"}
              bgcolor="bg-gray-400"
            />
            <CardHeroUI
              header={"Revenue (THB)"}
              description={"฿12,300"}
              footer={"+฿1,200"}
              bgcolor="bg-yellow-400"
            />
          </section>

          <section className="px-10 mt-10 flex">
            <CalenderHeroUI />
            <MyChart />
          </section>
          <section></section>
        </section>
      </main>
    </div>
  );
};
export default Dashboard;
