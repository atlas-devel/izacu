export default function StatCard({ movies, translators, genres }) {
  const stat = [
    {
      title: "Movies",
      value: movies.length,
    },
    {
      title: "Translators",
      value: translators.length,
    },
    {
      title: "Genres",
      value: genres.length,
    },
  ];

  return (
    <>
      {stat.map((item) => (
        <div
          key={item.title}
          className="p-4 rounded-lg shadow-md text-white bg-gray-900"
        >
          <h2 className="text-lg font-semibold">{item.title}</h2>
          <p className="text-3xl font-bold">{item.value}</p>
        </div>
      ))}
    </>
  );
}
