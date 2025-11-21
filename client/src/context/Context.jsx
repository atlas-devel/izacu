import React, { createContext, useState } from "react";
import { useLocation } from "react-router-dom";

export const MyContext = createContext();

const Context = ({ children }) => {
  const [showSidebar, setshowSidebar] = useState(false);
  const [showSettings, setshowSettings] = useState(false);
  const { pathname } = useLocation();
  const [active, setActive] = useState({ list_one: false, list_two: true });

  const tools = {
    showSidebar,
    setshowSidebar,
    showSettings,
    setshowSettings,
    pathname,
    active,
    setActive,
  };
  return <MyContext.Provider value={tools}>{children}</MyContext.Provider>;
};

export default Context;
