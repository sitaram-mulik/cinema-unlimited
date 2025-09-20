import { View, Platform } from 'react-native';

export const isMobile = () => !Platform.isTV && Platform.OS !== 'web';

export const isWeb = () => Platform.isTV || Platform.OS === 'web';

export const getByteSizeinUnit = (bytes, decimals = 2) => {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
};

export const getHorizontalAspectHeight = width => Number((width * 9) / 16).toFixed(0);
export const getVerticalAspectHeight = width => (width * 9) / 16;
