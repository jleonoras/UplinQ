// client/vite.config.js
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const apiHost = env.VITE_API_HOST || "localhost";
  const apiPort = env.VITE_API_PORT || "7000";
  const apiProtocol = apiPort === "443" ? "https" : "http";
  const apiUrl = `${apiProtocol}://${apiHost}:${apiPort}`;

  if (mode === "development") {
    console.log("VITE config mode:", mode);
  }

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: apiUrl,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  });
};
