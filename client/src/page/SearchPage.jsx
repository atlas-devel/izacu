import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { LuSearch } from "react-icons/lu";
import { MyContext } from "../context/Context";
import { IoGridOutline } from "react-icons/io5";
import { CiBoxList } from "react-icons/ci";
import { MdOutlineFilterAlt } from "react-icons/md";
import FilteredMovies from "../component/FilteredMovies";

const SearchPage = () => {
  const { showSidebar, setshowSidebar, active, setActive } =
    useContext(MyContext);

  console.log(active);
  return (
    <div className="bg-gradient-to-b from-blue-950 to-[#0f0f11] relative pt-4 h-screen w-full overflow-y-scroll scroll-style">
      <div className="  text-white h-[10vh] w-full  items-center">
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
          <div className="flex items-center gap-3 md:gap-1 lg:gap-10 w-full  md:w-auto h-[2.7em] px-2">
            <div className="relative flex-1 h-full flex item-center  lg:min-w-[30vw] max-w-[90wv] md:w-auto">
              <input
                type="text"
                placeholder="Search everything"
                className="flex-1 w-full text-center bg-blue-950/40 rounded-full border border-white/20 focus:outline-violet-600 active:ouline-violet-600 outline-none px-10 py-2 "
              />
              <span className="absolute text-2xl left-2 top-2 text-gray-400 pl-2">
                <LuSearch />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:flex justify-between w-[90%] m-auto   py-4 px-4 md:px-15  bg-black/28 rounded-md  ">
        <div className="inline-flex px-5 py-2 items-center gap-3 rounded-full bg-white/10">
          <span
            onClick={() =>
              setActive((prev) => {
                return { list_two: false, list_one: !prev.list_one };
              })
            }
            className={`text-white px-2 py-0.5 cursor-pointer rounded-lg  inline-block ${
              active.list_one
                ? "bg-gradient-to-tl from-blue-950/90 to-red-800"
                : ""
            }`}
          >
            <IoGridOutline />
          </span>
          <span
            onClick={() =>
              setActive((prev) => {
                return { list_one: false, list_two: !prev.list_two };
              })
            }
            className={`text-white px-2 py-0.5 cursor-pointer rounded-lg  inline-block ${
              active.list_two
                ? "bg-gradient-to-tl from-blue-950/90 to-red-800"
                : ""
            }`}
          >
            <CiBoxList />
          </span>
        </div>
        <div className="flex gap-3 text-sm  ">
          <div className="inline-flex px-3 md:px-5 py-2 items-center gap-3 rounded-full bg-white/10 text-white">
            <span>
              <MdOutlineFilterAlt />
            </span>
            <h1>All</h1>
          </div>
          <select className="inline-flex px-3 md:px-5 py-2 items-center outline-none gap-4 rounded-full bg-white/10  text-white">
            <option
              className="text-black bg-lue-950/50"
              value=""
              defaultChecked={true}
            >
              choose filter
            </option>
            <option className="text-black bg-lue-950/50">popular</option>
            <option className="text-black bg-lue-950/50">recent movies</option>
            <option className="text-black bg-lue-950/50">translators</option>
          </select>
        </div>
      </div>
      <div>
        <FilteredMovies />
      </div>
    </div>
  );
};

export default SearchPage;
