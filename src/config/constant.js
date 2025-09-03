import { Platform } from 'react-native';
import {
  CU_PRODUCT_NAME,
  CU_URL,
  BU_URL,
  BU_LIBRARY_HOST,
  BU_STORAGE_WRITE_KEY,
  BU_STORAGE_ZONE,
  BU_LIBRARY_ID,
  BU_LIBRARY_API_KEY
} from '@env';

export const PRODUCT_NAME = CU_PRODUCT_NAME;
export const CU_BASE_URL = CU_URL;
export const BU_BASE_URL = BU_URL;
export const LIBRARY_HOST = BU_LIBRARY_HOST;
export const STORAGE_WRITE_KEY = BU_STORAGE_WRITE_KEY;
export const STORAGE_ZONE = BU_STORAGE_ZONE;
export const LIBRARY_ID = BU_LIBRARY_ID;
export const LIBRARY_API_KEY = BU_LIBRARY_API_KEY;
export const LIST_COLLECTION_PREFIX = 'cinema_unlimited';
export const catNav = [
  { label: 'Home', route: '/' },
  { label: 'Movies', route: '/' },
  { label: 'TV series', route: '/' }
];

export const isMobile = !Platform.isTV && Platform.OS !== 'web';

export const isWeb = Platform.isTV || Platform.OS === 'web';
