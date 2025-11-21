import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { LuSearch } from "react-icons/lu";
import { IoIosNotificationsOutline } from "react-icons/io";
import person from "../assets/images/slide4.jpg";
import { MyContext } from "../context/Context";
import { motion } from "framer-motion";
import Profile from "./Profile";
import { useLocation } from "react-router-dom";

const Navigations = () => {
  const { showSidebar, setshowSidebar, showSettings, setshowSettings } =
    useContext(MyContext);
  const { pathname } = useLocation();
  if (pathname.startsWith("/browse")) {
    return;
  }
  return (
    <div className="relative   bg-gradient-to-br from-blue-950  to-blue-950/40 flex-1 text-white h-[10vh] w-full flex items-center">
      <div className="flex justify-between w-full sm:px-6 ">
        <span
          onClick={() => setshowSidebar((prev) => !prev)}
          className="hidden md:inline-flex text-xl text-gray-300 hover:text-gray-100 duration-300 items-center justify-center bg-transparent hover:bg-blue-950 cursor-pointer  px-3  border border-white/25 rounded-md"
        >
          <motion.span
            initial={{ rotate: "0 deg" }}
            animate={{ rotate: showSidebar ? "180deg" : "0 deg" }}
            transition={{ duration: 0.4, type: "tween" }}
          >
            <IoIosArrowBack />
          </motion.span>
        </span>
        <div className="flex items-center gap-3 md:gap-1 lg:gap-10 w-full  md:w-auto px-2">
          <div className="relative flex-1  flex min-w-0 max-w-[70wv] md:w-auto">
            <input
              type="text"
              placeholder="Search everything"
              className="flex-1 w-full border border-white/50 focus:outline-violet-600 active:ouline-violet-600 outline-none px-10 py-2 rounded-md"
            />
            <span className="absolute text-2xl left-2 top-2 text-gray-400">
              <LuSearch />
            </span>
          </div>

          <span className="text-2xl cursor-pointer text-gray-100 md:text-3xl">
            <IoIosNotificationsOutline />
          </span>

          <span
            onClick={() => setshowSettings((prev) => !prev)}
            className="w-8 h-8 md:w-12 hover:cursor-pointer  md:h-12 overflow-hidden object-fit rounded-full"
          >
            <img src={person} alt="profile image" />
          </span>
        </div>
      </div>
      {showSettings && <Profile />}
    </div>
  );
};

export default Navigations;
