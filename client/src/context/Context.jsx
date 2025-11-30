import React, { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../lib/axios";

export const MyContext = createContext();

const Context = ({ children }) => {
  const [showSidebar, setshowSidebar] = useState(false);
  const [showSettings, setshowSettings] = useState(false);
  const { pathname } = useLocation();
  const [active, setActive] = useState({ list_one: false, list_two: true });
  const [allMovies, setAllMovies] = useState([]);

  const getMovies = async () => {
    try {
      const res = await api.get("/movies");
      setAllMovies(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, [import.meta.env.VITE_API_URL]);

  const tools = {
    showSidebar,
    setshowSidebar,
    showSettings,
    setshowSettings,
    pathname,
    active,
    setActive,
    allMovies,
  };
  return <MyContext.Provider value={tools}>{children}</MyContext.Provider>;
};

export default Context;
