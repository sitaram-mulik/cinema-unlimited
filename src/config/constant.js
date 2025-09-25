import { Dimensions, Platform } from 'react-native';
import {
  CU_PRODUCT_NAME,
  CU_URL,
  BU_URL,
  BU_LIBRARY_HOST,
  BU_STORAGE_WRITE_KEY,
  BU_STORAGE_ZONE,
  BU_LIBRARY_ID,
  BU_LIBRARY_API_KEY,
  BU_API_KEY
} from '@env';

export const PRODUCT_NAME = CU_PRODUCT_NAME;
export const CU_BASE_URL = CU_URL;
export const BU_BASE_URL = BU_URL;
export const LIBRARY_HOST = BU_LIBRARY_HOST;
export const STORAGE_WRITE_KEY = BU_STORAGE_WRITE_KEY;
export const STORAGE_ZONE = BU_STORAGE_ZONE;
export const LIBRARY_ID = BU_LIBRARY_ID;
export const LIBRARY_API_KEY = BU_LIBRARY_API_KEY;
export const ACCOUNT_API_KEY = BU_API_KEY;
export const RESERVED_COLLECTION_PREFIX = 'cu_reserved';
export const RESERVED_COLL_CAROUSAL_NAME = RESERVED_COLLECTION_PREFIX + '_carousel';
export const RESERVED_COLL_PENDING_NAME = RESERVED_COLLECTION_PREFIX + '_pending';
export const reservedCollections = [RESERVED_COLL_CAROUSAL_NAME, RESERVED_COLL_PENDING_NAME];
export const catNav = [
  { label: 'Home', route: '/' },
  { label: 'Movies', route: '/' },
  { label: 'TV series', route: '/' }
];

const { width } = Dimensions.get('window');
export const CONTAINER_WIDTH = 1700;
export const CAROUSEL_HEIGHT = 700;

export const isMobile = !Platform.isTV && (Platform.OS !== 'web' || width < 768);

export const isWeb = Platform.isTV || Platform.OS === 'web';

export const uploadStates = {
  INIT: 'PUBLISHING_STARTED',
  CREATED: 'RECORD_CREATED',
  VIDEO_UPLOADED: 'VIDEO_UPLOADED',
  COVER_UPLOADED: 'COVER_UPLOADED',
  COMPLETE: 'PUBLISHING_COMPLETED',
  ERROR: 'ERROR',
  START: 'VIDEO_UPLOAD_START',
  PAUSED: 'VIDEO_UPLOAD_PAUSED',
  RESUME: 'VIDEO_UPLOAD_RESUME',
  FAILED: 'FAILED'
};

export const buVideoStreamURL = `https://iframe.mediadelivery.net/embed/${LIBRARY_ID}`;
