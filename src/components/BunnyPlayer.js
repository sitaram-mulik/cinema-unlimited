import { WebView } from 'react-native-webview';
import { View, StyleSheet, Dimensions, useWindowDimensions } from 'react-native';
import { isWeb } from '../config/constant';

export default function BunnyPlayer({ videoUrl, autoplay = false, fullwidth = false }) {
  const { width } = useWindowDimensions();
  const playerWidth = isWeb && !fullwidth ? 1000 : width; // adjust padding/margin
  const playerHeight = (playerWidth * 9) / 16;

  if (!videoUrl) return null;

  const uri = `${videoUrl}?autoplay=${autoplay}&ui=c`;

  return (
    <View
      className="bunny-video-player-wrapper relative"
      style={{ width: playerWidth, height: playerHeight }}
    >
      {/* The top gradient overlay. This sits over the header area.
        The "bg-gradient-to-b" class creates a black-to-transparent effect.
      */}
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
