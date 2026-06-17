import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";
import { MyContext } from "../context/Context";
import { useContext } from "react";
import { MdMovieCreation } from "react-icons/md";
import { typeOfMovies } from "../assets/data";
import { Link } from "react-router-dom";

const Genres = ({ arrowRotate, setArrowRotate, genres }) => {
  const { showSidebar } = useContext(MyContext);
  return (
    <section className=" flex  flex-col flex-1 ">
      <div className="  cursor-pointer  py-3 hover:bg-red-800 px-2  rounded-2xl capitalize  ">
        <span
          onClick={() =>
            setArrowRotate((prev) => ({ ...prev, genres: !prev.genres }))
          }
          className="flex items-center"
        >
          <h1
            className={` ${
              showSidebar ? "block" : "hidden"
            } text-sm font-semibold text-gray-200 `}
          >
            <MdMovieCreation className="inline mr-2" />
            Genres
          </h1>
          <motion.span
            className="text-xl"
            initial={{ rotate: "0 deg" }}
            animate={{ rotate: arrowRotate.genres ? "-90deg" : "0 deg" }}
            transition={{ duration: 0.4, type: "tween" }}
          >
            <IoIosArrowDown />
          </motion.span>
        </span>
      </div>
      <div
        className={`${
          arrowRotate.genres
            ? "max-h-96 overflow-y-auto scroll-style-one"
            : "hidden"
        }`}
      >
        {genres.map((genre) => {
          const movieType = typeOfMovies.find((mov) => mov.name === genre.name);
          const Icon = movieType?.Icon;
          return (
            <Link
              key={genre.id}
              to={`/category?genre=${genre.name}&translator=None`}
            >
              <div className="py-2 flex items-centerg gap-2 flex-nowrap line-clamp-1 cursor-pointer px-4 ml-5 text-sm text-gray-100 rounded-md font-semibold hover:bg-red-800">
                <Icon />
                {genre.name}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Genres;
