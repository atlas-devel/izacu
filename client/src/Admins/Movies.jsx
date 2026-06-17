import { useEffect, useState } from "react";
import Filter from "../component/admin/Filter";
import api from "../lib/axios";
import MovieForm from "../component/form/MovieForm";
import MovieTable from "../component/admin/MovieTable";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const movieHeaders = [
    "Title",
    "Description",
    "Type",
    "Translator",
    "Genres",
    "Resolution",
    "Status",
    "Stats",
    "Actions",
  ];

  useEffect(() => {
    fetchMovies();
  }, []);

  // Filter movies based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.translator?.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  }, [movies, searchTerm]);

  async function fetchMovies() {
    try {
      setLoading(true);
      const response = await api.get("/movies");
      const data = await response.data;
      setMovies(data);
      setFilteredMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleMovieCreated = () => {
    setForm(false);
    fetchMovies();
  };

  const handleMovieUpdated = () => {
    fetchMovies();
  };

  const handleMovieDeleted = () => {
    fetchMovies();
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="p-6">
      <Filter
        button="New Movie"
        placeholder="Search Movies"
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        form={form}
        setForm={setForm}
      />
      {form && (
        <MovieForm setForm={setForm} onMovieCreated={handleMovieCreated} />
      )}
      <MovieTable
        movies={filteredMovies.slice(0, itemsPerPage)}
        header={movieHeaders}
        onMovieUpdated={handleMovieUpdated}
        onMovieDeleted={handleMovieDeleted}
      />
    </div>
  );
}
