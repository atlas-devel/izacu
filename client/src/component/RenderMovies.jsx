import React from "react";
import { FaRegPlayCircle } from "react-icons/fa";
import { VscVerifiedFilled } from "react-icons/vsc";

const RenderMovies = ({ type, movies }) => {
  return (
    <div>
      <div className="flex justify-between items-center mx-8 mt-3 ">
        <h1 className=" border-l-4 border-red-800 inline-block pl-3 text-md md:text-2xl capitalize font-bold text-gray-200 mt-10">
          {type}
        </h1>
        <button className="text-md md:text-md font-light capitalize  text-indigo-100 border-1 border-indigo-100/20 hover:border-red-800 duration-200 hover:text-red-800 hover:cursor-pointer px-2 py-1 ">
          Load More
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 my-4 w-full  px-4">
        {movies.map(({ _id, image, name, otherName, user }) => {
          return (
            <div
              key={_id}
              className="w-full sm:max-w-[16em] hover:shadow-[2px_2px_12px_#1d357c] bg-white/4 m-[2em_auto]  h-fit sm:h-[21em] border border-white/8 hover:-translate-1 duration-400 cursor-pointer text-white rounded-md overflow-hidden"
            >
              <div className="relative w-full h-[60%] overflow-hidden group">
                <img
                  className="w-full h-full hover:scale-105 group-hover:brightness-60 duration-400 object-cover"
                  src={image}
                  alt={`${name} profile postures`}
                />
                <span className=" opacity-0 group-hover:opacity-100 absolute top-18 left-25 text-5xl text-red-700 ">
                  <FaRegPlayCircle />
                </span>
              </div>
              <div className="px-4 py-2">
                <h1 className="font-bold uppercase ">{name}</h1>
                <p className="uppercase text-sm sm:text-md">{otherName}</p>
              </div>
              <div className="flex px-3 py-1">
                <span className="h-10 w-10 inline-block overflow-hidden rounded-full">
                  <img
                    className="h-full w-full"
                    src={user.imageProfile}
                    alt=""
                  />
                  {user.imageProfile}
                </span>
                <div className="text-md">
                  <div className=" flex capitalize ">
                    <h1>{user.username}</h1>
                    <span
                      className={`${
                        user.isVerified ? "text-green-700 text-xl" : "hidden"
                      }`}
                    >
                      <VscVerifiedFilled />
                    </span>
                  </div>
                  <p className="text-gray-400 font-bold text-sm capitalize">
                    {user.uploadedMovie}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RenderMovies;
