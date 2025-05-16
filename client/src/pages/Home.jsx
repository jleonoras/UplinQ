import LinkForm from "../components/LinkForm";
import { motion } from "framer-motion";
import { Rocket, UploadCloud, Link as LinkIcon, File } from "lucide-react";
import "../App.css";

const containerClass =
  "flex items-center justify-center min-h-screen px-4 bg-gray-100 dark:bg-gray-700";
const cardClass =
  "w-full sm:w-[90%] md:w-[80%] lg:w-[60%] p-6 sm:p-8 md:p-10 bg-white dark:bg-gray-800 rounded-xl shadow-2xl space-y-8 text-center";

const Home = () => {
  return (
    <div className={containerClass}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className={cardClass}
      >
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-4xl sm:text-5xl font-extrabold text-blue-700 dark:text-blue-300 tracking-tight"
          >
            UplinQ
            <Rocket className="inline-block w-8 h-8 ml-2 text-purple-500 dark:text-purple-400" />
          </motion.h1>
          <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
            <span className="font-semibold">Transform</span> Google Drive public
            links into direct downloads and effortlessly upload to Filemoon,
            EarnVids (FileLions), StreamHG (Streamwish), or SuperVideo. Share
            large videos with ease!
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <LinkForm />
        </motion.div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <UploadCloud className="w-10 h-10 text-green-500 mb-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Remote Upload
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Upload files directly to hosting platforms.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <LinkIcon className="w-10 h-10 text-blue-500 mb-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Direct Downloads
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Generate direct download links.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <File className="w-10 h-10 text-purple-500 mb-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Large File Support
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Share large video files without hassle.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
