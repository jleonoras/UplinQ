import express from "express";
import cors from "cors";
import { getDownloadLink } from "./utils/linkConverter.js";
import { scrape } from "./utils/scrape.js";
import { getRemoteUploadLink } from "./utils/createRemoteUploadLink.js";
import "dotenv/config";

const app = express();
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production" ? "https://dev.sinemo.sbs" : "*",
  methods: "GET,POST",
  allowedHeaders: "Content-Type",
};

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 7000;

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  console.log("Environment:", process.env.NODE_ENV);
}

if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
  });
}

app.get("/api/health", (req, res) => {
  res.send("OK");
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
