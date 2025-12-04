import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import { Route, Routes, Outlet } from "react-router-dom";

import Navigations from "./Navigations";
import { MyContext } from "../context/Context";

const RenderAll = () => {
  const { pathname } = useContext(MyContext);

  return (
    <section className="flex w-screen">
      <Sidebar />
      <div className="w-full">
        <div className={pathname.startsWith("/browse") ? "relative" : ""}>
          <Navigations />
        </div>
        <div className="bg-white h-[90vh] w-full">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default RenderAll;
