import { useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import {
  Rocket,
  UploadCloud,
  Link as LinkIcon,
  FileText,
  ArrowRight,
  Clipboard,
  ClipboardCheck,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  CircleX,
} from "lucide-react";

// --- ANIMATION VARIANTS ---
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

// --- API UTILITY ---
const getApiBaseUrl = () => {
  const isDev = import.meta.env.MODE === "development";
  const host = isDev
    ? import.meta.env.VITE_API_HOST_DEV
    : import.meta.env.VITE_API_HOST_PROD;
  const port = isDev
    ? import.meta.env.VITE_API_PORT_DEV
    : import.meta.env.VITE_API_PORT_PROD;
  const cleanedHost = host.replace(/\/+$/, "");
  const hasProtocol = /^https?:\/\//.test(cleanedHost);
  const fullHost = hasProtocol ? cleanedHost : `http://${cleanedHost}`;
  const hasPort = port && port !== "443" && port !== "80";
  return `${fullHost}${hasPort ? `:${port}` : ""}/api`;
};

const API_BASE = getApiBaseUrl();

// --- LINKFORM COMPONENT ("Sleek Action Bar" Design) ---
const LinkForm = () => {
  const [viewUrl, setViewUrl] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const handleGenerateLink = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    const isValidDriveUrl =
      /^(https:\/\/)?drive\.google\.com\/(file\/d\/|open\?id=|uc\?id=)[\w-]+/.test(
        viewUrl.trim()
      );

    if (!viewUrl.trim() || !isValidDriveUrl) {
      setError("Please enter a valid Google Drive share URL.");
      return;
    }

    setError("");
    setIsLoading(true);
    setGeneratedLink("");

    try {
      const response = await axios.post(
        `${API_BASE}/convert`,
        { viewUrl },
        { headers: { "Content-Type": "application/json" } }
      );
      setGeneratedLink(response.data.remoteUploadLink);
    } catch (err) {
      console.error("Error generating link:", err);
      const errorMessage =
        err.response?.data?.error ||
        "Failed to generate link. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    inputRef.current?.select();

    toast.dismiss();
    toast(
      <div className="flex items-center gap-2 font-semibold">
        <CheckCircle2 className="w-5 h-5 text-green-500" />
        <span>Link Copied!</span>
      </div>,
      {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        className: "dark:bg-gray-700 dark:text-white rounded-lg",
      }
    );

    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setViewUrl("");
    setGeneratedLink("");
    setError("");
    setCopied(false);
  };

  const hasContent = generatedLink || viewUrl;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleGenerateLink}>
        <div className="relative group">
          {/* Main container for the input and button */}
          <div
            className={`
              relative flex items-center w-full bg-white dark:bg-gray-800/50
              border-2 rounded-xl shadow-sm transition-all duration-300
              ${
                error
                  ? "border-red-500 ring-4 ring-red-500/10"
                  : "border-gray-200 dark:border-gray-700"
              }
              focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/20
            `}
          >
            <LinkIcon className="absolute w-5 h-5 text-gray-400 left-4" />
            <input
              ref={inputRef}
              type="text"
              value={generatedLink || viewUrl}
              onChange={(e) => {
                if (!generatedLink) {
                  setViewUrl(e.target.value);
                  if (error) setError("");
                }
              }}
              readOnly={!!generatedLink}
              placeholder="Paste your Google Drive URL to begin..."
              disabled={isLoading}
              className="w-full h-14 pl-12 pr-28 sm:pr-40 text-base bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
            {/* Action Button Area */}
            <div className="absolute top-0 right-0 h-full p-2">
              {generatedLink ? (
                // --- Success State Button ---
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="h-full flex items-center justify-center aspect-square sm:aspect-auto sm:px-4 bg-green-500 text-white rounded-lg shadow-sm hover:bg-green-600 transition-all duration-200"
                >
                  {copied ? (
                    <ClipboardCheck className="w-5 h-5" />
                  ) : (
                    <Clipboard className="w-5 h-5" />
                  )}
                  <span className="hidden ml-2 text-sm font-semibold sm:inline">
                    {copied ? "Copied!" : "Copy"}
                  </span>
                </button>
              ) : (
                // --- Initial State Button ---
                <button
                  type="submit"
                  disabled={isLoading || !viewUrl}
                  className="h-full flex items-center justify-center aspect-square sm:aspect-auto sm:px-4 bg-indigo-500 text-white rounded-lg shadow-sm hover:bg-indigo-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <ArrowRight className="w-5 h-5" />
                  )}
                  <span className="hidden ml-2 text-sm font-semibold sm:inline">
                    {isLoading ? "Generating..." : "Generate"}
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Clear button - only shows when there is content */}
          {hasContent && (
            <button
              type="button"
              onClick={handleReset}
              // The three new classes have been added here at the beginning
              className="flex items-center gap-1 absolute top-full right-0 mt-2 p-1 text-xs text-gray-500 hover:text-gray-800 dark:hover:text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
              aria-label="Start over"
            >
              <CircleX />
              <span>Clear</span>
            </button>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-2 mt-3 px-3 text-sm text-red-600 dark:text-red-400 animate-fade-in">
            <AlertTriangle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}
      </form>
    </div>
  );
};

// --- FEATURE CARD COMPONENT ---
const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    variants={itemVariants}
    className="flex flex-col items-start p-6 bg-white dark:bg-gray-800/50 rounded-lg shadow-sm"
  >
    <div className="flex items-center justify-center w-12 h-12 mb-4 bg-indigo-100 rounded-lg dark:bg-gray-700">
      {icon}
    </div>
    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
      {title}
    </h3>
    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
  </motion.div>
);

FeatureCard.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const featuresData = [
  {
    icon: (
      <UploadCloud className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
    ),
    title: "Remote Upload",
    description:
      "Upload files directly from a URL without downloading them first.",
  },
  {
    icon: <LinkIcon className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />,
    title: "Direct Downloads",
    description:
      "Generate permanent direct download links from Google Drive files.",
  },
  {
    icon: <FileText className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />,
    title: "Large File Support",
    description:
      "Our service is optimized for sharing large video files with ease.",
  },
];

// --- MAIN HOME PAGE COMPONENT ---
const Home = () => {
  return (
    <div className="min-h-screen font-sans bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <main className="px-4 py-20 text-center sm:py-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-3xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3"
          >
            <Rocket className="w-10 h-10 text-indigo-500 sm:w-12 sm:h-12" />
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              UplinQ
            </h1>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto mt-6 text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg"
          >
            The simplest way to convert Google Drive links to direct downloads
            and remote upload files across the web.
          </motion.p>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="max-w-2xl mx-auto mt-4 text-sm text-gray-500 dark:text-gray-400"
        >
          <span>
            Currently supports publicly shared files (&quot;Anyone with the
            link&quot;).
          </span>
        </motion.p>

        {/* LinkForm Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto mt-12"
        >
          <LinkForm />
        </motion.div>
      </main>

      {/* Features Section */}
      <section className="py-20 bg-white sm:py-24 dark:bg-gray-800/50">
        <motion.div
          className="max-w-5xl px-4 mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Powerful Features, Simplified
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-gray-600 dark:text-gray-400">
              Everything you need to streamline your file sharing workflow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {featuresData.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* ToastContainer for notifications */}
      <ToastContainer theme="colored" />
    </div>
  );
};

export default Home;
