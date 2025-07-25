import { Link } from "react-router-dom";
import { useFavorites } from "../components/context/FavoritesContext";
import { useEffect, useState } from "react";
import { SkeletonCard } from "../Skeleton";
import toast from "react-hot-toast";

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <SkeletonCard />;

  if (favorites.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10 italic">
        No favorites added yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {favorites.map((meal) => (
        <div
          key={meal.idMeal}
          className="border rounded-lg overflow-hidden shadow relative"
        >
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-48 object-cover"
          />

          <div className="p-4">
            <h2 className="mb-2 text-lg font-semibold">{meal.strMeal}</h2>
            <Link
              to={`/recipe/${meal.idMeal}`}
              className="text-indigo-600 underline text-sm"
            >
              View Details
            </Link>
          </div>

          <button
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-xs rounded"
            onClick={() => {
              removeFavorite(meal.idMeal);
              toast.success(`${meal.strMeal} removed from favorites`);
            }}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
