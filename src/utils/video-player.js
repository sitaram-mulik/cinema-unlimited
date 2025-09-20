import { LIBRARY_HOST, STORAGE_ZONE } from '../config/constant';

export const generateSignedUrl = () => {
  // usage:
  const libraryHost = 'vz-aa63d409-53a.b-cdn.net';
  const videoGuid = 'd4baa53a-e3e8-4ccc-b770-ef6ecc27a2a0';
  const path = `/${videoGuid}/playlist.m3u8`;

  return `https://${libraryHost}${path}`;
};

export const getThumbnailUrl = (videoGuid, thumbnailFileName) => {
  return `https://${LIBRARY_HOST}/${videoGuid}/${thumbnailFileName}`;
};

export const getVideoUrl = videoGuid => {
  return `https://${LIBRARY_HOST}/${videoGuid}/playlist.m3u8`;
};

export const getThumbnailStorageUrl = imagePath => {
  return `https://sg.storage.bunnycdn.com/${STORAGE_ZONE}/covers/${imagePath}`;
};

export const getThumbnailCDNUrl = filename => {
  return `https://${STORAGE_ZONE}.b-cdn.net/covers/${filename}`;
};
