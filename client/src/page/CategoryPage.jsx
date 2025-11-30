import React, { useContext } from "react";
import { MyContext } from "../context/Context";
import { FaRegPlayCircle } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import api from "../lib/axios";
import { useEffect } from "react";

const CategoryPage = () => {
  const { allMovies } = useContext(MyContext);
  const [searchParams] = useSearchParams();

  const translator = searchParams.get("translator");
  const genre = searchParams.get("genre");

  const getContent = async () => {
    if (translator !== "None") {
      try {
        const res = await api.get(`/movies/translator-name/${translator}`);
        const data = res.data;
        if (data.success === false) {
          console.log(data.message);
          throw new Error(data.message);
        }
        console.log(res.data);
      } catch (error) {
        console.error(`Error: Fetching Content for translator ${translator}`);
      }
    } else {
      try {
        const res = await api.get(`/movies/genre-name/${genre}`);
        const data = res.data;

        if (data.success === false) {
          throw new Error(data.message);
        }
        console.log(res.data);
      } catch (error) {
        console.error(error.response.data.message);
        console.error(`Error: Fetching Content for genre ${genre}`);
      }
    }
  };
  useEffect(() => {
    getContent();
  }, [translator, genre]);

  const type = allMovies.type || "Genre";
  return (
    <div className="bg-gradient-to-b from-blue-950 to-[#0f0f11] relative pt-4 h-full w-full overflow-y-scroll scroll-style">
      <div className="flex justify-between items-center mx-8 mt-3 ">
        <h1 className=" border-l-4 border-red-800 inline-block pl-3 text-md md:text-2xl capitalize font-bold text-gray-200 mt-10">
          {translator !== "None" ? `by ${translator}` : `${genre} Content`}
        </h1>
        <button className="text-md md:text-md font-light capitalize  text-indigo-100 border-1 border-indigo-100/20 hover:border-red-800 duration-200 hover:text-red-800 hover:cursor-pointer px-2 py-1 ">
          Load More
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 my-4 w-full  px-4">
        {allMovies.map(({ id, movieUrl, title }) => {
          return (
            <div
              key={id}
              className="w-full sm:max-w-[16em] hover:shadow-[2px_2px_12px_#1d357c] bg-white/4 m-[2em_auto]  h-fit sm:h-[21em] border border-white/8 hover:-translate-1 duration-400 cursor-pointer text-white rounded-md overflow-hidden"
            >
              <div className="relative w-full h-[60%] overflow-hidden group">
                <img
                  className="w-full h-full hover:scale-105 group-hover:brightness-60 duration-400 object-cover"
                  src={movieUrl}
                  alt={`${title} profile postures`}
                />
                <span className=" opacity-0 group-hover:opacity-100 absolute top-18 left-25 text-5xl text-red-700 ">
                  <FaRegPlayCircle />
                </span>
              </div>
              <div className="px-4 py-2">
                <h1 className="font-bold uppercase ">{title}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPage;
