import React from "react";
import video from "../assets/videos/ai.mp4";
import avatar from "../assets/images/avatar.webp";
import { movies } from "../assets/data";
import { VscVerifiedFilled } from "react-icons/vsc";

const WatchPage = () => {
  const type = "Series";
  return (
    <section className="bg-gradient-to-t from-blue-950 to-[#0f0f11] h-full w-full overflow-y-scroll scroll-style flex ">
      <div className=" flex flex-col md:flex-row gap-4 w-full">
        <div className="px-3 md:pl-4 flex-1">
          <div className="w-full">
            <div className="w-full  m-auto h-[60vh]   ">
              <iframe
                src="https://hglink.to/e/9vca71i6sj8q"
                className="w-full h-full  object-cover "
                allowFullScreen={true}
                frameborder="0"
              ></iframe>
            </div>
            <div className="flex">
              <div className=" my-10 flex gap-10">
                <div className="md:max-h-100 max-h-70  min-w-40 md:min-w-60 max-w-50">
                  <img
                    className="w-full h-full object-cover"
                    src={avatar}
                    alt=""
                  />
                </div>
                <div className="text-indigo-100 space-y-3  ">
                  <h1 className="font-semibold uppercase">avatar</h1>
                  <div>
                    <p className="text-md font-light text-gray-500">
                      2022 | 1h 44min
                    </p>
                    <p className="capitalize text-sm font-semibold ">
                      action, science fiction
                    </p>
                  </div>
                  <p className="text-gray-500 text-sm font-light max-w-130">
                    Legendary hitman John Wick uncovers a path to defeating the
                    High Table, but must face powerful enemies across the globe
                    before he can earn his freedom.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="shrink-0 overflow-hidden text-indigo-100 border border-white/5  h-fit bg-gradient-to-br from-blue-950 py-3 ">
          {type.toLowerCase() === "series" && (
            <div>
              <h1 className="font-semibold block text-center  my-7 text-lg uppercase   ">
                other episodes
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-8 md:flex-col   w-full  px-4 md:gap-2 md:h-full overflow-auto scroll-style ">
                {movies.slice(0, 3).map(({ _id, image, name, otherName }) => {
                  return (
                    <div
                      key={_id}
                      className="w-full sm:w-fit sm:max-w-80 px-3 shrink-0 bg-white/4   flex sm:items-center border border-white/5 hover:-translate-1 duration-400 cursor-pointer text-white rounded-md overflow-hidden"
                    >
                      <div className="w-full h-20 overflow-hidden ">
                        <img
                          className="sm:w-full h-full hover:scale-105 hover:brightness-60 duration-400 object-cover"
                          src={image}
                          alt={`${name} profile postures`}
                        />
                      </div>
                      <div className="px-4 py-2 text-sm">
                        <h1 className="font-bold uppercase text-nowrap ">
                          {name}
                        </h1>
                        <p className="capitalize  text-nowrap">{otherName}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="hover:-translate-1 duration-400 bg-red-800 m-auto block rounded-lg px-2 py-1 mt-3 cursor-pointer hover:bg-red-700 ">
                Load More episodes
              </button>
            </div>
          )}
          <h1 className="font-semibold block text-center  my-7 text-lg uppercase   ">
            you may also like this
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 w-full gap-8 m-auto px-4 md:gap-2 md:h-full overflow-auto scroll-style ">
            {movies.slice(0, 6).map(({ _id, image, name, otherName }) => {
              return (
                <div
                  key={_id}
                  className="w-full sm:w-fit sm:max-w-80 px-3 shrink-0 bg-white/4  flex sm:items-center border border-white/8 hover:-translate-1 duration-400 cursor-pointer text-white rounded-md overflow-hidden"
                >
                  <div className="w-full h-20 overflow-hidden ">
                    <img
                      className="sm:w-full h-full hover:scale-105 hover:brightness-60 duration-400 object-cover"
                      src={image}
                      alt={`${name} profile postures`}
                    />
                  </div>
                  <div className="px-4 py-2 text-sm">
                    <h1 className="font-bold uppercase text-nowrap ">{name}</h1>
                    <p className="capitalize  text-nowrap">{otherName}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="hover:-translate-1 duration-400 bg-red-800 m-auto block rounded-lg px-2 py-1 mt-3 cursor-pointer hover:bg-red-700 ">
            Load More films
          </button>
        </div>
      </div>
    </section>
  );
};

export default WatchPage;
