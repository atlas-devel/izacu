import { useState, useEffect } from "react";
import StatCard from "../component/admin/StatCard";
import api from "../lib/axios";
import DashboardChart from "../component/admin/DashboardChart";

const Dashboard = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [translators, setTranslators] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchMovie() {
    try {
      setLoading(true);
      const response = await api.get("/movies");
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movie:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchGenre() {
    try {
      setLoading(true);
      const response = await api.get("/genres");
      setGenres(response.data);
    } catch (error) {
      console.error("Error fetching Genres:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchTranslators() {
    try {
      setLoading(true);
      const response = await api.get("/translators");
      setTranslators(response.data);
    } catch (error) {
      console.error("Error fetching Translators:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMovie();
    fetchGenre();
    fetchTranslators();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="md:p-6 p-2">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <StatCard movies={movies} translators={translators} genres={genres} />
      </section>
      <section className="mt-3 grid grid-cols-1 md:grid-cols-5 gap-2">
        <div className="col-span-5 md:col-span-3 lg:col-span-4">
          <DashboardChart
            movies={movies}
            translators={translators}
            genres={genres}
          />
        </div>
        <div></div>
      </section>
    </div>
  );
};

export default Dashboard;
