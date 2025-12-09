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
      <div className="mx-auto max-w-3xl mt-12 text-center">
        <p className="text-gray-500 italic">No favorites added yet.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-2 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {favorites.map((meal) => (
        <div
          key={meal.idMeal}
          className="relative overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
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
              className="text-indigo-600 underline text-sm hover:text-indigo-700"
            >
              View Details
            </Link>
          </div>

          <button
            className="absolute top-2 right-2 rounded bg-red-500 px-2 py-1 text-xs text-white shadow-sm transition hover:bg-red-600"
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
