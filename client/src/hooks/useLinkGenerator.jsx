import { useState, useRef } from "react";
import axios from "axios";
import { useNotification } from "../context/NotificationContext";
import { API_BASE } from "../utils/api";

// This custom hook encapsulates all the logic for the link generation form.
export const useLinkGenerator = () => {
  // Use our unified notification system.
  const { showNotification } = useNotification();
  const [viewUrl, setViewUrl] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  // Handles the API call to generate a new link.
  const generateLink = async () => {
    if (isLoading) return;

    const isValidDriveUrl =
      /^(https:\/\/)?drive\.google\.com\/(file\/d\/|open\?id=|uc\?id=)[\w-]+/.test(
        viewUrl.trim()
      );

    if (!viewUrl.trim() || !isValidDriveUrl) {
      showNotification("Please enter a valid Google Drive share URL.", "error");
      return;
    }

    setIsLoading(true);
    setGeneratedLink("");

    try {
      const response = await axios.post(`${API_BASE}/convert`, { viewUrl });
      setGeneratedLink(response.data.remoteUploadLink);
    } catch (err) {
      console.error("Error generating link:", err);
      const errorMessage =
        err.response?.data?.error ||
        "Failed to generate link. Please try again.";
      showNotification(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Handles copying the generated link to the user's clipboard.
  const copyLink = () => {
    if (!generatedLink) return;

    try {
      navigator.clipboard.writeText(generatedLink);
      setCopied(true);

      // Use our new notification system instead of react-toastify.
      showNotification("Link Copied!", "success");
    } catch (error) {
      showNotification("Failed to copy link.", "error");
      console.error("Clipboard error:", error);
    }

    // Reset the copied state after 2 seconds.
    setTimeout(() => setCopied(false), 2000);
  };

  // Resets the form to its initial state.
  const reset = () => {
    setViewUrl("");
    setGeneratedLink("");
    setCopied(false);
  };

  // Return all the necessary state and functions for the component to use.
  return {
    viewUrl,
    setViewUrl,
    generatedLink,
    isLoading,
    copied,
    inputRef,
    generateLink,
    copyLink,
    reset,
  };
};
