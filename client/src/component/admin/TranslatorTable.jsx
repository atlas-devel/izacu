import { useState, useEffect } from "react";
import { toast } from "sonner";
import api from "../../lib/axios";

export default function TranslatorTable({
  translators,
  header,
  editingId,
  setEditingId,
  isEditing,
  setIsEditing,
  onTranslatorUpdated,
  onTranslatorDeleted,
}) {
  const [editName, setEditName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingId) {
      const t = translators.find((tr) => tr.id === editingId);
      if (t) setEditName(t.name);
    }
  }, [editingId, translators]);

  const handleEdit = (translator) => {
    setEditingId(translator.id);
    setIsEditing(true);
    setEditName(translator.name);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setIsEditing(false);
    setEditName("");
  };

  const handleSave = async (translatorId) => {
    if (!editName.trim()) {
      toast.error("Translator name cannot be empty");
      return;
    }

    try {
      setLoading(true);
      await api.put(`/translators/${translatorId}`, { name: editName.trim() });
      toast.success("Translator updated successfully!");
      handleCancelEdit();
      onTranslatorUpdated();
    } catch (error) {
      console.error("Error updating translator:", error);
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An error occurred while updating the translator.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (translatorId, translatorName) => {
    if (!confirm(`Are you sure you want to delete "${translatorName}"?`))
      return;

    try {
      setLoading(true);
      await api.delete(`/translators/${translatorId}`);
      toast.success("Translator deleted successfully!");
      onTranslatorDeleted();
    } catch (error) {
      console.error("Error deleting translator:", error);
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An error occurred while deleting the translator.");
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
          {translators.length === 0 ? (
            <tr>
              <td colSpan={header.length} className="px-6 py-4 text-center">
                No translators found
              </td>
            </tr>
          ) : (
            translators.map((t) => (
              <tr
                key={t.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {editingId === t.id ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={loading}
                    />
                  ) : (
                    t.name
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2 items-center">
                    {editingId === t.id ? (
                      <>
                        <button
                          onClick={() => handleSave(t.id)}
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
                          onClick={() => handleDelete(t.id, t.name)}
                          disabled={loading}
                          className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleEdit(t)}
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
