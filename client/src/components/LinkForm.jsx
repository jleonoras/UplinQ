import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for Toastify
import {
  BadgeCheck,
  ClipboardCheck,
  ClipboardList,
  Sparkles,
  TriangleAlert,
} from "lucide-react";

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

const LinkForm = () => {
  const [viewUrl, setViewUrl] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const customId = "custom-id-yes";

  const handleGenerateLink = async () => {
    const isValidDriveUrl =
      /^(https:\/\/)?(drive\.google\.com\/(file\/d\/|open\?id=))/.test(
        viewUrl.trim()
      );
    if (!viewUrl.trim() || !isValidDriveUrl) {
      setError("Please enter a valid Google Drive view URL.", {});
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
    } catch (error) {
      console.error("Error generating link:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast(<span className="flex items-center gap-2">Link Copied!</span>, {
      toastId: customId,
      icon: <BadgeCheck className="stroke-green-500" />,
      position: "top-center", // Adjust position as needed
      autoClose: 2000, // Auto close after 2 seconds
      hideProgressBar: true, // Hide the progress bar (optional)
      closeOnClick: true, // Close on click (optional)
      pauseOnHover: false, // No pause on hover
      draggable: false, // Disable dragging
      theme: "light", // Light theme for the toast
    });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-lg">
      {!generatedLink ? (
        <div className="flex flex-col gap-6">
          {error && (
            <span className="text-sm text-red-500 flex items-center gap-2">
              <TriangleAlert />
              {error}
            </span>
          )}

          <input
            type="text"
            value={viewUrl}
            onChange={(e) => setViewUrl(e.target.value)}
            placeholder="Paste Google Drive view URL here..."
            disabled={isLoading}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
          />

          <button
            onClick={handleGenerateLink}
            disabled={isLoading}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200 flex justify-center items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 animate-spin text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Generating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles />
                Generate Upload Link
              </span>
            )}
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="relative">
            <input
              type="text"
              value={generatedLink}
              readOnly
              className="w-full pr-12 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
            />
            <button
              onClick={handleCopyLink}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              title="Copy Link"
            >
              {copied ? <ClipboardCheck /> : <ClipboardList />}
            </button>
          </div>

          <button
            onClick={() => {
              setGeneratedLink("");
              setViewUrl("");
            }}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200 flex justify-center items-center gap-3"
          >
            <Sparkles />
            Generate New Link
          </button>
        </div>
      )}
    </div>
  );
};

export default LinkForm;
