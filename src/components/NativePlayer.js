import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { View } from 'react-native';
import CUButton from './utilities/CUButton';

export default function NativeVideoPlayer({ videoUrl }) {
  const player = useVideoPlayer(videoUrl ?? null, pl => {
    if (videoUrl) pl.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', {
    isPlaying: player?.playing
  });

  if (!player) return null; // wait for player

  return (
    videoUrl && (
      <View
        className="w-full aspect-[16/9]"
        style={{ width: '100%', aspectRatio: 16 / 9, backgroundColor: '#000' }}
      >
        <VideoView
          style={{ width: '100%', height: '100%' }}
          player={player}
          allowsFullscreenVideo
          allowsPictureInPicture
          isMuted
          resizeMode="contain"
        />
        <View className="p-2">
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
        </View>
      </View>
    )
  );
}
