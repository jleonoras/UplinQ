export const logRequests = (req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
};

export const handleCorsError = (err, req, res, next) => {
  if (err instanceof Error && err.message === "Not allowed by CORS") {
    console.warn("⚠️ CORS blocked a request:", req.headers.origin);
  }
  next(err);
};
