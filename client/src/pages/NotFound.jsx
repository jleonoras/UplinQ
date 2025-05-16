import { ChevronsLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const msg = `The page you're looking for doesn't exist.`;

  const baseButton =
    "px-4 py-3.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200 flex justify-center items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed";

  const containerClass =
    "flex items-center justify-center min-h-screen px-4 bg-gray-100 dark:bg-gray-700";
  const cardClass =
    "w-full sm:w-[90%] md:w-[80%] lg:w-[60%] p-6 sm:p-8 md:p-10 bg-white dark:bg-gray-800 rounded-xl shadow-2xl space-y-8 text-center";

  return (
    <div className={containerClass}>
      <div className={cardClass}>
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6 animate-fadeIn">
          404 - Page Not Found
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed animate-fadeIn">
          {msg}
        </p>
        <button
          onClick={() => navigate("/")}
          className={`${baseButton} w-full sm:w-auto mx-auto animate-fadeIn hover:scale-105 shadow-lg hover:shadow-2xl`}
        >
          <span className="flex items-center gap-1">
            <ChevronsLeft />
            Return Home
          </span>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
