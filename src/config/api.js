import axios from 'axios';
import { LIBRARY_ID, LIBRARY_API_KEY, CU_BASE_URL, BU_BASE_URL } from './constant';

const cuAPI = axios.create({
  baseURL: CU_BASE_URL
});

const buAPI = axios.create({
  baseURL: `${BU_BASE_URL}/library/${LIBRARY_ID}`,
  headers: {
    AccessKey: LIBRARY_API_KEY
  }
});

// Auto-fix headers depending on payload
buAPI.interceptors.request.use(config => {
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type']; // let Axios set it
  } else {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

// Add a response interceptor for cuAPI
cuAPI.interceptors.response.use(
  response => response,
  error => {
    // You can customize error handling here
    if (error.response) {
      console.log('🔴 API ERROR:', error.response.status, error.response.data);
    } else if (error.request) {
      console.log('🔴 NO RESPONSE:', error.request);
    } else {
      console.log('🔴 REQUEST SETUP ERROR:', error.message);
    }

    return Promise.reject(error);
  }
);

// Add a response interceptor for buAPI
buAPI.interceptors.response.use(
  response => response,
  error => {
    // You can customize error handling here
    if (error.response) {
      console.log('🔴 API ERROR:', error.response.status, error.response.data);
    } else if (error.request) {
      console.log('🔴 NO RESPONSE:', error.request);
    } else {
      console.log('🔴 REQUEST SETUP ERROR:', error.message);
    }

    return Promise.reject(error);
  }
);

export { cuAPI, buAPI };
