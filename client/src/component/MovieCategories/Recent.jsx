import React, { useState, useEffect, useCallback, memo } from "react";
import { FaRegPlayCircle } from "react-icons/fa";
import api from "../../lib/axios";
import { useNavigate } from "react-router-dom";

const MovieCard = memo(function MovieCard({ movie, onNavigate }) {
  const { id, title, posterPotrait, releaseYear } = movie;

  const handleError = (e) => {
    e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
  };

  return (
    <div
      key={id}
      onClick={() => onNavigate(title)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onNavigate(title)}
      className="w-[50%] max-h-[600px] shrink-0 sm:max-w-[16em] hover:shadow-[2px_2px_12px_#1d357c] bg-white/4 m-[2em_auto] h-[300px] sm:h-[20em] border border-white/8 duration-400 cursor-pointer text-white rounded-md overflow-hidden"
    >
      <div className="relative w-full h-[70%] overflow-hidden group">
        <img
          className="w-full h-full hover:scale-105 group-hover:brightness-60 duration-400 object-cover"
          src={posterPotrait}
          alt={`${title} poster`}
          loading="lazy"
          onError={handleError}
        />
        <span className="opacity-0 group-hover:opacity-100 absolute inset-0 flex items-center justify-center text-5xl text-red-700">
          <FaRegPlayCircle />
        </span>
      </div>
      <div className="px-4 pt-4">
        <h1 className="font-bold uppercase truncate">{title}</h1>
        <p className="text-sm mt-1 text-gray-500">{releaseYear}</p>
      </div>
    </div>
  );
});

const Recent = ({ type }) => {
  const [recentMovies, setRecentMovies] = useState([]);
  const navigate = useNavigate();

  const onNavigate = useCallback(
    (title) =>
      navigate(`/watch/${title.replace(/\s+/g, "-").toLowerCase()}`),
    [navigate]
  );

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const fetchRecentMovies = async () => {
      try {
        const res = await api.get("/movies/recent-movies", {
          signal: controller.signal,
        });
        if (!mounted) return;
        setRecentMovies(res?.data?.movies ?? []);
      } catch (error) {
        if (error?.response?.status === 404) {
          setRecentMovies([]);
          return;
        }
        if (error.name === "AbortError") return;
        console.error("Failed to fetch recent movies:", error);
      }
    };

    fetchRecentMovies();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  return (
    <section aria-label={`Recent ${type}`} className="my-4">
      <div className="flex justify-between items-center mx-8 mt-3">
        <h2 className="border-l-4 border-red-800 inline-block pl-3 text-md md:text-2xl capitalize font-bold text-gray-200 mt-10">
          {type}
        </h2>
        <button
          aria-label="Load more recent movies"
          className="text-md md:text-md font-light capitalize text-indigo-100 border-1 border-indigo-100/20 hover:border-red-800 duration-200 hover:text-red-800 px-2 py-1"
        >
          Load More
        </button>
      </div>

      <div className="flex overflow-x-auto hide-scroll gap-4 my-4 w-full px-4">
        {recentMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onNavigate={onNavigate} />
        ))}
      </div>
    </section>
  );
};

export default memo(Recent);
