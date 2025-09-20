import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import BunnyPlayer from '../../components/BunnyPlayer';
import { CUText } from '../../components/utilities/CUText';
import { cuAPI } from '../../config/api';
import { buVideoStreamURL } from '../../config/constant';

export default function VideoScreen() {
  const { id } = useLocalSearchParams();
  const [videoUrl, setVideoUrl] = useState();
  const [videoDetails, setVideoDetails] = useState();

  useEffect(() => {
    cuAPI.get('/videos/' + id).then(res => {
      const _videoDetails = res.data.data;
      setVideoDetails(_videoDetails);
      // console.log("video -> ", _videoDetails);
      setVideoUrl(`${buVideoStreamURL}/${_videoDetails.guid}?autoplay=false`);
    });
  }, [id]);

  // useEffect(() => {
  //   api.get(`/videos/${id}/url`).then((result) => {
  //     setVideoUrl(result.data.playUrl);
  //     console.log("playUrl ", result.data.playUrl);
  //   });
  // }, []);

  return (
    videoDetails && (
      <>
        <BunnyPlayer videoUrl={videoUrl} />
        <CUText className="text-4xl my-2 flex items-center justify-center">
          {videoDetails.title}
        </CUText>
        {videoDetails.description && (
          <CUText className="text-md pb-2 flex items-center justify-center">
            {videoDetails.description}
          </CUText>
        )}
      </>
    )
  );
}
