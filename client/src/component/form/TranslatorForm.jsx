import { useState } from "react";
import { toast } from "sonner";
import api from "../../lib/axios";

export default function TranslatorForm({ setForm }) {
  const [name, setName] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("/translators", { name });
      toast.success("Translator created successfully!");
      setForm(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An error occurred while creating the translator.");
      }
    }
  }

  return (
    <div
      onClick={() => setForm(false)}
      className="flex items-center justify-center min-h-screen bg-black/70 backdrop-blur-sm fixed top-0 left-0 w-full z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]"
      >
        <div className="p-6 space-y-6">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Translator Information
            </h3>

            <div className="grid grid-cols-1  gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Translator Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border outline-none border-gray-300 dark:border-gray-600 rounded-lg  dark:bg-gray-700 dark:text-white"
                  placeholder="Enter Translator name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-300 px-3 py-2 rounded-lg"
                >
                  Save
                </button>
                <button
                  onClick={() => setForm(false)}
                  className="bg-red-300 px-3 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
