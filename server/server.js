import express from "express";
import cors from "cors";
import { getDownloadLink } from "./utils/linkConverter.js";
import { scrape } from "./utils/scrape.js";
import { getRemoteUploadLink } from "./utils/createRemoteUploadLink.js";
import rateLimit from "express-rate-limit";
import "dotenv/config";

const app = express();
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = ["https://dev.sinemo.sbs"];

    // In development, allow all origins
    if (process.env.NODE_ENV === "development") {
      callback(null, true);
    } else {
      // In production, only allow the specified origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  },
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

const host =
  process.env.NODE_ENV === "development" ? process.env.HOST : "0.0.0.0";

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
  res.json({
    status: "ok",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toLocaleString(),
  });
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  handler: (req, res) => {
    res.status(429).json({
      error: "Too many requests from this IP. Try again later.",
    });
  },
});

// API endpoint to convert and scrape
app.post("/api/convert", limiter, async (req, res) => {
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
    if (process.env.NODE_ENV === "development") {
      console.error("Error details:", error);
    }

    res.status(500).json({ error: error.message });
  }
});

app.listen(port, host, () => {
  console.log(`Server has started and running on http://${host}:${port}`);
});
