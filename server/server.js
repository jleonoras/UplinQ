import express from "express";
import cors from "cors";
import { getDownloadLink } from "./utils/linkConverter.js";
import { scrape } from "./utils/scrape.js";
import { getRemoteUploadLink } from "./utils/createRemoteUploadLink.js";

const app = express();
const corsOptions = {
  origin: "*",
  methods: "GET,POST",
  allowedHeaders: "Content-Type",
};

const host = "localhost";
const port = 5000;

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.send("<h1 style='text-align: center'>GDrive2Cloud API</h1>");
});

// API endpoint to convert and scrape
app.post("/api/convert", async (req, res) => {
  const { viewUrl } = req.body;

  if (!viewUrl) {
    return res.status(400).json({ error: "viewUrl is required" });
  }

  try {
    // Generate the download link
    const downloadLink = getDownloadLink(viewUrl);

    // Scrape the data from the generated download link
    const scrapedData = await scrape(downloadLink);

    // Generate the remote upload link, without 'at' if it's undefined
    const remoteUploadLink = getRemoteUploadLink(downloadLink, scrapedData);

    // Send back the results
    res.json({
      downloadLink,
      scrapedData,
      remoteUploadLink, // Include the formatted remote upload link
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, host, () => {
  console.log(`Server has started and running on http://${host}:${port}`);
});
