"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../Context/UseContextHook";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { ChartAreaInteractive } from "@/Components/chart-area-interactive";
import { Calendar } from "@/Components/ui/calendar";
import { FaUser } from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/Components/ui/card";
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
        <div className="mr-4 hover:cursor-pointer">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <main className="">
        <section className=" flex p-4 justify-around">
          <div className="">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between w-[250px]">
                  User Total <FaUser className="mr-2" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h1> 2 User </h1>
                <CardDescription>
                  <h1> +2 User</h1>
                </CardDescription>
              </CardContent>
            </Card>
          </div>
          <div className="">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between w-[250px]">
                  User Total <FaUser className="mr-2" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h1> 2 User </h1>
                <CardDescription>
                  <h1> +2 User</h1>
                </CardDescription>
              </CardContent>
            </Card>
          </div>
          <div className="">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between w-[250px]">
                  User Total <FaUser className="mr-2" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h1> 2 User </h1>
                <CardDescription>
                  <h1> +2 User</h1>
                </CardDescription>
              </CardContent>
            </Card>
          </div>
          <div className="">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between w-[250px]">
                  User Total <FaUser className="mr-2" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h1> 2 User </h1>
                <CardDescription>
                  <h1> +2 User</h1>
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>
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
