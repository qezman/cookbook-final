import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import "./index.css";
import { FavoritesProvider } from "./components/context/FavoritesContext";
import App from "./App";

<App />;

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
