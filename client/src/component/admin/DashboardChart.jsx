import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DashboardCharts = ({ movies, genres }) => {
  const genreData = genres.map((genre) => ({
    name: genre.name,
    count: movies.filter((movie) => movie.genreId === genre.id).length,
  }));

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
  ];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-gray-900 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Movies by Genre</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={genreData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" name="Movies" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default DashboardCharts;
