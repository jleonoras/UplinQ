import { useState } from "react";
import { useLinkGenerator } from "../hooks/useLinkGenerator";
import { useNotification } from "../context/NotificationContext";
import HowToModal from "./HowToModal";
import {
  Link as LinkIcon,
  ArrowUp,
  Clipboard,
  Check,
  Loader2,
  CircleX,
  HelpCircle,
} from "lucide-react";

// The UI component for the link generation form.
const LinkForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { notification } = useNotification();
  const {
    viewUrl,
    setViewUrl,
    generatedLink,
    isLoading,
    copied,
    inputRef,
    generateLink,
    copyLink,
    reset,
  } = useLinkGenerator();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    generateLink();
  };

  const isPermissionError =
    notification?.message?.toLowerCase().includes("private") ||
    notification?.message?.toLowerCase().includes("permission");
  const hasContent = generatedLink || viewUrl;

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="relative group">
          {/* Main container with refined focus and error states */}
          <div
            className={`relative flex items-center w-full bg-gray-100 dark:bg-gray-800 border rounded-full shadow-sm transition-all duration-300 ${
              isPermissionError
                ? "border-red-500/60 ring-4 ring-red-500/10"
                : "border-gray-200 dark:border-gray-700"
            } focus-within:ring-4 focus-within:ring-indigo-500/20 focus-within:border-indigo-500/80`}
          >
            <LinkIcon className="absolute w-5 h-5 text-gray-400 dark:text-gray-500 left-5" />
            <input
              ref={inputRef}
              type="text"
              value={generatedLink || viewUrl}
              onChange={(e) => {
                if (!generatedLink) {
                  setViewUrl(e.target.value);
                }
              }}
              readOnly={!!generatedLink}
              placeholder="Paste a link to begin..."
              disabled={isLoading}
              className="w-full h-14 pl-14 pr-16 text-sm sm:text-base bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
            {/* Action Button Area - more uniform button styles */}
            <div className="absolute top-1/2 right-2 -translate-y-1/2 h-10 w-10">
              {generatedLink ? (
                // Copy button
                <button
                  type="button"
                  onClick={copyLink}
                  className={`h-full w-full flex items-center justify-center rounded-full transition-colors duration-200 ${
                    copied
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                  aria-label="Copy link"
                >
                  {copied ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Clipboard className="w-5 h-5" />
                  )}
                </button>
              ) : (
                // Generate button
                <button
                  type="submit"
                  disabled={isLoading || !viewUrl}
                  className="h-full w-full flex items-center justify-center rounded-full bg-gray-200 text-gray-500 transition-colors duration-200 dark:bg-gray-700 dark:text-gray-400 enabled:hover:bg-indigo-500 enabled:hover:text-white dark:enabled:hover:bg-indigo-500 disabled:cursor-not-allowed"
                  aria-label="Generate link"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <ArrowUp className="w-5 h-5" />
                  )}
                </button>
              )}
            </div>
          </div>
          {hasContent && (
            <button
              type="button"
              onClick={reset}
              className="flex items-center gap-1 absolute top-full right-4 mt-2 p-1 text-xs text-gray-500 hover:text-gray-800 dark:hover:text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
              aria-label="Start over"
            >
              <CircleX className="w-4 h-4" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </form>
      {isPermissionError && (
        <div className="mt-3 text-center px-2">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline text-sm"
          >
            <HelpCircle className="w-4 h-4 flex-shrink-0" />
            <span>How do I make my file public?</span>
          </button>
        </div>
      )}
      <HowToModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default LinkForm;
