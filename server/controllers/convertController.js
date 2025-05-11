import { getDownloadLink } from "../utils/linkConverter.js";
import { scrape } from "../utils/scrape.js";
import { getRemoteUploadLink } from "../utils/createRemoteUploadLink.js";

export const handleConvert = async (req, res) => {
  const { viewUrl } = req.body;

  if (!viewUrl) {
    return res.status(400).json({ error: "viewUrl is required" });
  }

  try {
    const downloadLink = getDownloadLink(viewUrl);
    const scrapedData = await scrape(downloadLink);
    const remoteUploadLink = getRemoteUploadLink(downloadLink, scrapedData);

    if (process.env.NODE_ENV === "development") {
      console.log("Conversion successful!");
    }

    res.json({
      message: "Conversion successful",
      downloadLink,
      scrapedData,
      remoteUploadLink,
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error details:", error);
    }

    res.status(500).json({ error: error.message });
  }
};
