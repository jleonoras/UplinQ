import { useState } from "react";
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
      const response = await fetch("http://localhost:5000/api/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ viewUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate link");
      }

      const data = await response.json();
      setGeneratedLink(data.remoteUploadLink); // Set the new generated link
    } catch (error) {
      console.error("Error generating link:", error);
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
        This web app allows you to upload movie files to Filemoon, Vidhide, and
        Streamwish.
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
