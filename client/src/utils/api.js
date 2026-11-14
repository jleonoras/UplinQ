// This function determines the correct API base URL for development and production.
export const getApiBaseUrl = () => {
	const isDev = import.meta.env.MODE === "development";

	const host = isDev
		? import.meta.env.VITE_API_HOST_DEV || "localhost"
		: import.meta.env.VITE_API_HOST_PROD || "uplinq.streamojo.eu.org";

	const port = isDev
		? import.meta.env.VITE_API_PORT_DEV || "7000"
		: import.meta.env.VITE_API_PORT_PROD || "443";

	const cleanedHost = (host || "localhost").replace(/\/+$/, "");
	const hasProtocol = /^https?:\/\//.test(cleanedHost);
	const fullHost = hasProtocol ? cleanedHost : `http://${cleanedHost}`;
	const hasPort = port && port !== "443" && port !== "80";

	return `${fullHost}${hasPort ? `:${port}` : ""}/api`;
};

// Export the generated API base URL for use throughout the application.
export const API_BASE = getApiBaseUrl();
