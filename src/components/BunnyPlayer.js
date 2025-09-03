import { WebView } from "react-native-webview";
import {
  View,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
} from "react-native";

export default function BunnyPlayer({ videoUrl }) {
  // const videoUrl =
  //   "https://iframe.mediadelivery.net/embed/488795/6dfea818-412c-4ccd-999f-613afb3b0a71";
  const { width } = useWindowDimensions();
  const playerWidth = width - 40; // adjust padding/margin
  const playerHeight = (playerWidth * 9) / 16;

  if (!videoUrl) return null;
  return (
    <View
      className="bunny-video-player-wrapper"
      style={{ width: playerWidth, height: playerHeight }}
    >
      <WebView
        source={{ uri: videoUrl }}
        className="h-full w-full"
        allowsFullscreenVideo
        javaScriptEnabled
        domStorageEnabled
        mediaPlaybackRequiresUserAction={false} // don't force user to tap
        allowsInlineMediaPlayback // iOS: play inline instead of native player
      />
    </View>
  );
}
