import { useEffect, useState } from "react";
import Filter from "../component/admin/Filter";
import api from "../lib/axios";
import TranslatorForm from "../component/form/TranslatorForm";
import TranslatorTable from "../component/admin/TranslatorTable";

export default function Translators() {
  const [translators, setTranslators] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    async function fetchTranslators() {
      try {
        setLoading(true);
        const response = await api.get("/translators");
        setTranslators(response.data || []);
      } catch (error) {
        console.error("Error fetching translators:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTranslators();
  }, []);

  if (loading) return <div>Loading...</div>;

  const filtered = translators.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const translatorHeaders = ["Name", "Actions"];

  async function fetchTranslators() {
    try {
      setLoading(true);
      const response = await api.get("/translators");
      setTranslators(response.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleTranslatorCreated = () => {
    setForm(false);
    fetchTranslators();
  };

  const handleTranslatorUpdated = () => {
    setIsEditing(false);
    setEditingId(null);
    fetchTranslators();
  };

  const handleTranslatorDeleted = () => {
    fetchTranslators();
  };

  return (
    <div className="p-6">
      <Filter
        button="New Translator"
        placeholder="Search Translators"
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        form={form}
        setForm={setForm}
      />
      {form && (
        <TranslatorForm
          setForm={setForm}
          onTranslatorCreated={handleTranslatorCreated}
        />
      )}

      <TranslatorTable
        translators={filtered.slice(0, itemsPerPage)}
        header={translatorHeaders}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editingId={editingId}
        setEditingId={setEditingId}
        onTranslatorUpdated={handleTranslatorUpdated}
        onTranslatorDeleted={handleTranslatorDeleted}
      />
    </div>
  );
}
