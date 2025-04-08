"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../Context/UseContextHook";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { ChartAreaInteractive } from "@/Components/chart-area-interactive";
import { Calendar } from "@/Components/ui/calendar";
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
  React.useEffect(() => {
    const loginStatus = localStorage.getItem("islogin");
    const savedUser = localStorage.getItem("currentUser");
    if (loginStatus === "true" && savedUser) {
      SetIslogin(true);
      SetcurrentUser(JSON.parse(savedUser));
    } else {
      router.push("/");
    }
  }, []);
  const [date, setDate] = React.useState(new Date());
  return (
    <div className="w-screen">
      <header className=" flex justify-between p-2">
        <div>
          <h1 className="text-2xl p-2">Dashboard</h1>
        </div>
        <div className="">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <main>
        <section className=" flex p-4">
          <div className="w-[720px] mr-10">
            <ChartAreaInteractive></ChartAreaInteractive>
          </div>
          <div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border shadow"
            />
          </div>
        </section>
      </main>
    </div>
  );
};
export default Dashboard;
