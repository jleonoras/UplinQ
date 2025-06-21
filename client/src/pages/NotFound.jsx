import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, ArrowLeft } from "lucide-react";

// Reusing the animation variants from your Home component for consistency
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, ease: "easeInOut" },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const NotFound = () => {
  const navigate = useNavigate();
  const msg = "The page you are looking for could not be found.";

  return (
    // 1. Use the same background and base text colors as the Home page
    <div className="min-h-screen font-sans bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* 2. Use the same main container and positioning */}
      <main className="px-4 py-20 text-center sm:py-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-3xl mx-auto"
        >
          {/* 3. Use a relevant icon styled like the Home page's hero icon */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center"
          >
            <AlertTriangle className="w-10 h-10 text-amber-500 sm:w-12 sm:h-12" />
          </motion.div>

          {/* 4. Match the typography (font size, weight, color) of the Home hero */}
          <motion.h1
            variants={itemVariants}
            className="mt-6 text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
          >
            404 - Not Found
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto mt-6 text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg"
          >
            {msg}
          </motion.p>

          {/* 5. Style the button to be identical to the primary action buttons in LinkForm */}
          <motion.div variants={itemVariants} className="mt-12">
            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center gap-2 px-6 py-3 mx-auto text-sm font-semibold text-white bg-indigo-500 rounded-lg shadow-sm hover:bg-indigo-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <ArrowLeft className="w-4 h-4" />
              Return Home
            </button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default NotFound;
