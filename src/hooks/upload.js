import { useEffect, useState } from 'react';
import tus from 'tus-js-client';
import { useBURequest } from './request';
import { RESERVED_COLLECTION_PREFIX } from '../config/constant';
import { SET_COLLECTION_ID } from '../utils/upload';

export const useTusUpload = (guid, AuthorizationSignature, AuthorizationExpire) => {
  const [upload, setUpload] = useState();
  const [progress, setProgress] = useState();
  const [error, setError] = useState();
  const [uploadComplete, setUploadComplete] = useState();

  useEffect(() => {
    const _upload = new tus.Upload(file, {
      endpoint: 'https://video.bunnycdn.com/tusupload',
      retryDelays: [0, 3000, 5000, 10000, 20000, 60000, 60000],

      headers: {
        AuthorizationSignature, // SHA256 signature (library_id + api_key + expiration_time + video_id)
        AuthorizationExpire, // Expiration time as in the signature,
        VideoId: guid, // The guid of a previously created video object through the Create Video API call
        LibraryId: LIBRARY_ID
      },
      metadata: {
        filename,
        filetype
      },
      onError: error => {
        console.log('Error uploading video ', error);
        setError(error);
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        const _progress = ((bytesUploaded / bytesTotal) * 100).toFixed(2) + '%';
        console.log('_progress ', _progress);
        setProgress(_progress);
      },
      onSuccess: () => {
        console.log('Upload finished:', upload.url);
      }
    });
    setUpload(_upload);
  }, []);
};

export const usePendingCollectionId = dispatch => {
  const { data: carouselCollection } = useBURequest({
    url: `/collections?search=${RESERVED_COLLECTION_PREFIX}_pending&itemsPerPage=10`
  });
  const pendingCollectionId = carouselCollection?.items?.[0]?.guid || '';

  useEffect(() => {
    if (pendingCollectionId) {
      dispatch({ type: SET_COLLECTION_ID, payload: pendingCollectionId });
    }
  }, [pendingCollectionId]);
};
