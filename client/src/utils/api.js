// This function determines the correct API base URL for development and production.
export const getApiBaseUrl = () => {
  // Check if the application is running in development mode using Vite's environment variables.
  const isDev = import.meta.env.MODE === "development";

  // Get the host and port from environment variables, choosing the appropriate one for the environment.
  const host = isDev
    ? import.meta.env.VITE_API_HOST_DEV
    : import.meta.env.VITE_API_HOST_PROD;
  const port = isDev
    ? import.meta.env.VITE_API_PORT_DEV
    : import.meta.env.VITE_API_PORT_PROD;

  // Ensure there are no trailing slashes on the host.
  const cleanedHost = (host || "").replace(/\/+$/, "");

  // Check if the host already includes a protocol (http or https).
  const hasProtocol = /^https?:\/\//.test(cleanedHost);
  const fullHost = hasProtocol ? cleanedHost : `http://${cleanedHost}`;

  // Include the port in the final URL only if it's specified and not a standard web port (80 or 443).
  const hasPort = port && port !== "443" && port !== "80";
  return `${fullHost}${hasPort ? `:${port}` : ""}/api`;
};

// Export the generated API base URL for use throughout the application.
export const API_BASE = getApiBaseUrl();
