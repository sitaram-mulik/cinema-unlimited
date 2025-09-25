import React, { useMemo, useRef, useState } from 'react';
import { View, ScrollView } from 'react-native';
import CUButton from '../utilities/CUButton';
import { CUText } from '../utilities/CUText';
import CUProgress from '../utilities/CUProgress';
import CUError from '../utilities/CUError';
import {
  ACCOUNT_API_KEY,
  buStreamURL,
  isMobile,
  LIBRARY_ID,
  STORAGE_WRITE_KEY,
  STORAGE_ZONE,
  uploadStates
} from '../../config/constant';
import { buAPI, cuAPI } from '../../config/api';
import tus from 'tus-js-client';
import CUIcon from '../utilities/CUICon';
import { CloudUpload, Pause, Play } from 'lucide-react-native';
import CUHeading from '../utilities/CUHeading';
import CUIconButton from '../utilities/CUIconButton';
import { videoStatus } from '../../constants/video';
import { useToast } from '../../context/toastContext';
import axios from 'axios';
import {
  getThumbnailCDNUrl,
  getThumbnailStorageUrl,
  getThumbnailUrl,
  getVideoUrl
} from '../../utils/video-player';
import { getUploadProgressMessage } from '../../utils/upload';
import { router } from 'expo-router';
import CUContent from '../utilities/CUContent';

export default function PublishVideo({ uploadForm, isEdit, setDisablePrev }) {
  const uploadRef = useRef();
  const {
    id: videoId,
    title,
    localVideoFile,
    localThumbnailFile,
    version,
    thumbnailStoragePath
  } = uploadForm || {};
  const [uploadState, setUploadState] = useState();
  const [uploadError, setUploadError] = useState();
  const [uploadProgress, setUploadProgress] = useState(0);
  const { showToast } = useToast();
  console.log('uploadForm ', uploadForm);

  const uploadVideo = async (guid, AuthorizationSignature, AuthorizationExpire) => {
    setUploadState(uploadStates.START);
    const { name: filename, uri: fileUri, size } = localVideoFile;
    const filetype = localVideoFile.mimeType || localVideoFile.fileType || localVideoFile.type;
    let file;
    if (isMobile) {
      const resp = await fetch(fileUri);
      file = await resp.blob();
    } else {
      file = localVideoFile.file;
    }

    return new Promise((resolve, reject) => {
      const upload = new tus.Upload(file, {
        endpoint: 'https://video.bunnycdn.com/tusupload',
        retryDelays: [0, 3000, 5000, 10000, 20000, 60000, 60000],
        headers: {
          AuthorizationSignature,
          AuthorizationExpire,
          VideoId: guid,
          LibraryId: LIBRARY_ID
        },
        metadata: {
          filename,
          filetype,
          size
        },
        onError: error => {
          console.log('Error uploading video ', error);
          setUploadError(error);
          setUploadState(uploadStates.ERROR);
          reject(error);
        },
        onProgress: (bytesUploaded, bytesTotal) => {
          let _progress = ((bytesUploaded / bytesTotal) * 100).toFixed(0);
          // _progress = _progress - 0.1;
          console.log('prrrrr ', bytesUploaded / bytesTotal);
          setUploadProgress(_progress);
        },
        onSuccess: () => {
          setUploadState(uploadStates.VIDEO_UPLOADED);
          resolve('Upload finished');
        }
      });

      uploadRef.current = upload;
      upload.start();
    });
  };

  const uploadThumbnail = async guid => {
    try {
      const file = localThumbnailFile.file;
      //const extension = file.name.split('.').pop();
      const thumbnailFileNameInStorage = `${guid}/${file.name}`;
      const newThumbnailStoragePath = getThumbnailStorageUrl(thumbnailFileNameInStorage);

      // delete older thumbnail if exists
      if (version > 0) {
        try {
          // const prevStorageImagePath = `${guid}/Cover_${version - 1}.${extension}`;
          const prevStorageImagePath = thumbnailStoragePath;
          await buAPI.delete(prevStorageImagePath, {
            headers: {
              AccessKey: STORAGE_WRITE_KEY
            }
          });
        } catch (error) {}
      }

      // Upload image to storage
      await buAPI.put(newThumbnailStoragePath, file, {
        headers: {
          AccessKey: STORAGE_WRITE_KEY,
          'Content-Type': file.type
        }
      });

      // Link thumbnail to video
      const thumbnailCDNUrl = getThumbnailCDNUrl(thumbnailFileNameInStorage);
      await buAPI.post('/videos/' + guid + '/thumbnail?thumbnailUrl=' + thumbnailCDNUrl);

      // purge stale cache
      await purgeCache(thumbnailCDNUrl);
      await purgeCache(getThumbnailUrl(guid, uploadForm.thumbnailFileName));

      // Update video record with new thumbnailFileName
      const updatedVideoData = await cuAPI.get('/videos/' + guid);
      const updatedThumbnailFileName = updatedVideoData?.data?.data?.thumbnailFileName;
      await cuAPI.patch('/videos/' + guid, {
        thumbnailFileName: updatedThumbnailFileName,
        thumbnailStoragePath: newThumbnailStoragePath
      });

      setUploadState(uploadStates.COVER_UPLOADED);
    } catch (err) {
      console.log('Error while uploading thumbnail', err);
      setUploadState(uploadStates.ERROR);
    }
  };

  const purgeCache = async url => {
    try {
      await buAPI.post('https://api.bunny.net/purge?url=' + url + '&async=true', null, {
        headers: {
          AccessKey: ACCOUNT_API_KEY
        }
      });
    } catch (error) {}
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      isEror = true;
      showToast('Please select a Video title!');
      return;
    }
    if (!isEdit && !localVideoFile) {
      isEror = true;
      showToast('Please provide a video to upload!');
      return;
    }
    if (!isEdit && !localThumbnailFile) {
      isEror = true;
      showToast('Please provide a Conver image to upload!');
      return;
    }

    setUploadState(uploadStates.INIT);
    setDisablePrev(true);

    let result;

    try {
      const {
        id,
        category,
        collectionId,
        description,
        tags,
        directors,
        producers,
        cast,
        languages,
        studio,
        genres
      } = uploadForm || {};
      const isUpdatingVideo = isEdit && localVideoFile;
      const isNewVideo = !isEdit || isUpdatingVideo;
      if (isNewVideo) {
        if (isUpdatingVideo) {
          await cuAPI.delete('/videos/' + id);
        }
        result = await cuAPI.post('/videos', {
          title,
          category,
          collectionId,
          description,
          tags,
          genres,
          directors,
          producers,
          cast,
          languages,
          studio,
          status: videoStatus.PENDING
        });
      } else {
        result = await cuAPI.patch('/videos/' + id, {
          title,
          category,
          collectionId,
          description,
          tags,
          genres,
          directors,
          producers,
          cast,
          languages,
          studio,
          status: videoStatus.PENDING,
          version: version + 1
        });
      }
      setUploadState(uploadStates.CREATED);
      const { guid, AuthorizationSignature, AuthorizationExpire } = result?.data?.data;
      const _videoId = guid || videoId;

      // If updating cover image
      if (localThumbnailFile) {
        await uploadThumbnail(_videoId);
      }
      if (localVideoFile && _videoId && AuthorizationSignature && AuthorizationExpire) {
        await uploadVideo(_videoId, AuthorizationSignature, AuthorizationExpire);
        await purgeCache(getVideoUrl(_videoId));
      }
    } catch (err) {
      showToast(`Error while publishing video. Please try again! ${err?.message}`);
      setUploadState(uploadStates.ERROR);
    } finally {
      setUploadState(uploadStates.COMPLETE);
      setDisablePrev(false);
      showToast('Video published successfully!');
      router.navigate('/account/channel?status=drafts');
    }
  };

  const pauseUpload = () => {
    if (uploadRef.current) {
      uploadRef.current.abort();
      setUploadState(uploadStates.PAUSED);
    }
  };

  const resumeUpload = () => {
    if (uploadRef.current) {
      uploadRef.current.start();
      setUploadState(uploadStates.START);
    }
  };

  const progressMessage = useMemo(() => getUploadProgressMessage(uploadState), [uploadState]);

  return (
    <CUContent>
      {/* <CUHeading>
        {!uploadState
          ? 'Lets upload your content!'
          : uploadState === uploadStates.COMPLETE
            ? 'Your video is published!'
            : 'Upload in progress, dont refresh the page.'}
      </CUHeading> */}
      {progressMessage && <CUText className="text-lg mb-4">{progressMessage}</CUText>}
      <View className="button-groups mt-4">
        {!uploadState && <CUIconButton onPress={handleSubmit} text="Upload" icon={CloudUpload} />}
        {uploadState === uploadStates.START && <CUProgress progress={uploadProgress} />}
        {uploadState === uploadStates.START && (
          <CUIconButton
            icon={Pause}
            onPress={pauseUpload}
            text="Pause"
            textClass="text-sm"
            className="max-w-[100px]"
          />
        )}

        {(uploadState === uploadStates.PAUSED || uploadState === uploadStates.ERROR) && (
          <CUIconButton
            icon={Play}
            onPress={resumeUpload}
            text="Resume"
            textClass="text-sm"
            className="max-w-[100px]"
          />
        )}

        {uploadState === uploadStates.ERROR && <CUError error={uploadError} />}
      </View>
    </CUContent>
  );
}

// <View className="button-groups">
//   {uploadState === uploadStates.INIT && <CUButton onPress={pauseUpload} text="Pause" />}
//   {(uploadState === uploadStates.PAUSED || uploadState === uploadStates.ERROR) && (
//     <CUButton onPress={resumeUpload} text="Resume" />
//   )}
//   {!uploadState && (
//     <CUButton onPress={nextStep} disabled={!title.trim() || !localVideoFile} text="Next" />
//   )}
//   {uploadState === uploadStates.INIT && <CUProgress progress={progress} />}
//   {uploadState === uploadStates.ERROR && <CUError error={uploadError} />}
// </View>;

// const generateThumbnails = async videoDuration => {
//   const interval = 5000; // 5s
//   const thumbs = [];
//   for (let time = 0; time < videoDuration; time += interval) {
//     const { uri } = await VideoThumbnails.getThumbnailAsync(localVideoFile.uri, { time });
//     thumbs.push({ time, uri });
//   }
//   setThumbnails(thumbs);
// };

// const setThumbnail = async (uri, timeInSeconds) => {
//   try {
//     const time = Math.floor(timeInSeconds * 1000);
//     const result = await VideoThumbnails.getThumbnailAsync(uri, {
//       time // in ms
//     });
//     console.log('uriuri ', result);
//     setSelectedThumb(result);
//   } catch (e) {
//     console.warn(e);
//   }
// };

// const handleSliderChange = value => {
//   const time = value * duration;
//   const closestThumb = thumbnails.reduce((prev, curr) =>
//     Math.abs(curr.time - time) < Math.abs(prev.time - time) ? curr : prev
//   );
//   setCurrentThumb(closestThumb?.uri);
// };

// const onVideoLoad = async () => {
//   const status = await videoRef.current.getStatusAsync();
//   setDuration(status.durationMillis);
//   generateThumbnails(status.durationMillis);
// };

// const pauseUpload = () => {
//   if (uploadRef.current) {
//     uploadRef.current.abort();
//     console.log('Upload paused');
//   }
// };

// const resumeUpload = () => {
//   if (uploadRef.current) {
//     uploadRef.current.start();
//     console.log('Upload resumed');
//   }
// };
