// client/vite.config.js
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const serverHost = env.VITE_API_HOST_PROD;

  const apiHost =
    mode === "development" ? env.VITE_API_HOST_DEV : env.VITE_API_HOST_PROD;
  const apiPort =
    mode === "development"
      ? env.VITE_API_PORT_DEV || "7000"
      : env.VITE_API_PORT_PROD;
  const apiProtocol = apiPort === "443" ? "https" : "http";
  const apiUrl = `${apiProtocol}://${apiHost}:${apiPort}`;

  if (!apiHost || !apiPort) {
    throw new Error("Missing API host or port in environment variables.");
  }

  if (mode === "development") {
    console.log("VITE config mode:", mode);
    console.log("Proxying /api to:", apiUrl);
  }

  return defineConfig({
    define: {
      __API_HOST__: JSON.stringify(serverHost),
    },
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api": {
          target: apiUrl,
          changeOrigin: true,
        },
      },
    },
  });
};
