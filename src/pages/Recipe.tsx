import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFavorites } from "../components/context/FavoritesContext";
import { SkeletonCard } from "../Skeleton";

interface MealDetail {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
  [key: string]: string; // ingredents
}

export default function Recipe() {
  const { id } = useParams();
  const [meal, setMeal] = useState<MealDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => setMeal(data.meals?.[0] || null))
      .finally(() => setLoading(false));
  }, [id]);

  const getIngredients = (meal: MealDetail) => {
    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient) ingredients.push(`${ingredient} - ${measure}`);
    }
    return ingredients;
  };

  if (loading)
    return (
      <p className="text-center text-gray-500">
        <SkeletonCard />
      </p>
    );
  if (!meal) return <p className="text-center text-red-500">Meal not found.</p>;

  const handleToggleFavorite = () => {
    if (!meal) return;
    if (isFavorite(meal.idMeal)) {
      removeFavorite(meal.idMeal);
    } else {
      const { idMeal, strMeal, strMealThumb } = meal;
      addFavorite({ idMeal, strMeal, strMealThumb });
    }
  };

  const steps = meal.strInstructions
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  const youtubeId = meal.strYoutube?.match(/[?&]v=([^&]+)/)?.[1];

  return (
    <div className="mx-auto max-w-6xl px-2 sm:px-6 space-y-8">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-indigo-600">Home</Link>
        <span>/</span>
        <span className="text-gray-700">Recipe</span>
      </div>

      <div className="flex items-start justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{meal.strMeal}</h1>
        <button
          onClick={handleToggleFavorite}
          className={`rounded-xl px-5 py-2 text-white shadow-sm transition focus:outline-none focus:ring-2 ${
            isFavorite(meal.idMeal)
              ? "bg-red-500 hover:bg-red-600 focus:ring-red-300"
              : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-300"
          }`}
        >
          {isFavorite(meal.idMeal) ? "Remove Favorite" : "Add to Favorites"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2">
          <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="md:col-span-3 space-y-6">
          <section className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Ingredients</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {getIngredients(meal).map((item, id) => (
                <li key={id} className="text-sm">
                  <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-indigo-700 ring-1 ring-indigo-100">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Instructions</h2>
            {steps.length > 1 ? (
              <ol className="space-y-3 list-decimal list-inside">
                {steps.map((s, i) => (
                  <li key={i} className="text-gray-700">{s}</li>
                ))}
              </ol>
            ) : (
              <p className="whitespace-pre-line text-gray-700">{meal.strInstructions}</p>
            )}
          </section>

          {youtubeId && (
            <section className="rounded-xl border bg-white p-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-3">Video</h2>
              <div className="aspect-video w-full overflow-hidden rounded-lg">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
