import React from "react";
import { footerData, heroMovieBanner, moviesData } from "../assets/data";
import { FaPlay } from "react-icons/fa";
import { IoWifi } from "react-icons/io5";
import RenderMovies from "../component/RenderMovies";
import Footer from "../component/Footer";

const HomePage = () => {
  const handleSelection = (e) => {
    console.log(e.target.value);
  };
  return (
    <section className="bg-gradient-to-b from-blue-950 to-[#0f0f11] h-full w-full overflow-y-scroll scroll-style ">
      <div className="flex w-full overflow-x-scroll scroll-style-one ">
        {heroMovieBanner.map(
          ({ image, name, description, releaseYear, _id }) => {
            return (
              <div
                key={_id}
                className="flex-shrink-0 w-full h-[45vh]  overflow-hidden  "
              >
                <div className="w-[94%] h-full m-auto rounded-md relative ">
                  <img
                    className="object-cover  w-full h-full  "
                    src={image}
                    alt=""
                  />
                  <div className="absolute  flex justify-between flex-col top-0 left-0  bg-[#010103]/30 z-20 h-full w-full">
                    <div className="text-white mx-2 inline-flex items-center max-w-fit gap-1 bg-red-800 px-2 py-1 rounded-2xl hover:bg-red-700 m-3">
                      <span>
                        <IoWifi />
                      </span>
                      <span>Live</span>
                    </div>
                    <div className="mx-4">
                      <p className=" text-gray-100  text-5xl uppercase font-semibold">
                        {name}
                      </p>
                      <p className="font-semibold text-white mb-2">
                        {releaseYear}
                      </p>
                      <div className="hidden md:block mb-6  p-3 bg-red-800 backdrop-blur-2xl rounded-xl w-[65%] lg:max-w-[45em]">
                        <p className=" text-white/90 line-clamp-2 ">
                          {description}
                        </p>
                      </div>
                      <button className="bg-red-700 flex items-center gap-2 animate-dance hover:bg-red-600 cursor-pointer hover:-translate-1 hover:px-6 duration-300 px-5 mb-10 max-w-fit py-2 text-white font-semibold rounded-2xl">
                        <FaPlay /> <p>Watch</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
      <div className="flex flex-col items-end  mr-10 mt-5  ">
        <h1 className="text-gray-300 font-semibold capitalize text-lg  inline-block border-r-4 pr-4 mb-4 border-red-800 ">
          filter movies
        </h1>
        <select
          onChange={handleSelection}
          name=""
          id=""
          className="border border-white/30 md:px-5 px-2 md:py-2 py-1 outline-none text-white bg-blue-950 font-semibold rounded-md"
        >
          <option value="select one" defaultValue={true}>
            select one
          </option>
          <option value="Popular">Popular</option>
          <option value="Trending Today">Trending Today</option>
          <option value="Recently added">Recently added</option>
        </select>
      </div>
      {moviesData.map(({ type, movies, id }) => {
        return <RenderMovies key={id} type={type} movies={movies} />;
      })}
      <div
        className="
      grid grid-cols-2 md:grid-cols-4 gap-4 text-white bg-gradient-to-br from-blue-950 to-blue-[#0f0f11]  border-t border-white/20 p-6 
      "
      >
        {footerData.map((items, index) => {
          return <Footer key={index + 1} grid={items.grid} data={items.data} />;
        })}
      </div>
    </section>
  );
};

export default HomePage;
