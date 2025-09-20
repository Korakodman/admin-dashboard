"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {Form, Input, Button} from "@heroui/react";

// "name": "John Doe",
//         "email": "john@example.com",
//         "age":
export default function Settings() {
  const [user, setuser] = useState([]);
  const Route = useRouter();
      const [action, setAction] = useState(null);
  // useEffect(() => {
  //   const loginStatus = localStorage.getItem("isLogin");
  //   if (loginStatus === "true") {
  //     Route.push("/settings");
  //   } else {
  //     alert("กรุณาเข้าระบบ");
  //     Route.push("/");
  //   }
  // }, []);
  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold mb-4">Settings Management</h1>
      <div>
       <Form
      className="w-full max-w-xs flex flex-col gap-4"
      onReset={() => setAction("reset")}
      onSubmit={(e) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.currentTarget));

        setAction(`submit ${JSON.stringify(data)}`);
      }}
    >
      <Input
        isRequired
        errorMessage="Please enter a valid username"
        label="Username"
        labelPlacement="outside"
        name="username"
        placeholder="Enter your username"
        type="text"
      />

      <Input
        isRequired
        errorMessage="Please enter a valid email"
        label="Password"
        labelPlacement="outside"
        name="password"
        placeholder="Enter your email"
        type="password"
      />
      <div className="flex gap-2">
        <Button color="primary" type="submit">
          Submit
        </Button>
        <Button type="reset" variant="flat">
          Reset
        </Button>
      </div>
      
    </Form>
      </div>
    </div>
  );
}
