import "dotenv/config";

export const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "https://dev.sinemo.sbs",
      "https://uplinq.streamojo.eu.org",
      "https://uplinq.vercel.app",
    ];

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
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};
