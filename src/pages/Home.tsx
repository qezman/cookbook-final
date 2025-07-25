import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
}

const Home = () => {
  const [query, setQuery] = useState("chicken");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMeals = async () => {
    setLoading(true);
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );

    const data = await res.json();
    setMeals(data.meals || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMeals();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="mb-6 flex gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a meal..."
          className="border border-gray-300 px-4 py-2 rounded w-full"
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Search
        </button>
      </form>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse border rounded-lg shadow p-4 space-y-4"
            >
              <div className="h-48 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : meals.length === 0 ? (
        <p className="text-center text-gray-500">No meals found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <Link
              key={meal.idMeal}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
              to={`/recipe/${meal.idMeal}`}
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{meal.strMeal}</h3>
                <p className="text-sm to-gray-500">{meal.strCategory}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
export default Home;
