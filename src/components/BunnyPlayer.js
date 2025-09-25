import { WebView } from 'react-native-webview';
import { View, StyleSheet, Dimensions, useWindowDimensions, Platform } from 'react-native';
import { isMobile, isWeb } from '../config/constant';

export default function BunnyPlayer({ videoUrl, autoplay = false, fullwidth = false }) {
  const { width } = useWindowDimensions();
  const playerWidth = isMobile || fullwidth ? width : 1000; // adjust padding/margin

  const playerHeight = playerWidth * (9 / 16);
  console.log('playerWidth ', playerHeight);

  if (!videoUrl) return null;

  const uri = `${videoUrl}?autoplay=${autoplay}`;

  return (
    <View
      className="bunny-video-player-wrapper relative top-0"
      style={{ width: playerWidth, height: playerHeight }}
    >
      {/* The top gradient overlay. This sits over the header area.
        The "bg-gradient-to-b" class creates a black-to-transparent effect.
      */}
      {Platform.OS === 'web' ? (
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
          style={{
            width: playerWidth,
            height: playerHeight
          }}
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
