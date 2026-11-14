import express from "express";
import cors from "cors";
import convertRoutes from "./routes/convertRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import { corsOptions } from "./middleware/corsOptions.js";
import { logRequests, handleCorsError } from "./middleware/devLogger.js";
import "dotenv/config";

const app = express();
app.set("trust proxy", "loopback");

export const resolveServerHost = (
	host = process.env.HOST,
	environment = process.env.NODE_ENV,
) => {
	if (typeof host === "string" && host.trim()) {
		return host;
	}

	return environment === "development" ? "0.0.0.0" : "0.0.0.0";
};

app.use(cors(corsOptions));

const host = resolveServerHost();
const port = process.env.PORT || 7000;

if (process.env.NODE_ENV === "development") {
	console.log("Environment:", process.env.NODE_ENV);

	app.use(handleCorsError);
	app.use(logRequests);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.status(200).json({
		status: "ok",
		service: "uplinq",
		environment: process.env.NODE_ENV || "development",
	});
});

app.use("/api/health", healthRoutes);
app.use("/api/convert", convertRoutes);

const isServerEntrypoint =
	process.argv[1]?.endsWith("server.js") ||
	process.env.pm_exec_path?.endsWith("server.js");

if (isServerEntrypoint) {
	app.listen(port, host, () => {
		console.log(`Server has started and running on ${host}:${port}`);
	});
}
