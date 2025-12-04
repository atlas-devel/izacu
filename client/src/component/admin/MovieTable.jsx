import { toast } from "sonner";
import api from "../../lib/axios";

export default function MovieTable({
  movies,
  header,
  onMovieUpdated,
  onMovieDeleted,
}) {
  const handleDelete = async (movieId, movieTitle) => {
    if (!confirm(`Are you sure you want to delete "${movieTitle}"?`)) {
      return;
    }

    try {
      await api.delete(`/movies/${movieId}`);
      toast.success("Movie deleted successfully!");
      onMovieDeleted();
    } catch (error) {
      console.error("Error deleting movie:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while deleting the movie.");
      }
    }
  };

  const handleStatusChange = async (movieId, currentStatus) => {
    const statuses = ["pending", "published", "removed"];
    const currentIndex = statuses.indexOf(currentStatus);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];

    try {
      await api.put(`/movies/publish-status/${movieId}`, {
        publish_status: nextStatus,
      });
      toast.success(`Status changed to ${nextStatus}`);
      onMovieUpdated();
    } catch (error) {
      console.error("Error updating status:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while updating the status.");
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100";
      case "removed":
        return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
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
          {movies.length === 0 ? (
            <tr>
              <td colSpan={header.length} className="px-6 py-4 text-center">
                No movies found
              </td>
            </tr>
          ) : (
            movies.map((movie) => (
              <tr
                key={movie.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {movie.posterPotrait && (
                      <img
                        src={movie.posterPotrait}
                        alt={movie.title}
                        className="w-12 h-16 object-cover rounded"
                      />
                    )}
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {movie.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {movie.releaseYear} • {movie.country}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-xs truncate" title={movie.description}>
                    {movie.description}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                    {movie.type}
                  </span>
                </td>
                <td className="px-6 py-4">{movie.translator?.name || "N/A"}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {movie.movieGenres?.map((mg) => (
                      <span
                        key={mg.genre_id}
                        className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      >
                        {mg.genre.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">{movie.resolution}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      handleStatusChange(movie.id, movie.publish_status)
                    }
                    className={`px-2 py-1 text-xs font-semibold rounded-full cursor-pointer hover:opacity-80 ${getStatusColor(
                      movie.publish_status
                    )}`}
                  >
                    {movie.publish_status}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs">
                    <div>Views: {movie.views}</div>
                    <div>Downloads: {movie.download}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2 items-center">
                    <a
                      href={movie.movieUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      View
                    </a>
                    <button
                      onClick={() => handleDelete(movie.id, movie.title)}
                      className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
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
