import { LIBRARY_HOST } from "../config/constant";

export const generateSignedUrl = () => {
  // usage:
  const libraryHost = "vz-aa63d409-53a.b-cdn.net";
  const videoGuid = "d4baa53a-e3e8-4ccc-b770-ef6ecc27a2a0";
  const path = `/${videoGuid}/playlist.m3u8`;

  return `https://${libraryHost}${path}`;
};

export const getThumbnailUrl = (videoGuid) => {
  return `https://${LIBRARY_HOST}/${videoGuid}/thumbnail.jpg`;
};

export const getVideoUrl = (videoGuid) => {
  return `https://${LIBRARY_HOST}/${videoGuid}/playlist.m3u8`;
};
