import { useState } from "react";
import { toast } from "sonner";
import api from "../../lib/axios";

export default function GenreForm({ setForm, onGenreCreated }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Genre name cannot be empty");
      return;
    }

    try {
      setLoading(true);
      await api.post("/genres", {
        name: name.trim(),
      });
      toast.success("Genre created successfully!");
      setName("");
      onGenreCreated();
    } catch (error) {
      console.log(error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while creating the genre.");
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
      className="flex items-center justify-center min-h-screen bg-black/70 backdrop-blur-sm fixed top-0 left-0 w-full z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]"
      >
        <div className="p-6 space-y-6">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Add New Genre
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Genre Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border outline-none border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Genre name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              </div>
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
                  {loading ? "Creating..." : "Create Genre"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
