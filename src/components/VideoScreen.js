import { useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import BunnyPlayer from './BunnyPlayer';
import { CUText } from './utilities/CUText';
import { cuAPI } from '../config/api';
import { CUScrollContainer } from './utilities/CUScrollContainer';
import { getVideoUrl } from '../utils/video-player';
import { View } from 'react-native';
import VideoOverlay from './VideoOverlay';
import CUFitVideo from './utilities/CUFitVideo';
import CUDetailList from './utilities/CUDetailList';
import { isWeb } from '../config/constant';

const excludeVideoProperties = ['guid', 'length', 'thumbnailCount', 'transcodingMessages'];

export default function VideoScreen() {
  const { id } = useLocalSearchParams();
  const [videoUrl, setVideoUrl] = useState();
  const [videoDetails, setVideoDetails] = useState();

  useEffect(() => {
    cuAPI.get('/videos/' + id).then(res => {
      const _videoDetails = res.data.data;
      setVideoDetails(_videoDetails);
      console.log('video -> ', _videoDetails);
      setVideoUrl(getVideoUrl(_videoDetails.guid));
    });
  }, [id]);

  const videoProperties = useMemo(() => {
    const details = {};
    Object.keys(videoDetails || {})
      .filter(v => !excludeVideoProperties.includes(v))
      .forEach(d => (details[d] = videoDetails[d]));
    return details;
  }, [videoDetails]);

  console.log('videoDetails ', videoDetails);

  return (
    videoUrl && (
      <View className="flex justify-center flex-column align-center w-full">
        <CUFitVideo>
          <BunnyPlayer videoUrl={videoUrl} fullwidth autoplay={true} />
          {isWeb && (
            <VideoOverlay>
              <CUText className="text-4xl my-2">{videoDetails.title}</CUText>
              {videoDetails.description && (
                <CUText className="text-xl pb-2">{videoDetails.description}</CUText>
              )}
            </VideoOverlay>
          )}
        </CUFitVideo>
        <View className="mt-4">
          <CUDetailList properties={videoProperties} />
        </View>
      </View>
    )
  );
}
