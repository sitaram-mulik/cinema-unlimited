import { uploadStates } from '../config/constant';
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
export const SET_LANGUAGES = 'SET_LANGUAGES';
export const SET_DIRECTORS = 'SET_DIRECTORS';
export const SET_PRODUCERS = 'SET_PRODUCERS';
export const SET_CAST = 'SET_CAST';
export const SET_STUDIO = 'SET_STUDIO';
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
  tags: [],
  genres: [],
  languages: ['English'],
  status: 'pending',
  thumbnailFileName: null,
  thumbnailStoragePath: null,
  directors: [],
  cast: [],
  producers: [],
  Studio: '',
  version: 0
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
    case SET_LANGUAGES:
      return {
        ...state,
        languages: action.payload
      };
    case SET_DIRECTORS:
      return {
        ...state,
        directors: action.payload
      };
    case SET_PRODUCERS:
      return {
        ...state,
        producers: action.payload
      };
    case SET_CAST:
      return {
        ...state,
        cast: action.payload
      };
    case SET_STUDIO:
      return {
        ...state,
        studio: action.payload
      };
    case RESET:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getUploadProgressMessage = uploadState => {
  switch (uploadState) {
    case uploadStates.INIT:
      return 'Started publishing video, please do not cancel or refresh this page...';

    case uploadStates.CREATED:
      return 'Uploading cover photo...';

    case uploadStates.COVER_UPLOADED:
      return 'Cover photo uploaded! Uploading video now...';

    case uploadStates.START:
      return 'Uploading video...';

    case uploadStates.PAUSED:
      return 'Upload is paused...';

    case uploadStates.VIDEO_UPLOADED:
      return 'Video is uploaded! Please wait till we finalize some things...';

    case uploadStates.COMPLETE:
      return 'Congratulations! Your video is published to our server. We will soon review it and make it live!';

    case uploadStates.ERROR:
      return 'We encountered an error while publishing your video. Please try again!...';

    default:
      break;
  }
};
