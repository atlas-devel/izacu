import React, { useContext } from "react";
import { motion } from "framer-motion";
import { sidebarIcons } from "../assets/data";
import { typeOfMovies } from "../assets/data";
import { IoIosArrowDown } from "react-icons/io";
import { BiSolidCameraMovie } from "react-icons/bi";
import { MyContext } from "../context/Context";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const { showSidebar } = useContext(MyContext);

  return (
    <motion.div
      initial={{ width: "80px", opacity: 0 }}
      animate={{ width: showSidebar ? "220px" : "", opacity: 1 }}
      transition={{ duration: 0.4, type: "tween" }}
      className={`hidden md:flex border bg-gradient-to-bl from-blue-950 to-[#0f0f11] border-white/5 text-white h-screen ${
        showSidebar ? null : " justify-between items-center"
      } flex-col overflow-auto `}
    >
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 cursor-pointer mt-4"
      >
        <span
          className={`font-bold text-3xl  text-red-800 inline-block ${
            showSidebar ? "" : "m-auto"
          }`}
        >
          <BiSolidCameraMovie />
        </span>
        <div
          className={`${
            showSidebar ? "flex " : "hidden "
          } text-sm lg:text-lg gap-1 `}
        >
          <span className="font-semibold capitalize">Izacu</span>
          <span className="font-semibold text-red-800 uppercase">Movies</span>
        </div>
      </div>
      <div className="flex flex-col  border-b border-gray-600/35 pb-5">
        <p
          className={`text-gray-300/40 text-sm font-semibold mt-8   ${
            showSidebar ? "block px-3" : "hidden"
          }`}
        >
          News Feed
        </p>
        <div
          className={`flex   flex-col gap-1 mt-3 overflow-hidden ${
            showSidebar ? "px-5" : null
          }`}
        >
          {sidebarIcons.map(({ name, Icon, id }) => {
            if (name === "browse") {
              return (
                <div
                  onClick={() => navigate("/browse-movies")}
                  key={id}
                  className="flex   items-center gap-2 cursor-pointer hover:bg-red-800 px-2 active:bg-red-800  rounded-2xl py-3 capitalize  "
                >
                  <span className="text-xl">
                    <Icon />
                  </span>

                  <h1
                    className={` ${
                      showSidebar ? "block" : "hidden"
                    } text-sm font-semibold text-gray-200 `}
                  >
                    {name}
                  </h1>
                </div>
              );
            }
            return (
              <div
                key={id}
                className="flex   items-center gap-2 cursor-pointer hover:bg-red-800 px-2 active:bg-red-800  rounded-2xl py-3 capitalize  "
              >
                <span className="text-xl">
                  <Icon />
                </span>

                <h1
                  className={` ${
                    showSidebar ? "block" : "hidden"
                  } text-sm font-semibold text-gray-200 `}
                >
                  {name}
                </h1>
              </div>
            );
          })}
        </div>
      </div>
      <p
        className={`${
          showSidebar ? "block" : "hidden"
        } text-gray-300/40 text-sm font-semibold mt-6 mx-3`}
      >
        Filters
      </p>

      <div
        className={`flex  flex-col gap-1 mt-3 overflow-y-scroll scroll-style-one ${
          showSidebar ? "px-5" : null
        }`}
      >
        {typeOfMovies.map(({ name, Icon, id }) => {
          return (
            <div
              key={id}
              className={`flex  items-center gap-2  cursor-pointer hover:bg-red-800 rounded-2xl  py-3 capitalize ${
                showSidebar ? "px-2" : "px-4 mx-2"
              } `}
            >
              <span className="text-xl">
                <Icon />
              </span>
              <h1
                className={` ${
                  showSidebar ? "block" : "hidden"
                } text-sm font-semibold text-gray-200 `}
              >
                {name}
              </h1>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pb-4">
        <h1 className="text-gray-500 text-center font-light">ATLAS Dev</h1>
      </div>
    </motion.div>
  );
};

export default Sidebar;
