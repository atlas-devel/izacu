import React from "react";
import { TbLockPassword } from "react-icons/tb";
import { MdOutlineEmail } from "react-icons/md";

const LoginAdmins = () => {
  return (
    <div className="bg-black min-h-screen w-full bg-cover bg-center brightness-50 ">
      <div className={`  flex text-sm lg:text-lg gap-1 `}>
        <span className="p-8 font-semibold uppercase text-2xl  bg-clip-text text-transparent bg-gradient-to-l from-gray-500/60 via-blue-100 to-gray-200/30">
          Izacu Movies
        </span>
      </div>
      <div className="flex justify-center items-center">
        <form className="flex flex-col border border-white/20  mt-20 w-[90%] sm:max-w-[35em] p-4 text-white rounded-md shadow-md shadow-white/20  backdrop-blur-3xl ">
          <p className="text-center inline-block mb-6 font-bold text-transparent bg-gradient-to-l from-gray-500/60 via-blue-100 to-gray-200/30 bg-clip-text text-xl uppercase">
            Login
          </p>
          <div className="flex flex-col justify-center items-center">
            <div className="relative w-[90%] py-2.5 rounded-full mb-6 flex border border-white/30 items-center px-2  bg-gray-300/10">
              <span className=" text-white  text-lg pl-4">
                <MdOutlineEmail />
              </span>
              <input
                className="absolute  top-0 left-0 h-full w-full outline-none text-center "
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="relative  py-2.5 w-[90%] mb-6 rounded-full flex border border-white/30 items-center px-2 gap-1 bg-gray-300/10">
              <span className="text-white   text-lg pl-4">
                <TbLockPassword />
              </span>
              <input
                className=" absolute  top-0 left-0 h-full w-full outline-none text-center"
                type="password"
                placeholder="Password"
              />
            </div>
          </div>
          <span className="rounded-full inline-block text-center border border-white/50 w-[10em] m-auto py-1 text-white/70 cursor-pointer duration-400 ease-in-out hover:bg-gradient-to-l from-500/60 via-blue-100 to-gray-200/10 ">
            Submit
          </span>
          <p className="text-sm text-center mt-4 text-gray-400 underline hover:cursor-pointer hover:text-gray-500 duration-400">
            Request a password reset
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmins;
