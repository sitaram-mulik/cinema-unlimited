import { categories } from '../constants/video';

// Action types
export const SET_ID = 'SET_ID';
export const SET_TITLE = 'SET_TITLE';
export const SET_COLLECTION_ID = 'SET_COLLECTION_ID';
export const SET_DESCRIPTION = 'SET_DESCRIPTION';
export const SET_CATEGORY = 'SET_CATEGORY';
export const SET_VIDEO_FILE = 'SET_VIDEO_FILE';
export const SET_THUMBNAIL_IMAGE = 'SET_THUMBNAIL_IMAGE';
export const SET_TAGS = 'SET_TAGS';
export const SET_GENRES = 'SET_GENRES';
export const RESET = 'RESET';

// Initial state
export const uploadVideoInitialState = {
  id: null,
  collectionId: '',
  title: '',
  description: '',
  category: categories.MOVIE,
  localVideoFile: null,
  localThumbnailFile: null,
  tags: ['Drama'],
  genres: [],
  status: 'pending',
  thumbnailFileName: null,
  version: 0,
  thumbnailStorageName: null
};

// Reducer function
export const uploadVideoReducer = (state, action) => {
  switch (action.type) {
    case SET_ID:
      return { ...state, title: action.payload };
    case SET_TITLE:
      return { ...state, title: action.payload };
    case SET_COLLECTION_ID:
      return { ...state, collectionId: action.payload };
    case SET_DESCRIPTION:
      return { ...state, description: action.payload };
    case SET_CATEGORY:
      return { ...state, category: action.payload };
    case SET_VIDEO_FILE:
      return { ...state, localVideoFile: action.payload };
    case SET_THUMBNAIL_IMAGE:
      return { ...state, localThumbnailFile: action.payload };
    case SET_TAGS:
      return {
        ...state,
        tags: action.payload
      };
    case SET_GENRES:
      return {
        ...state,
        genres: action.payload
      };
    case RESET:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
