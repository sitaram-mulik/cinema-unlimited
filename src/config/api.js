import axios from 'axios';
import { LIBRARY_ID, LIBRARY_API_KEY, CU_BASE_URL, BU_BASE_URL } from './constant';

const cuAPI = axios.create({
  baseURL: CU_BASE_URL
});

console.log('BU_BASE_URL ', BU_BASE_URL, LIBRARY_ID);

const buAPI = axios.create({
  baseURL: `${BU_BASE_URL}/library/${LIBRARY_ID}`,
  headers: {
    AccessKey: LIBRARY_API_KEY,
    'Content-Type': 'application/json'
  }
});

// Add a response interceptor for cuAPI
cuAPI.interceptors.response.use(
  response => response,
  error => {
    // You can customize error handling here
    console.error('cuAPI Error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor for buAPI
buAPI.interceptors.response.use(
  response => response,
  error => {
    // You can customize error handling here
    console.log('Error message:', error.message);

    return Promise.reject(error);
  }
);

export { cuAPI, buAPI };
