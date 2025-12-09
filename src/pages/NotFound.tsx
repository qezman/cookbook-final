import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900">404 - Page Not Found</h2>
      <p className="mt-2 text-gray-600">The page you are looking for doesn’t exist or has been moved.</p>
      <div className="mt-6">
        <Link to="/" className="inline-flex items-center rounded-xl bg-indigo-600 px-5 py-2 text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300">
          Go back home
        </Link>
      </div>
    </div>
  );
};
export default NotFound;
