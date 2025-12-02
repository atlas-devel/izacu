import { useEffect, useState } from "react";
import Filter from "../component/admin/Filter";
import api from "../lib/axios";
import GenreForm from "../component/form/GenreForm";
import GenreTable from "../component/admin/GenreTable";

export default function Genre() {
  const [genres, setGenres] = useState([]);
  const [filteredGenres, setFilteredGenres] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const genreHeaders = ["Name", "Actions"];

  useEffect(() => {
    fetchGenres();
  }, []);

  // Filter genres based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredGenres(genres);
    } else {
      const filtered = genres.filter((genre) =>
        genre.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGenres(filtered);
    }
  }, [genres, searchTerm]);

  async function fetchGenres() {
    try {
      setLoading(true);
      const response = await api.get("/genres");
      const data = await response.data;
      setGenres(data);
      setFilteredGenres(data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleGenreCreated = () => {
    setForm(false);
    fetchGenres();
  };

  const handleGenreUpdated = () => {
    setIsEditing(false);
    setEditingId(null);
    fetchGenres();
  };

  const handleGenreDeleted = () => {
    fetchGenres();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <Filter
        button="New Genre"
        placeholder="Search Genres"
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        form={form}
        setForm={setForm}
      />
      {form && (
        <GenreForm setForm={setForm} onGenreCreated={handleGenreCreated} />
      )}
      <GenreTable
        genres={filteredGenres.slice(0, itemsPerPage)}
        header={genreHeaders}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editingId={editingId}
        setEditingId={setEditingId}
        onGenreUpdated={handleGenreUpdated}
        onGenreDeleted={handleGenreDeleted}
      />
    </div>
  );

