import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import toast from "react-hot-toast";

// Simplified type for favorited meals
interface FavoriteMeal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

// Define the shape of the context
interface FavoritesContextType {
  favorites: FavoriteMeal[];
  addFavorite: (meal: FavoriteMeal) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

// Create the context
const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

// Hook to use favorites context in other components
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error("useFavorites must be used within a FavoritesProvider");
  return context;
}

// Wrap your entire app with this provider in main.tsx or App.tsx
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteMeal[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist changes to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add a new favorite if it's not already added
  const addFavorite = (meal: FavoriteMeal) => {
    setFavorites((prev) =>
      prev.find((m) => m.idMeal === meal.idMeal) ? prev : [...prev, meal]
    );
    toast.success(`${meal.strMeal} added to favorites`);
  };

  // Remove favorite by ID (toast is handled in the UI)
  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((m) => m.idMeal !== id));
  };

  const isFavorite = (id: string) => favorites.some((m) => m.idMeal === id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
