import { Link, Outlet } from "react-router-dom";
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
  export default App;