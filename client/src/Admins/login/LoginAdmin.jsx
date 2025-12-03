import React, { useState } from "react";
import LoginForm from "./LoginForm";
import api from "../../lib/axios";
import { Navigate, useNavigate } from "react-router-dom";

const LoginAdmin = () => {
  const [isloading, setIsloading] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const sendLoginRequest = async (event) => {
    event.preventDefault();

    setIsloading(true);
    const { email, password } = loginCredentials;
    console.log(email, password);
    try {
      const res = await api.post("/auth/admin/login", { email, password });
      if (res.data.success) {
        setIsloading(false);
        navigate("/admin/dashboard");
      }
    } catch (error) {
      if (
        (error.response?.data.success === false) &
        (error.response?.status === 403)
      ) {
        navigate("/admin/reset/password-default");
        console.log("hello");
        return;
      }
      console.error(error.response?.data.message);
      alert(error.response?.data.message);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <section className="flex flex-col min-h-screen min-w-screen bg-black bg-cover bg-center ">
      <div className="bg-gradient-to-b from-transparent to-black h-full  flex-1 ">
        <div className="max-md:hidden">
          <div className="inline-block  relative">
            <div className="" />
            <h1 className=" text-gray-400 font-semibold p-10 sm:text-2xl">
              Izacu
            </h1>
          </div>
        </div>

        <div className=" flex flex-1 mt-30  items-center justify-center ">
          <LoginForm
            sendLoginRequest={sendLoginRequest}
            isloading={isloading}
            setIsloading={setIsloading}
            loginCredentials={loginCredentials}
            setLoginCredentials={setLoginCredentials}
          />
        </div>
      </div>
    </section>
  );
};

export default LoginAdmin;
