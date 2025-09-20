import { useEffect, useState } from 'react';
import { buAPI, cuAPI } from '../config/api';

const getErrorMessage = error => {
  let message = 'Something went wrong!'; // default message

  if (error.response && error.response.data?.message) {
    message = error.response.data.message; // use API error message if available
  } else if (error.message) {
    message = error.message; // fallback to Axios error message
  }

  console.log('Error message:', message);
  return message;
};

export const useBURequest = ({ url, method = 'GET', payload, params }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    buAPI({ method, url, data: payload, params })
      .then(res => {
        if (res?.data) setData(res.data);
      })
      .catch(error => {
        setError(getErrorMessage(error));
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};

export const useCURequest = ({ url, method = 'GET', payload, params }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    cuAPI({ method, url, data: payload, params })
      .then(res => {
        if (res?.data) setData(res.data);
      })
      .catch(error => {
        setError(getErrorMessage(error));
      })
      .finally(() => setLoading(false));
  }, [url, method, payload, params]);

  return { data, loading, error };
};
