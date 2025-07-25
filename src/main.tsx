import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
} from "react-router-dom";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import "./index.css";
import { FavoritesProvider } from "./components/context/FavoritesContext";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">Cookbook</h1>
        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-indigo-600">
            Home
          </Link>
          <Link to="/favorites" className="text-gray-700 hover:text-indigo-600">
            Favorites
          </Link>
        </div>
      </nav>

      <main className="p-6">
        <Outlet />
        <Toaster position="top-right" />
      </main>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // layout with nav + Outlet
    children: [
      { index: true, element: <Home /> },
      { path: "recipe/:id", element: <Recipe /> },
      { path: "favorites", element: <Favorites /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

// Mount the app
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FavoritesProvider>
      <RouterProvider router={router} />
    </FavoritesProvider>
  </React.StrictMode>
);
