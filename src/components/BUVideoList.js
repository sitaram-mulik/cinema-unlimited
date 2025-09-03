import { useEffect } from 'react';
import { useBURequest } from '../hooks/request';
import VideoList from './VideoList';
import { LIST_COLLECTION_PREFIX } from '../config/constant';

export default function BUVideoList({ collectionId, collectionName }) {
  const {
    data: videosData,
    loading,
    error
  } = useBURequest({ url: `/videos?collection=${collectionId}` });

  const videos = videosData?.items;

  return (
    <VideoList
      key={collectionId}
      videos={videos}
      heading={collectionName.split(LIST_COLLECTION_PREFIX + ' - ')}
      loading={loading}
      error={error}
    />
  );
}
