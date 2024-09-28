// utils/createRemoteUploadLink.js

export function getRemoteUploadLink(downloadLink, scrapedData) {
  const { id, export: exportParam, authuser, confirm, uuid, at } = scrapedData;

  // Create the base remote upload URL (without 'your-remote-service.com')
  let remoteUploadUrl = `${downloadLink}&confirm=${confirm}&uuid=${uuid}`;

  // Add the 'at' parameter only if it exists
  if (at) {
    remoteUploadUrl += `&at=${encodeURIComponent(at)}`;
  }

  return remoteUploadUrl;
}
