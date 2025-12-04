import { useState, useEffect } from "react";
import { toast } from "sonner";
import api from "../../lib/axios";

export default function GenreTable({
  genres,
  header,
  editingId,
  setEditingId,
  isEditing,
  setIsEditing,
  onGenreUpdated,
  onGenreDeleted,
}) {
  const [editName, setEditName] = useState("");
  const [loading, setLoading] = useState(false);

  // Set edit name when editing starts
  useEffect(() => {
    if (editingId) {
      const genreToEdit = genres.find((genre) => genre.id === editingId);
      if (genreToEdit) {
        setEditName(genreToEdit.name);
      }
    }
  }, [editingId, genres]);

  const handleEdit = (genre) => {
    setEditingId(genre.id);
    setIsEditing(true);
    setEditName(genre.name);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setIsEditing(false);
    setEditName("");
  };

  const handleSave = async (genreId) => {
    if (!editName.trim()) {
      toast.error("Genre name cannot be empty");
      return;
    }

    try {
      setLoading(true);
      await api.put(`/genres/${genreId}`, {
        name: editName.trim(),
      });
      toast.success("Genre updated successfully!");
      handleCancelEdit();
      onGenreUpdated();
    } catch (error) {
      console.error("Error updating genre:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while updating the genre.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (genreId, genreName) => {
    if (!confirm(`Are you sure you want to delete "${genreName}"?`)) {
      return;
    }

    try {
      setLoading(true);
      await api.delete(`/genres/${genreId}`);
      toast.success("Genre deleted successfully!");
      onGenreDeleted();
    } catch (error) {
      console.error("Error deleting genre:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while deleting the genre.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg mb-6 mt-4">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {header.map((h, i) => (
              <th scope="col" className="px-6 py-3" key={i}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {genres.length === 0 ? (
            <tr>
              <td colSpan={header.length} className="px-6 py-4 text-center">
                No genres found
              </td>
            </tr>
          ) : (
            genres.map((genre) => (
              <tr
                key={genre.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {editingId === genre.id ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={loading}
                    />
                  ) : (
                    genre.name
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2 items-center">
                    {editingId === genre.id ? (
                      <>
                        <button
                          onClick={() => handleSave(genre.id)}
                          disabled={loading}
                          className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                        >
                          {loading ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          disabled={loading}
                          className="px-3 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleDelete(genre.id, genre.name)}
                          disabled={loading}
                          className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleEdit(genre)}
                          disabled={loading || isEditing}
                          className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
