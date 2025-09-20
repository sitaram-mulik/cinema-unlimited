import { useContext, useEffect, useState } from 'react';
import { cuAPI } from '../config/api';
import { useToast } from '../context/toastContext';

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

export const useVideoData = (id, skip) => {
  const [data, setData] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (skip || !id) return;
    cuAPI({
      url: '/videos/' + id
    })
      .then(res => {
        if (res?.data?.data) setData(res?.data?.data);
      })
      .catch(err => {
        showToast(`Failed to fetch video data. ${err?.message}.`, 'error');
      });
  }, [id, skip]);

  return data;
};
