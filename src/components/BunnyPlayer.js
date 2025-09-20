import { WebView } from 'react-native-webview';
import { View, StyleSheet, Dimensions, useWindowDimensions } from 'react-native';
import { isWeb } from '../config/constant';

export default function BunnyPlayer({ videoUrl, autoplay = false }) {
  const { width } = useWindowDimensions();
  const playerWidth = isWeb ? 1000 : width - 40; // adjust padding/margin
  const playerHeight = (playerWidth * 9) / 16;

  if (!videoUrl) return null;

  const uri = `${videoUrl}?autoplay=${autoplay}`;

  return (
    <View
      className="bunny-video-player-wrapper flex-1"
      style={{ width: playerWidth, height: playerHeight }}
    >
      {isWeb ? (
        <iframe
          src={uri}
          width={playerWidth}
          height={playerHeight}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          style={{ border: 'none' }}
        />
      ) : (
        <WebView
          source={{ uri }}
          className="h-full w-full"
          allowsFullscreenVideo
          javaScriptEnabled
          domStorageEnabled
          mediaPlaybackRequiresUserAction={false} // don't force user to tap
          allowsInlineMediaPlayback // iOS: play inline instead of native player
        />
      )}
    </View>
  );
}
