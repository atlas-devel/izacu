import React, { useContext } from "react";
import { movies } from "../assets/data";
import { FaRegPlayCircle } from "react-icons/fa";
import { VscVerifiedFilled } from "react-icons/vsc";
import { MyContext } from "../context/Context";

const FilteredMovies = () => {
  const { active, setActive } = useContext(MyContext);
  return (
    <div>
      <div
        className={`${
          active?.list_two === false
            ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 "
            : "flex flex-col gap-6 "
        } my-10 w-full  px-4 md:px-22 `}
      >
        {movies.map(({ _id, image, name, otherName, genre, description }) => {
          return (
            <div
              key={_id}
              className={`w-full ${
                active?.list_two
                  ? "flex md:h-[10em] "
                  : "sm:max-w-[14em] h-fit  sm:h-[20em] m-[2em_auto] "
              } hover:shadow-[2px_2px_12px_#1d357c] bg-white/4   border border-white/8 hover:-translate-1 duration-400  text-white rounded-md overflow-hidden`}
            >
              <div
                className={`relative  ${
                  active?.list_two
                    ? "h-full w-[20em] md:w-fit"
                    : "h-[70%] w-full"
                } overflow-hidden group`}
              >
                <img
                  className={` ${
                    active?.list_two ? "" : "w-full"
                  } h-full hover:scale-105 group-hover:brightness-60 duration-400 object-cover`}
                  src={image}
                  alt={`${name} profile postures`}
                />
              </div>
              <div className="flex flex-col px-4 space-y-2">
                <div className={`py-2`}>
                  <h1 className="font-bold uppercase ">{name}</h1>
                  <p className="capitalize text-gray-200 text-sm sm:text-md">
                    {otherName}
                  </p>
                </div>
                {active?.list_two && (
                  <>
                    <div>
                      {genre.map((gen, index) => {
                        return (
                          <span
                            key={index}
                            className="text-xs px-2 py-1 m-1 bg-white/20 rounded-full hover:bg-white/40 cursor-pointer duration-300 inline-block capitalize"
                          >
                            {gen}
                          </span>
                        );
                      })}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {description}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilteredMovies;
