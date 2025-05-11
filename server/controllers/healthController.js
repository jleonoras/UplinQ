import "dotenv/config";

export const healthCheck = (req, res) => {
  const now = new Date();
  const timestamp = now.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  res.status(200).json({
    status: "ok",
    environment: process.env.NODE_ENV || "development",
    timestamp,
  });
};
