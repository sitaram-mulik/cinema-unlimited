import { View } from 'react-native';

export default function CUFitVideo({ children }) {
  return (
    <View className="video-container relative overflow-hidden" style={{ height: '100vh' }}>
      <View className="absolute bottom-0 left-0">{children}</View>
    </View>
  );
}
