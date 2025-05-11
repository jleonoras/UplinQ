import { ChevronsLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const msg = `The page you're looking for doesn't exist.`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b text-center px-6 py-12 transition-all duration-500">
      <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 dark:text-white mb-6 animate-fadeIn">
        404 - Page Not Found
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto leading-relaxed animate-fadeIn">
        {msg}
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none hover:shadow-2xl animate-fadeIn"
      >
        <span className="flex items-center gap-2">
          <ChevronsLeft />
          Return Home
        </span>
      </button>
    </div>
  );
};

export default NotFound;
