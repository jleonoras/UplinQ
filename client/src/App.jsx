import { useState } from "react";
import axios from "axios"; // Import Axios
import "./App.css";

function App() {
  const [viewUrl, setViewUrl] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateLink = async () => {
    if (!viewUrl) {
      alert("Please enter a Google Drive link.");
      return;
    }

    setIsLoading(true);
    setGeneratedLink(""); // Clear the previous generated link

    try {
      const response = await axios.post(
        "/api/convert",
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
    alert("Link copied to clipboard!");
  };

  return (
    <div className="box">
      <h1>GDrive2Cloud</h1>
      <p>
        Easily Generate Direct Download Links from Google Drive and Upload to
        Filemoon, Vidhide, and Streamwish via Remote URL.
      </p>
      <p className="small-description">
        This tool converts Google Drive view URLs into direct download links,
        enabling seamless remote uploads to popular video hosting platforms like
        Filemoon, Vidhide, and Streamwish. Perfect for quickly sharing large
        files, especially movie uploads.
      </p>

      {/* Input field and button hidden if generatedLink is present */}
      {!generatedLink && (
        <>
          <input
            type="text"
            placeholder="Enter Google Drive link..."
            value={viewUrl}
            onChange={(e) => setViewUrl(e.target.value)}
          />
          <button onClick={handleGenerateLink} disabled={isLoading}>
            {isLoading ? (
              <span className="dots">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
            ) : (
              "Generate Upload Link"
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
          <button className="copy-button" onClick={handleCopyLink}>
            Copy Link
          </button>
          <button
            className="new-link-button"
            onClick={() => {
              setGeneratedLink(""); // Clear the generated link
              setViewUrl(""); // Clear the input URL
            }}
          >
            Generate New Link
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
