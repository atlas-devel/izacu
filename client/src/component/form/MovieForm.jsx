import { useState, useEffect } from "react";
import { toast } from "sonner";
import api from "../../lib/axios";

export default function MovieForm({ setForm, onMovieCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    releaseYear: new Date().getFullYear(),
    country: "",
    resolution: "HD",
    movieUrl: "",
    type: "Movie",
    publish_status: "pending",
    translatorId: "",
  });

  const [posterPotrait, setPosterPotrait] = useState(null);
  const [posterLandscape, setPosterLandscape] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [translators, setTranslators] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTranslators();
    fetchGenres();
  }, []);

  async function fetchTranslators() {
    try {
      const response = await api.get("/translators");
      setTranslators(response.data || []);
    } catch (error) {
      console.error("Error fetching translators:", error);
      toast.error("Failed to load translators");
    }
  }

  async function fetchGenres() {
    try {
      const response = await api.get("/genres");
      setGenres(response.data || []);
    } catch (error) {
      console.error("Error fetching genres:", error);
      toast.error("Failed to load genres");
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenreToggle = (genreId) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === "potrait") {
        setPosterPotrait(file);
      } else {
        setPosterLandscape(file);
      }
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Description is required");
      return;
    }

    if (!formData.translatorId) {
      toast.error("Please select a translator");
      return;
    }

    if (!formData.movieUrl.trim()) {
      toast.error("Movie URL is required");
      return;
    }

    if (selectedGenres.length === 0) {
      toast.error("Please select at least one genre");
      return;
    }

    try {
      setLoading(true);

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title.trim());
      formDataToSend.append("description", formData.description.trim());
      formDataToSend.append("releaseYear", formData.releaseYear);
      formDataToSend.append("country", formData.country.trim());
      formDataToSend.append("resolution", formData.resolution);
      formDataToSend.append("movieUrl", formData.movieUrl.trim());
      formDataToSend.append("type", formData.type);
      formDataToSend.append("publish_status", formData.publish_status);
      formDataToSend.append("translatorId", formData.translatorId);

      if (posterPotrait) {
        formDataToSend.append("posterPotrait", posterPotrait);
      }
      if (posterLandscape) {
        formDataToSend.append("posterLandscape", posterLandscape);
      }

      // Create the movie first
      const movieResponse = await api.post("/movies", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Then add genre associations
      const movieId = movieResponse.data.id;
      for (const genreId of selectedGenres) {
        await api.post("/genres/movie", {
          movie_id: movieId,
          genre_id: genreId,
        });
      }

      toast.success("Movie created successfully!");
      onMovieCreated();
    } catch (error) {
      console.error(error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while creating the movie.");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    setForm(false);
  }

  return (
    <div
      onClick={handleCancel}
      className="flex items-center justify-center min-h-screen bg-black/70 backdrop-blur-sm fixed top-0 left-0 w-full z-50 p-4 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg my-8"
      >
        <div className="p-6 space-y-6 max-h-[90vh] overflow-y-auto">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Add New Movie
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full px-4 py-2 border outline-none border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter movie title"
                  value={formData.title}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  required
                  rows="4"
                  className="w-full px-4 py-2 border outline-none border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter movie description"
                  value={formData.description}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              {/* Row 1: Release Year, Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Release Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="releaseYear"
                    required
                    min="1900"
                    max={new Date().getFullYear() + 5}
                    className="w-full px-4 py-2 border outline-none border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                    value={formData.releaseYear}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    required
                    className="w-full px-4 py-2 border outline-none border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter country"
                    value={formData.country}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Row 2: Resolution, Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Resolution <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="resolution"
                    required
                    className="w-full px-4 py-2 border outline-none border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                    value={formData.resolution}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    <option value="SD">SD</option>
                    <option value="HD">HD</option>
                    <option value="Full HD">Full HD</option>
                    <option value="4K">4K</option>
                    <option value="8K">8K</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="type"
                    required
                    className="w-full px-4 py-2 border outline-none border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                    value={formData.type}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    <option value="Movie">Movie</option>
                    <option value="Series">Series</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Translator, Publish Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Translator <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="translatorId"
                    required
                    className="w-full px-4 py-2 border outline-none border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                    value={formData.translatorId}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    <option value="">Select a translator</option>
                    {translators.map((translator) => (
                      <option key={translator.id} value={translator.id}>
                        {translator.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Publish Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="publish_status"
                    required
                    className="w-full px-4 py-2 border outline-none border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                    value={formData.publish_status}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    <option value="pending">Pending</option>
                    <option value="published">Published</option>
                    <option value="removed">Removed</option>
                  </select>
                </div>
              </div>

              {/* Movie URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Movie URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  name="movieUrl"
                  required
                  className="w-full px-4 py-2 border outline-none border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter movie URL"
                  value={formData.movieUrl}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              {/* Genres Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Genres <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-4 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700">
                  {genres.map((genre) => (
                    <label
                      key={genre.id}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedGenres.includes(genre.id)}
                        onChange={() => handleGenreToggle(genre.id)}
                        disabled={loading}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {genre.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Image Uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Poster Portrait
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "potrait")}
                    disabled={loading}
                    className="w-full px-4 py-2 border outline-none border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                  {posterPotrait && (
                    <p className="text-sm text-gray-500 mt-1">
                      {posterPotrait.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Poster Landscape
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "landscape")}
                    disabled={loading}
                    className="w-full px-4 py-2 border outline-none border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                  {posterLandscape && (
                    <p className="text-sm text-gray-500 mt-1">
                      {posterLandscape.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}
                  className="px-4 py-2 text-sm bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create Movie"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
