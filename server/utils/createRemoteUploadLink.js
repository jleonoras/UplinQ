// utils/createRemoteUploadLink.js

export function getRemoteUploadLink(downloadLink, scrapedData) {
  if (!downloadLink || typeof scrapedData !== "object") {
    throw new Error("Invalid input for remote upload link generation");
  }

  const { confirm, uuid, at } = scrapedData;

  // Use URL object to construct the final remote upload link
  const base = new URL(downloadLink);
  base.searchParams.set("confirm", confirm);
  base.searchParams.set("uuid", uuid);
  if (at) base.searchParams.set("at", at);

  return base.toString();
}
