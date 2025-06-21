import {
  Link as LinkIcon,
  ArrowRight,
  Clipboard,
  ClipboardCheck,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { useLinkGenerator } from "./hooks/useLinkGenerator"; // Adjust path as needed

const LinkForm = () => {
  // All the complex logic is now contained in this single line!
  const {
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
  } = useLinkGenerator();

  const handleFormSubmit = (e) => {
    e.preventDefault(); // The component still handles the DOM event itself
    generateLink(); // Then calls the logic from the hook
  };

  const hasContent = generatedLink || viewUrl;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleFormSubmit}>
        <div className="relative group">
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
              ref={inputRef} // Attach the ref from the hook to the input element
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
            <div className="absolute top-0 right-0 h-full p-2">
              {generatedLink ? (
                <button type="button" onClick={copyLink} className="...">
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
                <button
                  type="submit"
                  disabled={isLoading || !viewUrl}
                  className="..."
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

          {hasContent && (
            <button
              type="button"
              onClick={reset}
              className="..."
              aria-label="Start over"
            >
              Clear
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

export default LinkForm; // Assuming this is now in its own file
