import { useState } from "react";
import axios from "axios"; // Import Axios
import "../App.css";

const API_BASE = import.meta.env.VITE_API_HOST_PROD || "/api";

const Home = () => {
  const [viewUrl, setViewUrl] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateLink = async () => {
    const isValidDriveUrl =
      /^(https:\/\/)?(drive\.google\.com\/(file\/d\/|open\?id=))/.test(
        viewUrl.trim()
      );
    if (!viewUrl.trim() || !isValidDriveUrl) {
      alert("Please enter a valid Google Drive view URL.");
      setIsLoading(false); // stop loading if triggered accidentally
      return;
    }

    setIsLoading(true);
    setGeneratedLink(""); // Clear the previous generated link

    try {
      const response = await axios.post(
        `${API_BASE}/convert`,
        {
          viewUrl,
        },
        {
          headers: {
            "Content-Type": "application/json", // Specify that you're sending JSON
          },
        }
      );

      setGeneratedLink(response.data.remoteUploadLink); // Set the new generated link
    } catch (error) {
      console.error("Error generating link: ", error);
      alert("Error generating link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true); // Show "Copied!"
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="box">
      <h1>UplinQ</h1>
      <p>
        Quickly turn Google Drive view links into direct downloads and remote
        upload them to Filemoon, EarnVids, or Streamwish — perfect for sharing
        large videos.
      </p>
      {/* <p className="small-description">
          This tool converts Google Drive view URLs into direct download links,
          enabling seamless remote uploads to popular video hosting platforms like
          Filemoon, EarnVids, and Streamwish. Perfect for quickly sharing large
          files, especially movie uploads.
        </p> */}

      {/* Input field and button hidden if generatedLink is present */}
      {!generatedLink && (
        <>
          <input
            type="text"
            value={viewUrl}
            onChange={(e) => setViewUrl(e.target.value)}
            placeholder="Enter Google Drive view URL..."
            disabled={isLoading}
          />
          <button onClick={handleGenerateLink} disabled={isLoading}>
            {isLoading ? (
              <span className="dots">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
            ) : (
              "🔗 Generate Upload Link"
            )}
          </button>
        </>
      )}

      {/* Display the generated link and related buttons */}
      {generatedLink && (
        <div className="result">
          <input
            type="text"
            className="generated-link"
            value={generatedLink}
            readOnly
          />
          <button
            onClick={handleCopyLink}
            className={`copy-button ${copied ? "copied" : ""}`}
          >
            {copied ? "✅ Copied!" : "📋 Copy Link"}
          </button>
          <button
            className="new-link-button"
            onClick={() => {
              setGeneratedLink(""); // Clear the generated link
              setViewUrl(""); // Clear the input URL
            }}
          >
            🚀 Generate New Link
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
