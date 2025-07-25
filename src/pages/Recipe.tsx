import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFavorites } from "../components/context/FavoritesContext";

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

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
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

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-center text-3xl font-bold">Recipe Detail Page</h1>

      {/* Favorite toggle button */}
      <div className="text-center">
        <button
          onClick={handleToggleFavorite}
          className={`px-4 py-2 rounded text-white ${
            isFavorite(meal.idMeal)
              ? "bg-red-500 hover:bg-red-600"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {isFavorite(meal.idMeal)
            ? "Remove from Favorites"
            : "Add to Favorites"}
        </button>
      </div>

      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="rounded w-full min-h-96 object-cover"
      />

      <section>
        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside space-y-1">
          {getIngredients(meal).map((item, id) => (
            <li key={id}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Instructions</h2>
        <p className="whitespace-pre-line text-gray-700">
          {meal.strInstructions}
        </p>
      </section>

      {meal.strYoutube && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Video</h2>
          <a
            href={meal.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 underline"
          >
            Watch on YouTube
          </a>
        </section>
      )}
    </div>
  );
}
