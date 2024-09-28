import { useState } from "react";
import "./App.css";

const App = () => {
  const [viewUrl, setViewUrl] = useState("");
  const [remoteUploadLink, setRemoteUploadLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setRemoteUploadLink(""); // Clear the previous link
    try {
      const response = await fetch("http://localhost:5000/api/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ viewUrl }),
      });
      const data = await response.json();
      if (response.ok) {
        setRemoteUploadLink(data.remoteUploadLink);
      } else {
        alert(data.error || "An error occurred");
      }
    } catch (error) {
      alert("Failed to generate link. Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(remoteUploadLink);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="App">
      <h1>GDrive2Cloud</h1>
      <p>
        Upload movies from Google Drive directly to Filemoon, Vidhide, and
        Streamwish!
      </p>
      <input
        type="text"
        value={viewUrl}
        onChange={(e) => setViewUrl(e.target.value)}
        placeholder="Enter Google Drive view URL"
      />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? (
          <div className="dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        ) : (
          "Generate Remote Upload Link"
        )}
      </button>
      {remoteUploadLink && (
        <div className="result">
          <p>Generated Remote Upload Link:</p>
          <input type="text" value={remoteUploadLink} readOnly />
          <button onClick={handleCopy} className="copy-button">
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
