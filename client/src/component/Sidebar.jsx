import React, { useContext } from "react";
import { motion } from "framer-motion";
import { sidebarIcons, typeOfMovies } from "../assets/data";
import { IoIosArrowDown } from "react-icons/io";
import { BiSolidCameraMovie } from "react-icons/bi";
import { MyContext } from "../context/Context";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";

const Sidebar = () => {
  const navigate = useNavigate();
  const { showSidebar } = useContext(MyContext);

  return (
    <motion.div
      initial={{ width: "80px", opacity: 0 }}
      animate={{ width: showSidebar ? "220px" : "80px", opacity: 1 }}
      transition={{ duration: 0.4, type: "tween" }}
      className="hidden md:flex flex-col h-screen border border-white/5 bg-gradient-to-bl from-blue-950 to-[#0f0f11] text-white overflow-hidden"
    >
      {/* Logo Section */}
      <div
        onClick={() => navigate("/")}
        className={`flex items-center gap-2 px-4 py-6 cursor-pointer transition-all ${
          showSidebar ? "justify-start" : "justify-center"
        }`}
      >
        <BiSolidCameraMovie className="text-3xl text-red-600 flex-shrink-0" />
        {showSidebar && (
          <div className="flex gap-1 text-lg font-semibold whitespace-nowrap">
            <span>Izacu</span>
            <span className="text-red-600">MOVIES</span>
          </div>
        )}
      </div>

      {/* Navigation Section */}
      <div className="border-b border-gray-600/30 pb-4">
        {showSidebar && (
          <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            News Feed
          </p>
        )}

        <nav className={`flex flex-col gap-1 ${showSidebar ? "px-3" : "px-2"}`}>
          {sidebarIcons.map(({ name, Icon, id }) => (
            <button
              key={id}
              onClick={() => name === "browse" && navigate("/browse-movies")}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 hover:bg-red-700/90 active:scale-95 group ${
                showSidebar ? "" : "justify-center"
              }`}
            >
              <Icon className="text-xl flex-shrink-0 group-hover:scale-110 transition-transform" />
              {showSidebar && (
                <span className="text-sm font-medium text-gray-200 capitalize">
                  {name}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Filters Section */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {showSidebar && (
          <p className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Filters
          </p>
        )}

        <div
          className={`flex-1 overflow-hidden  ${showSidebar ? "px-3" : "px-2"}`}
        >
          <Filters />
        </div>
      </div>

      {/* Footer */}

      <div className="px-4 py-4 border-t border-gray-600/30">
        <p className="text-xs text-gray-500 text-center font-light">
          ATLAS Dev © 2024
        </p>
      </div>
    </motion.div>
  );
};

export default Sidebar;
