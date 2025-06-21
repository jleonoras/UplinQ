import { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CheckCircle2 } from "lucide-react";

// --- API UTILITY (can be in its own file, e.g., /utils/api.js) ---
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

// --- THE CUSTOM HOOK ---
export const useLinkGenerator = () => {
  const [viewUrl, setViewUrl] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const generateLink = async () => {
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

  const copyLink = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    inputRef.current?.select(); // The ref is used here

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

  const reset = () => {
    setViewUrl("");
    setGeneratedLink("");
    setError("");
    setCopied(false);
  };

  // Return the state and functions that the component will need
  return {
    viewUrl,
    setViewUrl,
    generatedLink,
    isLoading,
    error,
    setError,
    copied,
    inputRef,
    generateLink,
    copyLink,
    reset,
  };
};
