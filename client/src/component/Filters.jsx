import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";
import { MyContext } from "../context/Context";
import api from "../lib/axios";
import Translators from "./Translators";
import Genres from "./Genres";

const Filters = () => {
  const { showSidebar } = useContext(MyContext);

  const [arrowRotate, setArrowRotate] = useState({
    interpretor: false,
    genres: false,
  });

  const [translators, setTranslators] = useState([]);
  const [genres, setGenres] = useState([]);

  const getTranslator = async () => {
    try {
      const response = await api.get("/translators");
      setTranslators(response.data);
    } catch (error) {
      console.error("Error fetching translator: " + error);
    }
  };
  const getGenres = async () => {
    try {
      const response = await api.get("/genres");
      setGenres(response.data);
    } catch (error) {
      console.error("Error fetching genres: " + error);
    }
  };
  useEffect(() => {
    getTranslator();
    getGenres();
  }, [import.meta.env.VITE_API_BASE_URL]);

  return (
    <section className={`${showSidebar ? "" : "hidden"} mt-5  flex flex-col `}>
      <Translators
        arrowRotate={arrowRotate}
        setArrowRotate={setArrowRotate}
        translators={translators}
      />
      <Genres
        arrowRotate={arrowRotate}
        setArrowRotate={setArrowRotate}
        genres={genres}
      />
    </section>
  );
};

export default Filters;
