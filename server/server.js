import express from "express";
import cors from "cors";
import convertRoutes from "./routes/convertRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import { corsOptions } from "./middleware/corsOptions.js";
import { logRequests, handleCorsError } from "./middleware/devLogger.js";
import "dotenv/config";

const app = express();

const host =
  process.env.NODE_ENV === "development" ? process.env.HOST : "0.0.0.0";

const port = process.env.PORT || 7000;

app.use(cors(corsOptions));

if (process.env.NODE_ENV === "development") {
  console.log("Environment:", process.env.NODE_ENV);

  app.use(handleCorsError);
  app.use(logRequests);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/health", healthRoutes);

app.use("/api/convert", convertRoutes);

app.listen(port, host, () => {
  console.log(`Server has started and running on ${host}:${port}`);
});
