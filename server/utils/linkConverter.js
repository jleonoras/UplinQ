// utils/linkConverter.js
export function getDownloadLink(viewUrl) {
  try {
    const url = new URL(viewUrl);

    if (url.pathname.startsWith("/file/d/")) {
      const pathParts = url.pathname.split("/");
      const fileId = pathParts[3];
      const authuser = new URLSearchParams(url.search).get("authuser") || "0";
      return `https://drive.usercontent.google.com/download?id=${fileId}&export=download&authuser=${authuser}`;
    } else if (url.pathname === "/open" && url.searchParams.has("id")) {
      const fileId = url.searchParams.get("id");
      const authuser = url.searchParams.get("authuser") || "0";
      return `https://drive.usercontent.google.com/download?id=${fileId}&export=download&authuser=${authuser}`;
    } else {
      throw new Error("File ID not found in the URL.");
    }
  } catch (error) {
    console.error("Error in getDownloadLink:", error.message);
    throw error;
  }
}
