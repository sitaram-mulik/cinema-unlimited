import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { View } from 'react-native';
import CUButton from './utilities/CUButton';
import { isWeb } from '../config/constant';
import { useEffect } from 'react';

export default function NativeVideoPlayer({ videoUrl, ...props }) {
  const player = useVideoPlayer(videoUrl ?? null, pl => {
    if (videoUrl) pl.play();
  });

  useEffect(() => {
    const sub = player.addListener('loadedmetadata', event => {
      const { duration, naturalSize } = event;
      const { width, height } = naturalSize ?? {};

      console.log('Video metadata:', event);
    });

    return () => sub.remove();
  }, [player]);

  const { isPlaying } = useEvent(player, 'playingChange', {
    isPlaying: player?.playing
  });

  if (!player) return null; // wait for player

  return (
    videoUrl && (
      <View className="items-center justify-center">
        <View
          className="w-full aspect-[16/9]"
          style={{
            width: isWeb ? '960px' : '100%',
            height: isWeb ? '540px' : 'auto',
            aspectRatio: 16 / 9
          }}
        >
          <VideoView
            style={{ width: '100%', height: '100%' }}
            player={player}
            allowsFullscreenVideo
            allowsPictureInPicture
            isMuted
            resizeMode="contain"
          />
          {/* <View className="p-2">
          <CUButton
            onPress={() => {
              if (isPlaying) {
                player.pause();
              } else {
                player.play();
              }
            }}
            text={isPlaying ? 'Pause' : 'Play'}
          />
        </View> */}
        </View>
      </View>
    )
  );
}
