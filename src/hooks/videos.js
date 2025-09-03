import { useEffect, useState } from 'react';
import { cuAPI } from '../config/api';

export const useRecentVideos = () => {
  const [recentVideos, setRecentVideos] = useState([]);

  useEffect(() => {
    cuAPI
      .get('/videos')
      .then(res => {
        setRecentVideos(res?.data?.data || []);
      })
      .catch(err => {
        console.error('Failed to load videos ', err);
      });
  }, []);

  return recentVideos;
};
