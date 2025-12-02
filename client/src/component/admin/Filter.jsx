export default function Filter({
  button,
  placeholder,
  itemsPerPage,
  setItemsPerPage,
  searchTerm,
  setSearchTerm,
  setForm,
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <select
          className="border border-gray-300 rounded-md p-2 dark:bg-gray-700 dark:text-white"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <input
          type="text"
          className="border border-gray-300 rounded-md p-2 ml-2 dark:bg-gray-700 dark:text-white"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={() => setForm(true)}
          className="bg-blue-500 text-white rounded-md px-4 py-2"
        >
          {button}
        </button>
      </div>
    </div>
  );
}
